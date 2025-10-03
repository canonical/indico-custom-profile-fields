#!/usr/bin/env python3

# Copyright 2025 Canonical Ltd.
# See LICENSE file for licensing details.

"""new table for field mappings.

Revision ID: 3b609596bb71
Revises: b9758dbfb220
Create Date: 2025-09-08 10:14:39.407406
"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "3b609596bb71"
down_revision = "b9758dbfb220"
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Create new custom_field_mapping table."""
    op.create_table(
        "custom_field_mapping",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("regform_id", sa.Integer(), nullable=False),
        sa.Column("field_name", sa.String(), nullable=False),
        sa.Column("field_id", sa.String(), nullable=False),
        sa.Column("field_surname", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["regform_id"],
            ["event_registration.forms.id"],
            name=op.f("fk_custom_field_mapping_regform_id_forms"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_custom_field_mapping")),
        sa.UniqueConstraint("regform_id", "field_name", name="uq_custom_field_mapping"),
        schema="plugin_custom_profile_fields",
    )
    op.create_index(
        op.f("ix_custom_field_mapping_regform_id"),
        "custom_field_mapping",
        ["regform_id"],
        unique=False,
        schema="plugin_custom_profile_fields",
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    """Drop custom_field_mapping table."""
    op.drop_index(
        op.f("ix_custom_field_mapping_regform_id"),
        table_name="custom_field_mapping",
        schema="plugin_custom_profile_fields",
    )
    op.drop_table("custom_field_mapping", schema="plugin_custom_profile_fields")
    # ### end Alembic commands ###
