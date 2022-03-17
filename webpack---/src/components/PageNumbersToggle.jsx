import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import api from '../services/api'
import conf from '../conf'
import { media } from './styled/Grid'
import { t } from '../locales'

import InputCheckbox from './InputCheckbox'

const Toggle = styled(InputCheckbox)`
  font-size: 16px !important;
  white-space: pre;

  margin-right: 15px;

  ${media.sm`
    font-size: 14px !important;
  `}
`

const PageNumbersToggle = ({ cv }) => {
  const key = '@include-footer'
  const { id, theme, style } = cv
  const defaultStyles = conf.themes[theme].styles
  const supported = Object.keys(defaultStyles).includes(key)
  const pageNumbers = style[key]

  if (!supported) {
    return null
  }

  const togglePageNumbers = (form) => {
    const updatedCv = {
      id,
      style: {
        ...style,
        [key]: form.page_numbers,
      },
    }

    api.updateCv(updatedCv)
  }

  return (
    <Formsy onChange={togglePageNumbers}>
      <Toggle
        name="page_numbers"
        label={t('page_numbers')}
        value={pageNumbers}
      />
    </Formsy>
  )
}

PageNumbersToggle.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default PageNumbersToggle
