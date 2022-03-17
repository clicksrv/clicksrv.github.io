import PropTypes from 'prop-types'
import styled from 'styled-components'

import { greySubtle, primaryLight } from '../../colors'

import Input from './input'

const Label = styled.label`
  color: #888888;
  font-size: 11px;
  font-weight: 400;
  text-transform: uppercase;

  display: block;
  margin-bottom: 5px;
`

const UrlContainer = styled.div`
  display: flex;

  .url-field {
    flex: 1;
  }

  input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    flex: 1;

    height: 53px;
  }
`

const Prefix = styled.div`
  background-color: ${greySubtle};
  border: 1px solid ${primaryLight};
  border-width: 1px 0 1px 1px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: black;
  font-size: 14px;

  display: flex;
  align-items: center;

  height: 53px;
  margin-bottom: 20px;
  padding: 0 15px;
`
const UrlInput = ({ label, name, setValue, value }) => {
  const onChange = (e) => {
    setValue(e.currentTarget.value)
  }

  const prefix = 'my.visualcv.com/'

  return (
    <>
      <Label htmlFor={name}>{label}</Label>

      <UrlContainer>
        <Prefix>{prefix}</Prefix>

        <Input
          id={name}
          name={name}
          type="text"
          onChange={onChange}
          setValue={setValue}
          value={value}
        />
      </UrlContainer>
    </>
  )
}

UrlInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default UrlInput
