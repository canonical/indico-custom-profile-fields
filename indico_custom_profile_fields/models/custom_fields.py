#!/usr/bin/env python3

# Copyright 2025 Canonical Ltd.
# See LICENSE file for licensing details.

"""Database model for custom profile fields."""

from indico.core.db import db
from indico.modules.events.registration.models.forms import RegistrationForm
from indico.modules.users.models.users import User
from indico.util.string import format_repr


class UserCustomProfile(db.Model):
    """Model for storing custom user profile fields."""

    __tablename__ = "user_custom_profiles"
    __table_args__ = (
        db.UniqueConstraint("user_id"),
        {"schema": "plugin_custom_profile_fields"},
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.users.id"), nullable=False, index=True
    )

    # Custom fields
    legal_name = db.Column(db.String, nullable=True)
    pronouns = db.Column(db.String, nullable=True)
    nickname = db.Column(db.String, nullable=True)
    employee_id = db.Column(db.String, nullable=True)
    group = db.Column(db.String, nullable=True)
    product = db.Column(db.String, nullable=True)
    shirt_size = db.Column(db.String, nullable=True)
    dietary_options = db.Column(db.JSON, nullable=True)
    dietary_details = db.Column(db.Text, nullable=True)
    cap_details = db.Column(db.Text, nullable=True)
    country = db.Column(db.String, nullable=True)

    # Relationships
    user = db.relationship(
        "User",
        lazy=True,
        backref=db.backref(
            "custom_profile", lazy=True, uselist=False, cascade="all, delete-orphan"
        ),
    )

    def __repr__(self):
        """String representation."""
        return format_repr(
            self,
            "id",
            "user_id",
            "legal_name",
            "group",
            "product",
            _text=self.user.full_name if self.user else None,
        )

    @classmethod
    def get_for_user(cls, user):
        """Get custom profile for a user, creating if necessary."""
        if isinstance(user, int):
            user = User.get(user)

        if not user:
            return None

        profile = cls.query.filter_by(user_id=user.id).first()
        if not profile:
            profile = cls(user=user)
        return profile
