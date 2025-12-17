#!/usr/bin/env python3

# Copyright 2025 Canonical Ltd.
# See LICENSE file for licensing details.

"""Database model for custom profile fields."""

from indico.core.db import db
from indico.modules.users.models.users import User
from indico.util.string import format_repr


class UserCustomProfile(db.Model):
    """Model for storing custom user profile fields.

    Attributes:
        id: Primary key.
        user_id: Foreign key to the users table.
        legal_first: Legal first name of the user.
        legal_last: Legal last name of the user.
        pronouns: Pronouns of the user.
        nickname: Nickname of the user.
        employee_id: Employee ID of the user.
        group: Group the user is in.
        product: Product the user is in.
        shirt_size: Shirt size of the user.
        dietary_options: Dietary options of the user (stored as JSON).
        dietary_details: Additional dietary details of the user.
        cap_details: Cap details of the user.
        country: Country of the user.
        user: Relationship to the User model.
    """

    __tablename__ = "user_custom_profiles"
    __table_args__ = (
        db.UniqueConstraint("user_id"),
        {"schema": "plugin_custom_profile_fields"},
    )

    id = db.Column(db.Integer, primary_key=True)  # noqa: A003 - refers to db column id
    user_id = db.Column(db.Integer, db.ForeignKey("users.users.id"), nullable=False, index=True)

    # Custom fields
    legal_first = db.Column(db.String, nullable=True)
    legal_last = db.Column(db.String, nullable=True)
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
            "custom_profile",
            lazy=True,
            uselist=False,
            cascade="all, delete-orphan",
        ),
    )

    def __repr__(self) -> str:
        """Return string representation.

        Returns:
            str: A string representation of the UserCustomProfile instance.
        """
        return format_repr(
            self,
            "id",
            "user_id",
            "legal_first",
            "legal_last",
            "group",
            "product",
            _text=self.user.full_name if self.user else None,
        )

    @classmethod
    def get_for_user(cls, user: User) -> "UserCustomProfile | None":
        """Get custom profile for a user, creating if necessary.

        Arguments:
            user: The user to fetch from DB.

        Returns:
            UserCustomProfile or None if user does not exist.
        """
        if isinstance(user, int):
            user = User.get(user)

        if not user:
            return None

        profile = cls.query.filter_by(user_id=user.id).first()
        if not profile:
            profile = cls(user=user)
        return profile
