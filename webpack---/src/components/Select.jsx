import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propTypes, withFormsy } from 'formsy-react'

import { primaryLight, primaryLightest, redError } from '../colors'

const Container = styled.div`
  position: relative;

  :after {
    font-family: FontAwesome;
    speak: none;
    font-size: 24px;
    content: '\f107';
    position: absolute;
    right: 11px;
    top: 13px;
    color: #333;
    pointer-events: none;
    line-height: 100%;
  }
`

const Element = styled.select`
  appearance: none;
  background-color: ${primaryLightest};
  border-radius: 8px;
  border: 1px solid ${primaryLight};
  color: #333;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4em;

  display: block;
  height: 49px;
  padding: 0 35px 0 15px;
  width: 100%;
`

const Option = styled.option``

const Error = styled.span`
  color: ${redError};
  font-size: 14px;
  vertical-align: -8px;
`

const Select = ({ className, errorMessage, onChange, options, setValue, showError, ...props }) => {
  const onSelectChange = (event) => {
    const newValue = event.currentTarget.value

    setValue(newValue)

    if (typeof onChange === 'function') {
      onChange(newValue)
    }
  }

  const elementProps = {
    ...props,
    onChange: onSelectChange,
  }

  return (
    <Container className={className}>
      <Element {...elementProps}>
        {options.map(({ label, value }) => (
          <Option
            key={value}
            value={value}>
            {label || value}
          </Option>
        ))}
      </Element>

      {showError && <Error>{errorMessage}</Error>}
    </Container>
  )
}

Select.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  ...propTypes,
}

export default withFormsy(Select)
