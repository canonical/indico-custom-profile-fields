import React from 'react';
import {
  FinalField,
  FinalInput,
  FinalDropdown,
  parsers as p,
} from 'indico/react/forms';
import {
  SyncedFinalAffiliationDropdown,
  SyncedFinalInput,
  SyncedFinalTextArea,
} from 'indico/react/components/syncedInputs';
import {Translate} from 'indico/react/i18n';
import {
  tshirtOptions,
  dietaryOptions,
} from './options';

function MultiCheckboxComponent({value, onChange}) {
  const selected = Array.isArray(value) ? value : [];
  const toggle = v =>
    onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v]);

  return (
    <div>
      {dietaryOptions.map(opt => (
        <label key={opt.id} style={{display: 'block', cursor: 'pointer'}}>
          <input
            type="checkbox"
            checked={selected.includes(opt.id)}
            onChange={() => toggle(opt.id)}
          />{' '}
          {opt.caption}
        </label>
      ))}
    </div>
  );
}

export default function CustomFields({userValues, syncedValues, lockedFields, lockedFieldMessage}) {
  // const {countries} = useSelector(getStaticData);

  return (
    <>
      <FinalInput
        name="legal_name"
        label={Translate.string('Legal Name')}
        type="text"
        required={true}
      />
      <FinalInput
        name="pronouns"
        label={Translate.string('Pronouns')}
        type="text"
        required={false}
        description={
          Translate.string(
            "Please add any pronouns you would like printed on your "+
            "name badge In the format She/Her, He/Him, They/Them"
          )
        }
      />
      <FinalInput
        name="nickname"
        label={Translate.string('Nickname (MM/irc)')}
        type="text"
        required={false}
        description={
          Translate.string(
            "As you would like this printed on your name badge"
          )
        }
      />
      <FinalInput
        name="employee_id"
        label={Translate.string('Employee ID')}
        type="text"
        required={true}
      />
      <FinalInput
        name="group"
        label={Translate.string('Group')}
        type="text"
      />
      <FinalInput
        name="product"
        label={Translate.string('Product')}
        type=""
        description={
          Translate.string(
            'Please confirm how your team name should be formatted on your name badge ' +
            'with your manager, for consistency.'
          )
        }
      />
      <FinalDropdown
        name="shirt_size"
        label={Translate.string('T-Shirt Size')}
        options={tshirtOptions}
        selection
        parse={p.nullIfEmpty}
        placeholder={Translate.string('None', 'Title (salutation)')}
        required={true}
      />
      <FinalField
        name="dietary_options"
        label={Translate.string('Dietary Options')}
        component={MultiCheckboxComponent}
        // keep arrays as-is
        parse={x => x}
      />
      <FinalInput
        name="dietary_details"
        label={Translate.string('Allergy/Dietary Details')}
        type="text"
      />
      <FinalInput
        name="cap_details"
        label={Translate.string('CAP Details')}
        type="textarea"
      />
    </>
  );
}
