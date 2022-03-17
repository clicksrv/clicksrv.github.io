import PropTypes from 'prop-types'

import capitalize from '../helpers/capitalize'
import { styleProps } from '../helpers/cv'

// eslint-disable-next-line import/no-unresolved
import * as styles from '../themes/styles'
import SharedStyles from '../themes/styles/shared/SharedStyles'

const CvStyles = ({ cv, inEditor }) => {
  const { theme } = cv

  const ThemeStyles = styles[capitalize(theme)]

  return (
    <>
      <SharedStyles
        {...styleProps(cv)}
        inEditor={inEditor}
      />

      <ThemeStyles
        {...styleProps(cv)}
        inEditor={inEditor}
      />
    </>
  )
}

CvStyles.propTypes = {
  cv: PropTypes.object.isRequired,
  inEditor: PropTypes.bool,
}

export default CvStyles
