import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propTypes, withFormsy } from 'formsy-react'

import { greyBluish, primary } from '../colors'

const Container = styled.label`
  cursor: pointer;
  font-size: inherit !important;

  display: flex;
  align-items: center;

  position: relative;
  height: 24px;
  min-width: 48px;
`

const InputElement = styled.input`
  opacity: 0;
  z-index: -1;

  position: absolute;
  width: 0;
`

const Toggle = styled.em`
  background-color: ${({ checked }) => (checked ? primary : greyBluish)};
  border-radius: 16px;
  transition: background-color 0.2s;

  position: absolute;
  top: 0;
  left: 0;

  height: 24px;
  padding: 2px;
  width: 48px;
`

const Dot = styled.i`
  background: white;
  border-radius: 50%;
  transform: translateX(${({ checked }) => (checked ? 24 : 0)}px);
  transition: transform 0.2s;

  display: inline-block;
  height: 20px;
  width: 20px;
`

const Label = styled.span`
  display: inline-block;
  padding-left: 60px;
`

export const InputCheckbox = ({ className, id, label, onChange, setValue, value, ...props }) => {
  const toggleCheckbox = () => {
    setValue(!value)

    if (typeof onChange === 'function') {
      onChange(!value)
    }
  }

  return (
    <Container className={className}>
      <InputElement
        id={id}
        onChange={toggleCheckbox}
        type="checkbox"
        {...props}
      />

      <Toggle checked={value}>
        <Dot
          checked={value}
          role="img"
        />
      </Toggle>

      {label && <Label>{label}</Label>}
    </Container>
  )
}

InputCheckbox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  onChange: PropTypes.func,
  ...propTypes,
}

export default withFormsy(InputCheckbox)
