import PropTypes from 'prop-types'

import useSidebar from '../hooks/useSidebar'

import CvContentImport from './CvContentImport'
import EditorSidePane from './EditorSidePane'

const EditorSidePaneImport = ({ cv }) => {
  const { sidebarItem } = useSidebar()

  const item = 'import'
  const active = sidebarItem === item

  return (
    <EditorSidePane
      active={active}
      cv={cv}
      item={item}>
      <CvContentImport cv={cv} />
    </EditorSidePane>
  )
}

EditorSidePaneImport.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorSidePaneImport
