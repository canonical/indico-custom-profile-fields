#!/usr/bin/env python3

# Copyright 2025 Canonical Ltd.
# See LICENSE file for licensing details.

"""Indico Custom Profile Fields Plugin.

This plugin allows the addition of custom profile fields to user profiles
and registration forms within the Indico event management system. It currently
supports the following custom fields:
- Legal First Name (text)
- Legal Last Name (text)
- Pronouns (text)
- Nickname (text)
- Shirt Size (single choice)
- Employee ID (text)
- Country (single choice)
- Group (text)
- Product (text)
- Dietary Options (multi choice)
- Dietary Details (text)
- Cap Details (text)
These fields are automatically added to new registration forms and can be
prefilled on user profile pages. The plugin also handles saving updates to
these fields when users update their personal data.
"""
import json
import os
from typing import Any, Callable, cast

from flask import Blueprint, jsonify, request, session
from indico.core import signals
from indico.core.db import db
from indico.core.plugins import IndicoPlugin, render_plugin_template
from indico.modules.events.registration.models.form_fields import (
    RegistrationFormField,
    RegistrationFormFieldData,
)
from indico.modules.events.registration.models.forms import RegistrationForm
from indico.modules.events.registration.models.items import RegistrationFormSection
from indico.modules.events.registration.models.registrations import Registration
from indico.modules.events.registration.util import get_user_data
from indico.modules.users.controllers import RHPersonalDataUpdate, UserPersonalDataSchema
from indico.modules.users.models.users import User
from indico.util.countries import get_countries
from indico.util.signals import interceptable_sender

from indico_custom_profile_fields.models.custom_fields import UserCustomProfile
from indico_custom_profile_fields.models.field_mapping import CustomFieldMapping

blueprint = Blueprint(
    "plugin_custom_profile_fields", __name__, url_prefix="/plugin/custom_profile_fields"
)


@blueprint.route("/api/config")
def get_config_api() -> Any:
    """Return configuration for custom profile fields.

    Returns:
        JSON response
    """
    # get_countries() returns {'US': 'United States', ...}
    # We convert it to a list of dicts for JSON
    countries = [{"code": code, "name": name} for code, name in get_countries().items()]
    # Sort alphabetically by name so they appear nicely in the dropdown
    countries.sort(key=lambda x: x["name"])
    # Check if current user is Admin
    # session.user is the logged-in user. We check if they are an admin.
    is_admin = session.user and session.user.is_admin  # type: ignore[attr-defined]

    return jsonify({"countries": countries, "is_admin": is_admin})


class CustomProfileFieldsPlugin(IndicoPlugin):
    """Custom Profile Fields Plugin."""

    def get_blueprints(self) -> Blueprint:
        """Get the blueprint for the plugin.

        Returns:
            Blueprint: The blueprint object for the plugin.
        """
        return blueprint

    def init(self) -> None:
        """Initialize the custom profile fields plugin.

        This method sets up the plugin by injecting necessary JavaScript,
        loading custom field definitions, and connecting to relevant signals
        to handle profile page pre-filling, profile updates, and registration
        form creation.
        """
        super().init()
        self.inject_bundle("main.js")
        self.inject_bundle("main.css")
        self.custom_fields = self._load_custom_fields()

        # PROFILE PAGE HOOKS #
        # Hook into profile page to prefill custom fields
        signals.plugin.schema_post_dump.connect(
            self._prefill_custom_fields, sender=UserPersonalDataSchema
        )
        # Hook into profile update to handle custom field updates
        signals.rh.process.connect(self._after_profile_update, sender=RHPersonalDataUpdate)

        # REGISTRATION FORM HOOKS #

        # Hook into registration form to add custom fields
        signals.event.registration_form_created.connect(self._after_form_creation)

        # Intercept get_user_data to inject custom fields into registration
        self.connect(
            signals.plugin.interceptable_function,
            self._get_user_data,
            sender=interceptable_sender(get_user_data),
        )
        # Hook into registration creation to attach admin-only data
        signals.event.registration_created.connect(self._attach_admin_data)

    def _prefill_custom_fields(self, _: Any, **kwargs: Any) -> None:
        """Prefill custom fields on the profile page."""
        orig = cast(list[Any], kwargs.get("orig"))
        user = orig[0]
        custom_profile = self._get_custom_user_profile(user)
        if not custom_profile:
            return
        for field_meta in self.custom_fields:
            field_name = field_meta["name"]
            if hasattr(custom_profile, field_name):
                kwargs["data"][0][field_name] = getattr(custom_profile, field_name)

    def _after_profile_update(
        self,
        sender: RHPersonalDataUpdate,
        result: Any,  # pylint: disable=unused-argument
        **kwargs: Any,
    ) -> None:
        """Handle custom profile field updates after personal data update."""
        # Get the form data from the request
        if sender is not RHPersonalDataUpdate:
            self.logger.info("Not a personal data update request, skipping.")
            return
        form_data = cast(dict, request.json)
        rh = kwargs.get("rh")  # type: RHPersonalDataUpdate
        custom_profile: UserCustomProfile | None = None
        is_data_new = False
        # Iterate over custom fields and update the user's custom profile
        for field_meta in self.custom_fields:
            field_name = field_meta["name"]
            if field_name in form_data:
                is_data_new = True
                if not custom_profile:
                    custom_profile = self._get_custom_user_profile(rh.user)

                # Update the field
                setattr(custom_profile, field_name, form_data[field_name])

        # Save to database if there were changes
        if is_data_new:
            db.session.add(custom_profile)
            db.session.commit()

    def _attach_admin_data(self, registration: Registration, **_: Any) -> None:
        """Silently attach admin-only data after registration is created."""
        user = registration.user
        if not user:
            self.logger.info("No user found, skipping custom profile injection")
            return

        # Fetch custom profile
        custom_profile = self._get_custom_user_profile(user)
        if not custom_profile:
            return

        # Get field mappings
        mappings = self._get_field_mappings(registration.registration_form_id)

        for field_def in self.custom_fields:
            # We ONLY care about Admin fields here
            if not field_def.get("admin_only", False):
                continue

            field_name = field_def["name"]
            field_id_str = mappings.get(field_name)

            if not field_id_str or not hasattr(custom_profile, field_name):
                continue

            field_id = int(field_id_str.split("_")[-1])  # Extract numeric ID from "field_123"

            value = getattr(custom_profile, field_name)
            if value is None:
                continue

            target_data_entry = next(
                (d for d in registration.data if d.field_data.field_id == field_id), None
            )
            if not target_data_entry:
                continue

            # Format data according to field type
            formatted_value = self._format_value(value, field_def["input_type"])
            # Update the registration data
            target_data_entry.data = formatted_value

    def _get_user_data(self, _: Any, func: Callable, args: Any, **__: Any) -> dict:
        """Inject custom profile fields into registration user data."""
        # Call the original function to get the base data
        user_data = func(*args.args, **args.kwargs)

        # Grab the user from kwargs
        user = args.args[1]
        if not user:
            self.logger.info("No user found, skipping custom profile injection")
            return user_data

        # Fetch custom profile
        custom_profile = self._get_custom_user_profile(user)
        if not custom_profile:
            return user_data
        mappings = self._get_field_mappings(args.args[0].id)

        # Inject custom fields into user_data
        for field_def in self.custom_fields:
            if field_def.get("admin_only", False):
                # Skip admin-only fields
                continue

            field_name = field_def["name"]  # e.g. "employee_id"
            field_type = field_def["input_type"]
            field_id = mappings.get(field_name)  # e.g. "field_347"

            if field_type != "country" and not field_id:
                # The field was not created in the regform
                continue

            if hasattr(custom_profile, field_name):
                value = getattr(custom_profile, field_name)
                if value is not None:
                    if field_type == "country":
                        # Country has a unique way of passing value
                        user_data["country"] = value
                    else:
                        user_data[field_id] = self._format_value(value, field_type)
        return user_data

    def _after_form_creation(self, sender: RegistrationForm, **_: Any) -> None:
        """Add custom fields to new registration forms."""
        pd_section = sender.sections[0]

        admin_section = RegistrationFormSection(
            registration_form=sender,
            title="Official Use Only",
            is_manager_only=True,  # <--- THIS IS ALLOWED (Type is Section)
            position=1000,  # Put it at the bottom
            is_enabled=True,
        )
        sender.sections.append(admin_section)

        for idx, field_meta in enumerate(self.custom_fields, start=1):
            field_name = field_meta["name"]
            input_type = field_meta["input_type"]
            is_required = field_meta["is_required"]
            admin_only = field_meta["admin_only"]
            if field_name == "country":
                # Country field already exists, just enable it
                country_field = next(
                    (f for f in pd_section.children if f.title == "Country"), None
                )
                # If found, enable it and adjust its position
                if country_field:
                    country_field.position = idx
                    country_field.is_enabled = True
                    country_field.is_required = is_required
                continue

            target_section = admin_section if admin_only else pd_section

            field = RegistrationFormField(
                registration_form=sender,
                parent=target_section,
                title=field_meta["title"],
                input_type=input_type,
                is_required=is_required,
                position=idx,
            )

            field_data = {}
            if input_type in ("single_choice", "multi_choice"):
                field_data = {
                    "item_type": field_meta.get("item_type", "dropdown"),
                    "with_extra_slots": False,
                    "is_enabled": True,
                    "choices": [
                        {
                            "id": c.get("id"),
                            "caption": c["caption"],
                            "is_enabled": True,
                        }
                        for c in field_meta.get("choices", [])
                    ],
                }

            # Initialize field data
            field.data, versioned_data = field.field_impl.process_field_data(field_data)
            field.current_data = RegistrationFormFieldData(versioned_data=versioned_data)

            target_section.children.append(field)

            # Flush so we get IDs
            db.session.flush()  # pylint: disable=no-member

            # Store the html_field_name for later prefilling
            db.session.add(  # pylint: disable=no-member
                CustomFieldMapping(
                    regform_id=sender.id,
                    field_name=field_name,
                    field_id=field.html_field_name,
                )
            )

    # HELPERS #

    def _load_custom_fields(self) -> list[dict]:
        """Load custom fields from JSON file."""
        json_path = os.path.join(os.path.dirname(__file__), "client/custom_fields.json")
        with open(json_path, encoding="utf-8") as f:
            return json.load(f)

    def _format_value(self, value: str | list[str], input_type: str) -> str | dict:
        """Format a value based on its input type.

        Args:
            value (str | list[str]): The value to format.
            input_type (str): The type of input (e.g., 'single_choice', 'multi_choice', 'country').

        Returns:
            str | dict: The formatted value.
        """
        if input_type == "single_choice":
            # Single Choice must be stored as {'choice_id': 1}
            return {value: 1}
        if input_type == "multi_choice":
            # Multi Choice must be stored as {'choice_id': 1, ...}
            if isinstance(value, list):
                return {v: 1 for v in value}
            return {value: 1}
        return cast(str, value)

    def _get_custom_user_profile(self, user: User) -> UserCustomProfile | None:
        """Get custom profile for a user.

        Arguments:
            user: The user to fetch from DB.

        Returns:
            UserCustomProfile or None if user does not exist.
        """
        custom_user = UserCustomProfile.get_for_user(user)
        return custom_user

    def _get_field_mappings(self, regform_id: int) -> dict[str, str]:
        """Get custom field mappings for a registration form."""
        return {
            m.field_name: m.field_id
            for m in CustomFieldMapping.query.filter_by(regform_id=regform_id)
        }
