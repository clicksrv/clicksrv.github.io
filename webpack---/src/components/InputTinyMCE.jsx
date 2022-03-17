import PropTypes from 'prop-types'
import { propTypes, withFormsy } from 'formsy-react'

import TinyMCE from './TinyMCE'

const InputTinyMCE = ({ isValid, isPristine, placeholder, setValue, value }) => {
  return (
    <TinyMCE
      isValid={isValid}
      isPristine={isPristine}
      modern={true}
      editing={true}
      placeholder={placeholder}
      setValue={setValue}
      value={value}
    />
  )
}

InputTinyMCE.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  ...propTypes,
}

export default withFormsy(InputTinyMCE)
