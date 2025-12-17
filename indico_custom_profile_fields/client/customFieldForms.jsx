// Copyright 2025 Canonical Ltd.
// See LICENSE file for licensing details.

import React, { useState, useEffect } from 'react';
import {
  FinalField,
  FinalInput,
  FinalDropdown,
  parsers as p,
} from 'indico/react/forms';
import {Translate} from 'indico/react/i18n';
import customFields from './custom_fields.json';
import indicoAxios from 'indico/utils/axios';

/*
  Renders custom fields based on the configuration in custom_fields.json
  Supports text, textarea, single_choice (dropdown), and multi_choice (checkboxes)
  fields.
*/

// Helper for flags
const isoToFlag = country =>
  String.fromCodePoint(...country.split('').map(c => c.charCodeAt() + 0x1f1a5));

export default function CustomFields() {
  const [countryOptions, setCountryOptions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    async function loadData() {
      // Fetch response from the API endpoint
      const response = await indicoAxios.get('/plugin/custom_profile_fields/api/config');
      const { countries, is_admin } = response.data;

      setIsAdmin(is_admin); // Save admin status

      // Convert the raw country data (code/name) immediately into Dropdown format (key/text)
      const formattedOptions = countries.map(c => ({
        key: c.code,
        value: c.code,
        text: `${isoToFlag(c.code)} ${c.name}`
      }));
      // Save it to memory
      setCountryOptions(formattedOptions);
    }
    loadData();
  }, []); // The empty [] means "only run this once"

  return (
    <>
      {customFields.map(field => {
        const isDisabled = field.is_disabled && !isAdmin;
        if (field.input_type === 'text' || field.input_type === 'textarea') {
          return (
            <FinalInput
              key={field.name}
              name={field.name}
              label={Translate.string(field.title)}
              type={field.input_type}
              required={field.is_required}
              disabled={isDisabled}
              description={field.description ? Translate.string(field.description) : undefined}
            />
          );
        }

        if (field.input_type === 'country') {
          return (
            <FinalDropdown
              key={field.name}
              name={field.name}
              label={Translate.string(field.title)}
              options={countryOptions} // <--- Pass the list from memory
              selection
              search
              required={field.is_required}
              disabled={isDisabled}
              placeholder={Translate.string('Select a country')}
            />
          );
        }

        if (field.input_type === 'single_choice') {
          return (
            <FinalDropdown
              key={field.name}
              name={field.name}
              label={Translate.string(field.title)}
              options={field.choices.map(c => ({key: c.id, value: c.id, text: c.caption}))}
              selection
              parse={p.nullIfEmpty}
              placeholder={Translate.string('None')}
              required={field.is_required}
              disabled={isDisabled}
            />
          );
        }

        if (field.input_type === 'multi_choice') {
          return (
            <FinalField
              key={field.name}
              name={field.name}
              label={Translate.string(field.title)}
              required={field.is_required}
              disabled={isDisabled}
              component={({value, onChange}) => (
                <div>
                  {(field.choices || []).map(opt => (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        gap: '0.4em'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={(value || []).includes(opt.id)}
                        onChange={() =>
                          onChange(
                            (value || []).includes(opt.id)
                              ? (value || []).filter(v => v !== opt.id)
                              : [...(value || []), opt.id]
                          )
                        }
                      />
                      {opt.caption}
                    </label>
                  ))}
                </div>
              )}
              parse={x => x}
            />
          );
        }

        return null;
      })}
    </>
  );
}
