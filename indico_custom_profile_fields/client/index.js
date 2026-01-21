// Copyright 2025 Canonical Ltd.
// See LICENSE file for licensing details.

import {registerPluginComponent} from 'indico/utils/plugins';
import CustomFields from './customFieldForms';
import './disableWithdrawButton.scss';

/*
  Register the custom fields component for the user personal data form.
*/
registerPluginComponent(
  'custom_profile_fields',
  'user-personal-data-form-inputs', // the extension point in PersonalDataForm.jsx
  CustomFields
);
