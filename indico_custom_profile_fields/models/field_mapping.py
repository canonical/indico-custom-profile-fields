#!/usr/bin/env python3

# Copyright 2025 Canonical Ltd.
# See LICENSE file for licensing details.

"""Database model for field mappings.

The model stores the mappings between custom profile fields and registration
form fields to facilitate the integration of custom user data into event
registration.
"""

from indico.core.db import db
from indico.util.string import format_repr


class CustomFieldMapping(db.Model):  # pylint: disable=too-few-public-methods
    """Model for mapping custom profile fields to registration form fields.

    Attributes:
        id: Primary key.
        regform_id: Foreign key to the registration form.
        field_name: Name of the custom profile field.
        field_id: ID of the corresponding registration form field.
        regform: Relationship to the RegistrationForm model.
    """

    __tablename__ = "custom_field_mapping"
    __table_args__ = (
        db.UniqueConstraint("regform_id", "field_name", name="uq_custom_field_mapping"),
        {"schema": "plugin_custom_profile_fields"},
    )

    id = db.Column(db.Integer, primary_key=True)  # noqa: A003 - refers to db column id
    regform_id = db.Column(
        db.Integer,
        db.ForeignKey("event_registration.forms.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    field_name = db.Column(db.String, nullable=False)
    field_id = db.Column(db.String, nullable=False)

    regform = db.relationship(
        "RegistrationForm",
        lazy=True,
        backref=db.backref(
            "custom_field_mappings",
            lazy="dynamic",
            cascade="all, delete-orphan",
        ),
    )

    def __repr__(self) -> str:
        """Return string representation.

        Returns:
            str: A string representation of the CustomFieldMapping instance.
        """
        return format_repr(self, "regform_id", "field_name", "field_id")
