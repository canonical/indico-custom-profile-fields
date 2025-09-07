import {registerPluginComponent} from 'indico/utils/plugins';

import CustomFields from './customFieldForms';

registerPluginComponent(
  'custom_profile_fields',
  'user-personal-data-form-inputs', // the extension point in PersonalDataForm.jsx
  CustomFields
);
