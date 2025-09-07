# custom fields with all needed metadata
custom_fields = [
    {
        "name": "legal_name",
        "title": "Legal Name",
        "input_type": "text",
        "is_required": True,
    },
    {
        "name": "pronouns",
        "title": "Pronouns",
        "input_type": "text",
        "is_required": False,
    },
    {
        "name": "nickname",
        "title": "Nickname (MM/irc)",
        "input_type": "text",
        "is_required": False,
    },
    {
        "name": "employee_id",
        "title": "Employee ID",
        "input_type": "text",
        "is_required": True,
    },
    {"name": "group", "title": "Group", "input_type": "text", "is_required": False},
    {"name": "product", "title": "Product", "input_type": "text", "is_required": False},
    {
        "name": "shirt_size",
        "title": "T-Shirt Size",
        "input_type": "single_choice",
        "is_required": True,
        "item_type": "dropdown",
        "choices": [
            {"id": "s", "caption": "Small"},
            {"id": "m", "caption": "Medium"},
            {"id": "l", "caption": "Large"},
            {"id": "xl", "caption": "Extra Large"},
        ],
    },
    {
        "name": "dietary_options",
        "title": "Dietary Options",
        "input_type": "multi_choice",
        "is_required": False,
        "item_type": "checkbox",
        "choices": [
            {"id": "veg", "caption": "Vegetarian"},
            {"id": "vegan", "caption": "Vegan"},
            {"id": "gf", "caption": "Gluten-Free"},
            {"id": "halal", "caption": "Halal"},
        ],
    },
    {
        "name": "dietary_details",
        "title": "Allergy/Dietary Details",
        "input_type": "text",
        "is_required": False,
    },
    {
        "name": "cap_details",
        "title": "Cap Details",
        "input_type": "text",
        "is_required": False,
    },
]
