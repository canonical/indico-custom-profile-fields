# Indico Custom Profile Fields Plugin

This plugin adds new custom fields to the profile, and extends them to the event registration forms. Currently, it adds the following fields:

- Legal name

- Pronouns

- Nickname (MM/irc)

- Employee ID 
    
- Group
    
- Product
    
- T-shirt Size (Single choice Dropdown) 
    
- Dietary Options (Multi-choice checkbox)

- Allergy/Dietary Details
    
- CAP details
    

## Motivation

Currently, the only user information stored in the database are the fields in the profile page and only those fields come prefilled to the event registration form. However, the listed fields above are also requested in every event registration form, and the users have to re-enter these details at every event as the information provided are not stored in the Indico's database. With this plug-in, these new fields will be available to be updated in the profile page, and users will be able to update these fields in their profile page, and they will be prefilled in the event registration forms.

## How It Works

### Profile page
The plugin adds the listed fields to the profile page, and the necessary models in the database so that the users can update their profile with these fields, and the information will be stored.

## Registration Form
When an admin creates a registration form, the added fields are automatically added and enabled in the form, and are associated with the profile page fields. The admin will only need to add any additional fields they require and open the registration. Then, when a user visit the registration form, the added fields are going to be pre-filled with the information from their profile page, avoiding re-entering these information at every event.

## Installation

Indico's installation guides are available [here.](https://docs.getindico.io/en/stable/installation/)

To install the plugin, switch to the virtual environment of Indico:

```
source /path/to/yourindico/env/bin/activate
```

Then, clone this repository and install the package via pip:
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


