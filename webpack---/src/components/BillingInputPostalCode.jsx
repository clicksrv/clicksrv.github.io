import PropTypes from 'prop-types'

import { t } from '../locales'

const BillingInputPostalCode = ({ country, value, setValue, invalid, setInvalid }) => {
  const className = invalid ? 'has-error' : null

  const handleChange = (e) => {
    setValue(e.target.value)

    // we turn off the invalid state on user input
    setInvalid(false)
  }

  const placeholder = country === 'US' ? t('zip_code') : t('postal_code')

  return (
    <input
      required
      type="text"
      name="postal_code"
      autoComplete="postal-code"
      placeholder={placeholder}
      data-recurly="postal_code"
      className={className}
      value={value}
      onChange={handleChange}
    />
  )
}

BillingInputPostalCode.propTypes = {
  country: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  setInvalid: PropTypes.func.isRequired,
}

export default BillingInputPostalCode
