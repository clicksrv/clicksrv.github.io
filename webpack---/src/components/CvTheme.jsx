import PropTypes from 'prop-types'

import CvStyles from './CvStyles'

const CvTheme = ({ children, className, cv, inEditor }) => {
  return (
    <>
      <CvStyles
        cv={cv}
        inEditor={inEditor}
      />

      <div className={className}>{children}</div>
    </>
  )
}

CvTheme.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cv: PropTypes.object.isRequired,
  inEditor: PropTypes.bool,
}

export default CvTheme
