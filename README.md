# Indico custom profile fields plugin

This plugin adds new custom fields to the profile, and extends them to the event registration forms. Currently, it adds the following fields:

- Legal First Name

- Legal Last Name

- Pronouns

- Nickname (MM/irc)

- Employee ID (admin-only)
    
- Group
    
- Product

- Country (Single choice Dropdown)
    
- T-shirt Size (Single choice Dropdown) 
    
- Dietary Options (Multi-choice checkbox)

- Allergy/Dietary Details
    
- CAP details (admin-only)
    
On top of the new fields, the plugin now hides the "Withdraw" button from the registration forms.

## Motivation

Currently, the only user information stored in the database are the fields in the profile page, and only those fields come pre-filled to the event registration form. However, the listed fields above are also requested in every event registration form, and the users have to re-enter these details at every event as the information provided are not stored in Indico's database. With this plugin, these new fields will be available to be updated in the profile page, users will be able to update these fields in their profile page, and they will be pre-filled in the event registration forms.

## How it works

In this section, the working principle of the plugin is detailed.

### Profile page

The plugin adds the listed fields to the profile page, and the necessary models in the database so that the users can update their profile with these fields, and the information will be stored.

### Registration form

When an admin creates a registration form, the added fields are automatically added and enabled in the form, and are associated with the profile page fields. The admin will only need to add any additional fields they require and open the registration. Then, when a user visit the registration form, the added fields are going to be pre-filled with the information from their profile page, avoiding re-entering these information at every event.

### Admin-only fields

The plugin supports two admin-only fields: CAP Details and Employee ID. These fields are not editable by regular users on their profiles; they can only be edited by the admins. Moreover, these fields are considered sensitive and are hidden in the registration form so that regular users can't see and interact with these fields. Admin-only fields are silently added to the registration forms, and the values from the profile fields are copied to the registration form when the form is submitted. 

### Copying field values from profile to registration form

Indico hooks access form fields using their unique IDs (generated upon creation) rather than their names. Therefore, the plugin cannot automatically link a profile field to a registration form field based solely on the name. To solve this, the plugin explicitly creates the fields and stores a `{field_name: field_id}`. 

The process operates as follows:

1. **Creation**: When a registration form is created, the plugin automatically generates a corresponding registration form field for each custom profile field.

2. **Mapping**: The plugin stores a specific link between the Profile Field Name and the new Registration Form Field ID in the database.

3. **Copying**: When a user opens the form, the plugin uses this stored mapping to copy values from the profile to the correct registration field.

**Important limitation: Do not delete the fields created by the plugin.** The mapping relies entirely on the specific ID generated during the plugin's initial creation process. If an admin deletes a field and manually re-adds it — even with the exact same name and settings — Indico will generate a new ID. This breaks the link, and data will no longer be copied from the user's profile. Admins are free to add or remove any fields that the plugin does not interact with.

### Hidden withdraw button

After a registration is submitted, there is currently no way to display the "Modify" button but hide the "Withdraw" button from the registration page. This plugin hides the "Withdraw" button so that it is possible to enable modifying without giving users the ability to withdraw their registration. Note that with this plugin active, there is no way to re-enable the "Withdraw" button.

## Installation

Indico's installation guides are available [here.](https://docs.getindico.io/en/stable/installation/)

To install the plugin, switch to the virtual environment of Indico:

```
source /path/to/yourindico/env/bin/activate
```

Then, clone this repository and install the package with pip:
```
cd /path/to/indico-custom-profile-fields
pip install .
```

Finally, add the following to `indico.conf`, which will be in `/path/to/yourindico/src/indico`:
```
PLUGINS = {'custom_profile_fields'}
```

If the `PLUGINS` already exists, simply add `'custom_profile_fields'` to the end of the list.

You should see the plugin by listing all installed plugins:
```
indico setup list-plugins
```

The plugin uses its own database models, so you also need to apply them to run the plugin:

```
indico db --plugin custom_profile_fields upgrade
```

See [here](https://docs.getindico.io/en/latest/installation/plugins/) for more information on installing Indico plugins.


