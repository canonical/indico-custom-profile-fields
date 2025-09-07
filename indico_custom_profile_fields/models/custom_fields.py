"""Database model for custom profile fields."""

from indico.core.db import db
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

    # def has_data(self):
    #     """Check if any custom fields have data."""
    #     fields = [self.country]
    #     return any(field for field in fields if field)

    # def to_dict(self):
    #     """Convert to dictionary for API/export."""
    #     return {
    #         "country": self.country,
    #     }

    # def update_from_dict(self, data):
    #     """Update fields from dictionary."""
    #     for field in [
    #         "country",
    #     ]:
    #         if field in data:
    #             setattr(self, field, data[field] or None)


class CustomFieldMapping(db.Model):
    __tablename__ = "custom_field_mapping"
    __table_args__ = {"schema": "plugin_custom_profile_fields"}

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

    __table_args__ = (
        db.UniqueConstraint("regform_id", "field_name", name="uq_custom_field_mapping"),
    )

    def __repr__(self):
        return format_repr(self, "regform_id", "field_name", "field_id")
