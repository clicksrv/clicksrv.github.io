import PropTypes from 'prop-types'

import { t } from '../locales'

const BillingInputLastName = ({ value, setValue, invalid, setInvalid }) => {
  const className = invalid ? 'has-error' : null

  const handleChange = (e) => {
    setValue(e.target.value)

    // we turn off the invalid state on user input
    setInvalid(false)
  }

  return (
    <input
      required
      type="text"
      name="last_name"
      autoComplete="family-name"
      placeholder={t('last_name')}
      data-recurly="last_name"
      className={className}
      value={value}
      onChange={handleChange}
    />
  )
}

BillingInputLastName.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  setInvalid: PropTypes.func.isRequired,
}

export default BillingInputLastName
