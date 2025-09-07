# """Database model for field mappings between custom profile fields and registration form fields."""

# from indico.core.db import db
# from indico.util.string import format_repr


# class CustomFieldMapping(db.Model):
#     __tablename__ = "custom_field_mapping"
#     __table_args__ = {"schema": "plugin_custom_profile_fields"}

#     id = db.Column(db.Integer, primary_key=True)
#     regform_id = db.Column(
#         db.Integer,
#         db.ForeignKey("event_registration.forms.id", ondelete="CASCADE"),
#         nullable=False,
#         index=True,
#     )
#     field_name = db.Column(db.String, nullable=False)
#     field_id = db.Column(db.String, nullable=False)

#     __table_args__ = (
#         db.UniqueConstraint("regform_id", "field_name", name="uq_custom_field_mapping"),
#     )

#     def __repr__(self):
#         return format_repr(self, "regform_id", "field_name", "field_id")
