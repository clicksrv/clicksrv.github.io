import _ from 'lodash'
import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import { isValidElement } from 'react'

import capitalize from '../helpers/capitalize'
import { placeholderText, t } from '../locales'

import Input from './forms/input'
import TinyMCE from './TinyMCE'
import InputUrls from './forms/input-urls'
import MediaInput from './forms/input-media'
import ProfileImageInput from './forms/input-profile-image'
import { Btn } from './styled/Button'

// NOTE: the form builder also automatically checks the placeholders in en.js
const defaultSchema = {
  default: {
    type: 'text',
  },
  level: {
    type: 'range',
    label: (value) => (
      <label>
        Strength: <strong>{Math.ceil(value / 10)}</strong> / 10
      </label>
    ),
    min: 0,
    max: 10,
  },
  first_name: {
    icon: 'user',
  },
  last_name: {
    icon: 'user',
  },
  websites: {
    customType: InputUrls,
  },
  start_date: {
    label: t('start_date'),
  },
  end_date: {
    label: t('end_date'),
  },
  email: {
    type: 'email',
    autoComplete: 'email',
    validations: 'isEmail',
    validationError: 'Email is invalid',
  },
  full_name: {
    type: 'text',
    autoComplete: 'name',
    required: true,
  },
  phone: {
    // type: 'number',
    autoComplete: 'tel',
    icon: 'phone',
  },
  location: {
    type: 'text',
    autoComplete: 'city',
    icon: 'map-marker',
  },
  url: {
    icon: 'globe',
  },
  organization: {
    icon: 'building-o',
  },
  organization_url: {
    icon: 'globe',
  },
  description: {
    label: t('description'),
    customType: TinyMCE,
  },
  password: {
    key: 'password',
    type: 'password',
    autoComplete: 'current-password',
    validations: 'minLength:8',
    validationError: 'Password is too short',
    required: true,
  },
  assets: {
    label: t('media'),
    customType: MediaInput,
  },
  thumb: {
    customType: ProfileImageInput,
  },
}

defaultSchema.password_confirm = defaultSchema.password

export const FormBuilder = (props) => {
  const {
    children,
    className,
    editableKeys,
    formData,
    humanizeErrors,
    label,
    onChange,
    onInvalid,
    onValid,
    onValidSubmit,
    prompt,
    sectionKey,
    index,
    submitBtn,
    submitLabel = t('submit'),
    validationErrors,
  } = props

  const schema = _.defaults({}, props.schema, defaultSchema)

  const renderPrompt = () => {
    return prompt ? <h3>{prompt}</h3> : null
  }

  const doHumanizeErrors = (errors) => {
    return _.reduce(
      errors,
      (res, messages, field) => ({
        ...res,
        [field]: `${capitalize(field).replace('_', ' ')} ${messages[0]}.`,
      }),
      {}
    )
  }

  const inputs = []

  let submitButton

  if (isValidElement(submitBtn)) {
    submitButton = submitBtn
  } else if (submitBtn !== null) {
    submitButton = <Btn type="submit">{submitLabel}</Btn>
  }

  const errors = validationErrors

  // TODO currently the formData relies on key value to generate the order of the input
  for (const formKey in formData) {
    const props = schema[formKey] || schema.default
    const value = formData[formKey]
    const placeholder = schema[formKey]?.placeholder || placeholderText(sectionKey, formKey) || label

    props.name = formKey
    props.value = value
    props.sectionKey = sectionKey
    props.index = index
    props.placeholder = placeholder

    if (formKey === 'description') {
      // pass special prop to TinyMCE
      props.editing = true
    }

    if (editableKeys && !_.includes(editableKeys, formKey)) {
      inputs.push(
        <Input
          {...props}
          type="hidden"
          disabled
          key={formKey}
        />
      )
    } else {
      inputs.push(
        <Input
          {...props}
          key={formKey}
        />
      )
    }
  }

  return (
    <Formsy
      className={className}
      onSubmit={onValidSubmit}
      onChange={onChange}
      onValid={onValid}
      onInvalid={onInvalid}
      validationErrors={humanizeErrors ? doHumanizeErrors(errors) : errors}>
      {renderPrompt()}
      {inputs}

      {(children || submitButton) && <div style={{ marginTop: 40 }}>{children || submitButton}</div>}
    </Formsy>
  )
}

FormBuilder.propTypes = {
  formData: PropTypes.object.isRequired,
  schema: PropTypes.object,
  validationErrors: PropTypes.object,
  humanizeErrors: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onValidSubmit: PropTypes.func,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
  className: PropTypes.string,
  submitLabel: PropTypes.string,
  editableKeys: PropTypes.array,
  sectionKey: PropTypes.string,
  index: PropTypes.number,
  prompt: PropTypes.node,
  submitBtn: PropTypes.node,
  children: PropTypes.node,
}

FormBuilder.defaultProps = {
  schema: {},
  humanizeErrors: false,
}

export const updatePasswordFormSchema = {
  current_password: {
    label: t('current_password'),
    placeholder: t('current_password'),
    type: 'password',
    autoComplete: 'current-password',
    validations: 'minLength:8',
    validationError: 'Password is too short',
    required: true,
  },

  password: {
    label: t('new_password'),
    placeholder: t('new_password'),
    type: 'password',
    autoComplete: 'new-password',
    validations: 'minLength:8',
    validationError: 'Password is too short',
    required: true,
  },

  password_confirmation: {
    label: t('confirm_password'),
    placeholder: t('confirm_password'),
    type: 'password',
    autoComplete: 'new-password',
    validations: 'equalsField:password',
    validationError: 'Password confirmation does not match the new password',
    required: true,
  },
}

export { Formsy as Form, Input }
