import PropTypes from 'prop-types'

import api from '../services/api'
import conf from '../conf'
import { t } from '../locales'

import Hyperlink from './styled/Hyperlink'

const ButtonResetStyling = ({ cv }) => {
  const { id, theme } = cv
  const defaultStyles = conf.themes[theme].styles

  const resetStyling = () => {
    const updatedCv = {
      id,
      style: defaultStyles,
    }

    api.updateCv(updatedCv)
  }

  return (
    <Hyperlink
      small
      compact
      hollow
      onClick={resetStyling}>
      {t('reset_styling')}
    </Hyperlink>
  )
}

ButtonResetStyling.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default ButtonResetStyling
