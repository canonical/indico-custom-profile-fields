// Copyright 2025 Canonical Ltd.
// See LICENSE file for licensing details.

import React from 'react';
import {
  FinalField,
  FinalInput,
  FinalDropdown,
  parsers as p,
} from 'indico/react/forms';
import {Translate} from 'indico/react/i18n';
import customFields from './custom_fields.json';


/*
  Renders custom fields based on the configuration in custom_fields.json
  Supports text, textarea, single_choice (dropdown), and multi_choice (checkboxes)
  fields.
*/
export default function CustomFields() {
  return (
    <>
      {customFields.map(field => {
        if (field.input_type === 'text' || field.input_type === 'textarea') {
          return (
            <FinalInput
              key={field.name}
              name={field.name}
              label={Translate.string(field.title)}
              type={field.input_type}
              required={field.is_required}
              description={field.description ? Translate.string(field.description) : undefined}
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
            />
          );
        }

        if (field.input_type === 'multi_choice') {
          return (
            <FinalField
              key={field.name}
              name={field.name}
              label={Translate.string(field.title)}
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
