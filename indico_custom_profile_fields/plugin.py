from flask import flash, redirect, render_template, render_template_string, request
from indico.core import signals
from indico.core.db import db
from indico.core.plugins import IndicoPlugin, IndicoPluginBlueprint
from indico.modules.events.registration.controllers.display import RHRegistrationForm
from indico.modules.events.registration.models.form_fields import (
    RegistrationFormField,
    RegistrationFormFieldData,
)
from indico.modules.events.registration.models.forms import RegistrationForm
from indico.modules.events.registration.models.items import (
    RegistrationFormItemType,
    RegistrationFormSection,
)
from indico.modules.events.registration.util import get_user_data
from indico.modules.users.controllers import (
    RHPersonalData,
    RHPersonalDataUpdate,
    UserPersonalDataSchema,
)
from indico.util.signals import interceptable_sender
from indico.web.flask.util import url_for
from indico.web.forms.base import IndicoForm
from indico.web.views import WPBase
from wtforms.fields import StringField
from wtforms.validators import Optional

from indico_custom_profile_fields.models.custom_fields import (
    CustomFieldMapping,
    UserCustomProfile,
)

from .fields_list import custom_fields

# from indico_custom_profile_fields.models.field_mapping import CustomFieldMapping


class CustomProfileFieldsPlugin(IndicoPlugin):
    """Custom Profile Test Plugin"""

    custom_fields = custom_fields

    def init(self):
        super().init()
        self.inject_bundle("main.js")

        # Hook into profile page to prefill custom fields
        # signals.rh.before_process.connect(
        #     self._prefill_custom_fields, sender=RHPersonalData
        # )
        signals.plugin.schema_post_dump.connect(
            self._prefill_custom_fields, sender=UserPersonalDataSchema
        )
        # Hook into profile update to handle custom field updates
        signals.rh.process.connect(
            self._after_profile_update, sender=RHPersonalDataUpdate
        )
        # Hook into registration form to add custom fields
        signals.event.registration_form_created.connect(self._after_form_creation)

        # Debugging - remove later
        # signals.plugin.schema_post_dump.connect(self._print_schema_info)
        # signals.plugin.schema_post_load.connect(self._print_schema_info)
        # signals.plugin.schema_pre_load.connect(self._print_schema_info)
        # signals.rh.process.connect(self._print_rh_info, sender=RHRegistrationForm)
        self.connect(
            signals.plugin.interceptable_function,
            self._get_user_data,
            sender=interceptable_sender(get_user_data),
        )
        signals.event.registration_created.connect(self._check_reg)

    def _check_reg(self, sender, **kwargs):
        print("New registration created")
        print(f"Sender: {sender}")
        print(f"Kwargs: {kwargs}")
        # Access registration data

    def _get_user_data1(self, sender, func, args, **kwargs):
        print("Intercepted get_user_data call")
        print(f"Sender: {sender}")
        print(f"Args: {args}")
        print(f"Kwargs: {kwargs}")
        _, user, _ = args.args
        print(args.args[1])
        print(user)
        print(user is args.args[1])
        print(func)
        user_data = func(*args.args, **args.kwargs)
        # Populate the country field with the user's data
        print(user_data)
        print(user_data)
        return user_data

    def _get_user_data(self, sender, func, args, **kwargs):
        print("Intercepted get_user_data call")

        # Call the original function to get the base data
        user_data = func(*args.args, **args.kwargs)

        # Grab the user from kwargs
        user = args.args[1]
        if not user:
            print("No user found, skipping custom profile injection")
            return user_data

        # Fetch custom profile
        custom_profile = UserCustomProfile.get_for_user(user)
        print(user)
        print(custom_profile)
        if not custom_profile:
            print("No custom profile found for user")
            return user_data
        mappings = {
            m.field_name: m.field_id
            for m in CustomFieldMapping.query.filter_by(regform_id=sender.id)
        }
        print(custom_profile.legal_name)
        print(mappings)

        # Inject custom fields into user_data
        for field_def in self.custom_fields:
            field_name = field_def["name"]  # e.g. "employee_id"
            field_id = mappings.get(field_name)  # e.g. "field_347"
            print(field_name, field_id)

            if not field_id:
                # The field was not created in the regform
                continue

            if hasattr(custom_profile, field_name):
                value = getattr(custom_profile, field_name)
                if value is not None:
                    user_data[field_id] = value

        print("Final user_data with custom fields:", user_data)
        return user_data

    def _after_profile_update(self, sender, result, **kwargs):
        """Handle custom profile field updates after personal data update."""
        # Get the form data from the request
        print(sender)
        print(result)
        print(f" Kwargs: {kwargs}")
        print(kwargs.get("rh"))
        print(request.json)
        print(request.form)
        if sender is not RHPersonalDataUpdate:
            print("Not a personal data update request, skipping.")
            return
        formData = request.json
        rh = kwargs.get("rh")

        # Check if test field is present in the form data
        customProfile = None
        isDataNew = False
        for field_meta in self.custom_fields:
            field_name = field_meta["name"]
            if field_name in formData:
                isDataNew = True
                if not customProfile:
                    customProfile = UserCustomProfile.get_for_user(rh.user)
                    print(customProfile)

                # Update the test field
                setattr(customProfile, field_name, formData[field_name])

        # Save to database if there were changes
        if isDataNew:
            db.session.add(customProfile)
            db.session.commit()

    def _prefill_custom_fields(self, sender, **kwargs):
        rh = kwargs.get("rh")
        user = kwargs.get("orig")[0]
        custom_profile = UserCustomProfile.get_for_user(user)
        if not custom_profile:
            return
        for field_meta in self.custom_fields:
            field_name = field_meta["name"]
            if hasattr(custom_profile, field_name):
                kwargs["data"][0][field_name] = getattr(custom_profile, field_name)

    def _after_form_creation(self, sender: RegistrationForm, **kwargs):
        """Hook: Add custom fields when a new registration form is created."""

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
                            "is_deleted": False,
                            "is_disabled": False,
                        }
                        for c in field_meta.get("choices", [])
                    ],
                }

            # Initialize field data
            field.data, versioned_data = field.field_impl.process_field_data(field_data)
            field.current_data = RegistrationFormFieldData(
                versioned_data=versioned_data
            )

            section_to_add.children.append(field)

            # Flush so we get IDs
            db.session.flush()

            # Store the html_field_name for later prefilling
            db.session.add(
                CustomFieldMapping(
                    regform_id=sender.id,
                    field_name=field_meta[
                        "name"
                    ],  # your logical name, e.g. "dietary_options"
                    field_id=field.html_field_name,  # "field_347" etc
                )
            )

    # def _after_form_creation(self, sender: RegistrationForm, **kwargs):
    #     print(isinstance(sender, RegistrationForm))
    #     print(sender)
    #     print(sender.sections)
    #     print(sender.event)
    #     print(sender.form_items)
    #     print(sender.active_fields)
    #     print(sender.active_labels)
    #     print(f" Kwargs: {kwargs}")

    #     # Example: add a custom text field
    #     print(sender.sections)
    #     section_to_add = sender.sections[0]
    #     field1 = RegistrationFormField(
    #         registration_form=sender,
    #         parent=section_to_add,
    #         title="GitHub Username",
    #         input_type="text",
    #         is_required=False,
    #         position=1,
    #     )
    #     field1.data, versioned_data = field1.field_impl.process_field_data({})
    #     field1.current_data = RegistrationFormFieldData(versioned_data=versioned_data)
    #     section_to_add.children.append(field1)
    #     db.session.flush()
    #     print(field1.id)
    #     print(field1.html_field_name)
