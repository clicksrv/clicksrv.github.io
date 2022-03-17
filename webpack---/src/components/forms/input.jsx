import classNames from 'classnames'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'
import { propTypes, withFormsy } from 'formsy-react'
import { createElement, isValidElement } from 'react'

import { InputCheckbox } from '../InputCheckbox'
import Select from './Select'
import Slider from '../Slider'
import { primaryLight, primaryLightest, redError } from '../../colors'
import { t } from '../../locales'

const TextField = styled.input`
  border: 1px solid ${primaryLight};
  border-radius: 8px;
  background-color: ${primaryLightest};
  color: #333333;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;

  padding: 16px 20px;

  &:required {
    box-shadow: none;
  }
`

const Textarea = styled(TextareaAutosize)`
  border: 1px solid ${primaryLight};
  border-radius: 8px;
  background-color: ${primaryLightest};
  color: #333333;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;

  max-width: 100%;
  padding: 16px 20px;
`

const InputContainer = styled.div`
  color: #333333;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;

  display: flex;
  flex-direction: column;

  margin-bottom: ${({ type }) => (type === 'hidden' ? 0 : 20)}px;
  position: relative;

  .error-message {
    color: ${redError};

    margin-top: 5px;
  }
`

const Label = styled.label`
  color: #888888;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  text-transform: uppercase;

  margin-bottom: 5px;
`

const Input = ({
  // FormsyReact props
  errorMessage,
  errorMessages,
  hasValue,
  isFormDisabled,
  isFormSubmitted,
  isPristine,
  isRequired,
  isValid,
  isValidValue,
  resetValue,
  setValidations,
  setValue,
  showError,
  showRequired,
  validationError,
  validationErrors,
  value,
  // Our local props
  customType,
  defaultValue,
  info,
  label,
  nullable,
  options,
  priorityOptions,
  style,
  type,
  // The rest to pass to inner input control
  ...rest
}) => {
  // null is not a valid value to send to an input value prop and undefined means uncontrolled component.
  if (value === undefined || value === null) {
    const newValue = defaultValue || ''
    setValue(newValue)
  }

  const changeValue = (e) => {
    e.stopPropagation()
    setValue(e.currentTarget.value)
  }

  const renderLabel = () => {
    if (!label) {
      return null
    }

    if (isValidElement(label)) {
      return label
    }

    if (typeof label === 'string') {
      return <Label>{label}</Label>
    }

    if (typeof label === 'function') {
      return label(value)
    }

    return <Label>{t(label) || rest.placeholder}</Label>
  }

  const renderInfo = () => {
    if (!info) {
      return null
    }

    return <p style={{ margin: '0.5em 0 1em' }}>{typeof info === 'function' ? info(value) : info}</p>
  }

  const renderInput = () => {
    if (customType) {
      return createElement(customType, { ...rest, setValue, value })
    }

    if (type === 'textarea') {
      return (
        <Textarea
          {...rest}
          onChange={changeValue}
          value={value}
          minRows={3}
        />
      )
    }

    if (type === 'range') {
      return (
        <Slider
          {...rest}
          currentValue={value}
          value={value}
          onChange={setValue}
        />
      )
    }

    if (type === 'select') {
      const resolvedPriorityOptions = priorityOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}>
          {option.label || option.value}
        </option>
      ))

      if (resolvedPriorityOptions.length) {
        resolvedPriorityOptions.push(
          <option
            key="---"
            disabled>
            ---------------
          </option>
        )
      }

      return (
        <Select
          {...rest}
          onChange={changeValue}
          value={value}>
          {nullable ? (
            <option
              key="empty"
              value="">
              -
            </option>
          ) : null}
          {resolvedPriorityOptions}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </Select>
      )
    }

    return (
      <TextField
        type={type}
        {...rest}
        onChange={changeValue}
        value={value}
      />
    )
  }

  // showRequired() is true when the value is empty and the required prop is passed to the input.
  // showError() is true when the value typed is invalid
  const sanitizedName = rest.name.replace(/[^a-z0-9_-]/gim, '')
  const classes = classNames(
    { required: showRequired, error: showError },
    'input-group',
    `${sanitizedName}-field`,
    rest.className
  )

  if (type === 'checkbox') {
    return (
      <InputContainer
        className={classes}
        style={style}>
        <InputCheckbox
          {...rest}
          setValue={setValue}
          value={value}
          label={label}
        />
        {renderInfo()}
      </InputContainer>
    )
  }

  return (
    <InputContainer
      className={classes}
      style={style}
      type={type}>
      {renderLabel()}
      {renderInput()}
      {showError && <span className="error-message">{errorMessage}</span>}
      {renderInfo()}
    </InputContainer>
  )
}

Input.propTypes = {
  type: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
  name: PropTypes.string,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  options: PropTypes.array,
  priorityOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  ...propTypes,
}

Input.defaultProps = {
  name: '',
  options: [],
  priorityOptions: [],
  style: {},
}

export default withFormsy(Input)
