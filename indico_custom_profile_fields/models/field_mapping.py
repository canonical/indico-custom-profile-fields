#!/usr/bin/env python3

# Copyright 2025 Canonical Ltd.
# See LICENSE file for licensing details.

"""Database model for field mappings between custom profile fields and registration form fields."""

from indico.core.db import db
from indico.modules.events.registration.models.forms import RegistrationForm
from indico.util.string import format_repr


class CustomFieldMapping(db.Model):
    """Model for mapping custom profile fields to registration form fields."""

    __tablename__ = "custom_field_mapping"
    __table_args__ = (
        db.UniqueConstraint("regform_id", "field_name", name="uq_custom_field_mapping"),
        {"schema": "plugin_custom_profile_fields"},
    )

    id = db.Column(db.Integer, primary_key=True)
    regform_id = db.Column(
        db.Integer,
        db.ForeignKey("event_registration.forms.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    field_name = db.Column(db.String, nullable=False)
    field_id = db.Column(db.String, nullable=False)
    field_surname = db.Column(db.String, nullable=True)

    regform = db.relationship(
        "RegistrationForm",
        lazy=True,
        backref=db.backref(
            "custom_field_mappings",
            lazy="dynamic",
            cascade="all, delete-orphan",
        ),
    )

    def __repr__(self):
        """Return string representation."""
        return format_repr(self, "regform_id", "field_name", "field_id")
