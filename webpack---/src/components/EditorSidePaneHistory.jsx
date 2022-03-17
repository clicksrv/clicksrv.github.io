import PropTypes from 'prop-types'

import useSidebar from '../hooks/useSidebar'

import EditorSidePane from './EditorSidePane'
import History from './History'

const EditorSidePaneHistory = ({ cv }) => {
  const { sidebarItem } = useSidebar()

  const item = 'history'
  const active = sidebarItem === item

  return (
    <EditorSidePane
      active={active}
      cv={cv}
      item={item}>
      <History
        active={active}
        cv={cv}
      />
    </EditorSidePane>
  )
}

EditorSidePaneHistory.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorSidePaneHistory
