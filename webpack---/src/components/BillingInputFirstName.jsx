import PropTypes from 'prop-types'

import { t } from '../locales'

const BillingInputFirstName = ({ invalid, setInvalid, value, setValue }) => {
  const className = invalid ? 'has-error' : null

  const handleChange = (e) => {
    setValue(e.target.value)

    // we turn off the invalid state on user input
    setInvalid(false)
  }

  return (
    <input
      autoComplete="given-name"
      className={className}
      data-recurly="first_name"
      name="first_name"
      onChange={handleChange}
      placeholder={t('first_name')}
      required
      type="text"
      value={value}
    />
  )
}

BillingInputFirstName.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  setInvalid: PropTypes.func.isRequired,
}

export default BillingInputFirstName
