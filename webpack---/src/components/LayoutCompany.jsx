import PropTypes from 'prop-types'

import Content from './styled/Content'
import CompanyNavBar from './CompanyNavBar'

const LayoutCompany = ({ children }) => {
  return (
    <>
      <CompanyNavBar />

      <Content>{children}</Content>
    </>
  )
}

LayoutCompany.propTypes = {
  children: PropTypes.node,
}

export default LayoutCompany
