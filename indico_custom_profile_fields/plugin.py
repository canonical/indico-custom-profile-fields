#!/usr/bin/env python3

# Copyright 2025 Canonical Ltd.
# See LICENSE file for licensing details.

"""Indico Custom Profile Fields Plugin.

This plugin allows the addition of custom profile fields to user profiles
and registration forms within the Indico event management system. It currently
supports the following custom fields:
- Legal Name (text)
- Pronouns (text)
- Nickname (text)
- Shirt Size (single choice)
- Employee ID (text)
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

from flask import request
from indico.core import signals
from indico.core.db import db
from indico.core.plugins import IndicoPlugin
from indico.modules.events.registration.models.form_fields import (
    RegistrationFormField,
    RegistrationFormFieldData,
)
from indico.modules.events.registration.models.forms import RegistrationForm
from indico.modules.events.registration.util import get_user_data
from indico.modules.users.controllers import RHPersonalDataUpdate, UserPersonalDataSchema
from indico.util.signals import interceptable_sender

from indico_custom_profile_fields.models.custom_fields import UserCustomProfile
from indico_custom_profile_fields.models.field_mapping import CustomFieldMapping


class CustomProfileFieldsPlugin(IndicoPlugin):
    """Custom Profile Fields Plugin."""

    def init(self) -> None:
        """Initialize the custom profile fields plugin.

        This method sets up the plugin by injecting necessary JavaScript,
        loading custom field definitions, and connecting to relevant signals
        to handle profile page pre-filling, profile updates, and registration
        form creation.
        """
        super().init()
        self.inject_bundle("main.js")
        self.custom_fields = self._load_custom_fields()
        # Hook into profile page to prefill custom fields
        signals.plugin.schema_post_dump.connect(
            self._prefill_custom_fields, sender=UserPersonalDataSchema
        )
        # Hook into profile update to handle custom field updates
        signals.rh.process.connect(self._after_profile_update, sender=RHPersonalDataUpdate)
        # Hook into registration form to add custom fields
        signals.event.registration_form_created.connect(self._after_form_creation)

        # Intercept get_user_data to inject custom fields into registration
        self.connect(
            signals.plugin.interceptable_function,
            self._get_user_data,
            sender=interceptable_sender(get_user_data),
        )

    def _load_custom_fields(self) -> list[dict]:
        """Load custom fields from JSON file."""
        json_path = os.path.join(os.path.dirname(__file__), "client/custom_fields.json")
        with open(json_path, encoding="utf-8") as f:
            return json.load(f)

    def _get_user_data(self, _: Any, func: Callable, args: Any, **__: Any) -> dict:
        """Inject custom profile fields into registration user data."""
        # Call the original function to get the base data
        user_data = func(*args.args, **args.kwargs)

        # Grab the user from kwargs
        user = args.args[1]
        if not user:
            print("No user found, skipping custom profile injection")
            return user_data

        # Fetch custom profile
        custom_profile = UserCustomProfile.get_for_user(user)
        if not custom_profile:
            return user_data
        mappings = {
            m.field_name: m.field_id
            for m in CustomFieldMapping.query.filter_by(regform_id=args.args[0].id)
        }

        # Inject custom fields into user_data
        for field_def in self.custom_fields:
            field_name = field_def["name"]  # e.g. "employee_id"
            field_type = field_def["input_type"]
            field_id = mappings.get(field_name)  # e.g. "field_347"

            if not field_id:
                # The field was not created in the regform
                continue

            if hasattr(custom_profile, field_name):
                value = getattr(custom_profile, field_name)
                if value is not None:
                    if field_type == "single_choice":
                        # Single choice fields expect a dict with the id as key
                        user_data[field_id] = {value: 1}
                    elif field_type == "multi_choice":
                        # Multi choice fields expect a dict with ids as keys
                        if isinstance(value, list):
                            user_data[field_id] = {v: 1 for v in value}
                        else:
                            user_data[field_id] = {value: 1}
                    else:
                        # Other fields can be set directly
                        user_data[field_id] = value
        return user_data

    def _after_profile_update(
        self,
        sender: RHPersonalDataUpdate,
        result: Any,  # pylint: disable=unused-argument
        **kwargs: Any,
    ) -> None:
        """Handle custom profile field updates after personal data update."""
        # Get the form data from the request
        if sender is not RHPersonalDataUpdate:
            print("Not a personal data update request, skipping.")
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
                    custom_profile = UserCustomProfile.get_for_user(rh.user)
                    print(custom_profile)

                # Update the field
                setattr(custom_profile, field_name, form_data[field_name])

        # Save to database if there were changes
        if is_data_new:
            db.session.add(custom_profile)
            db.session.commit()

    def _prefill_custom_fields(self, _: Any, **kwargs: Any) -> None:
        """Prefill custom fields on the profile page."""
        orig = cast(list[Any], kwargs.get("orig"))
        user = orig[0]
        custom_profile = UserCustomProfile.get_for_user(user)
        if not custom_profile:
            return
        for field_meta in self.custom_fields:
            field_name = field_meta["name"]
            if hasattr(custom_profile, field_name):
                kwargs["data"][0][field_name] = getattr(custom_profile, field_name)

    def _after_form_creation(self, sender: RegistrationForm, **_: Any) -> None:
        """Add custom fields to new registration forms."""
        section_to_add = sender.sections[0]

        for idx, field_meta in enumerate(self.custom_fields, start=1):
            field = RegistrationFormField(
                registration_form=sender,
                parent=section_to_add,
                title=field_meta["title"],
                input_type=field_meta["input_type"],
                is_required=field_meta["is_required"],
                position=idx,
            )

            field_data = {}
            if field_meta["input_type"] in ("single_choice", "multi_choice"):
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

            section_to_add.children.append(field)

            # Flush so we get IDs
            db.session.flush()  # pylint: disable=no-member

            # Store the html_field_name for later prefilling
            db.session.add(  # pylint: disable=no-member
                CustomFieldMapping(
                    regform_id=sender.id,
                    field_name=field_meta["name"],
                    field_id=field.html_field_name,
                )
            )
