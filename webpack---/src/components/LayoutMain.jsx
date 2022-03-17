import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Content from './styled/Content'
import DashboardNavBar from './DashboardNavBar'

const LayoutMain = ({ children }) => {
  // adding `locale` dependency so that the component updates the translations
  // when user chooses another language
  useSelector((state) => state.application.locale)

  return (
    <>
      <DashboardNavBar />

      <Content>{children}</Content>
    </>
  )
}

LayoutMain.propTypes = {
  children: PropTypes.node,
}

export default LayoutMain
