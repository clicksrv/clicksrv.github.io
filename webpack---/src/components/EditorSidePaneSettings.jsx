import PropTypes from 'prop-types'

import useSidebar from '../hooks/useSidebar'

import EditorSidePane from './EditorSidePane'
import Settings from './Settings'

const EditorSidePaneSettings = ({ cv }) => {
  const { sidebarItem } = useSidebar()

  const item = 'settings'
  const active = sidebarItem === item

  return (
    <EditorSidePane
      active={active}
      cv={cv}
      item={item}>
      <Settings cv={cv} />
    </EditorSidePane>
  )
}

EditorSidePaneSettings.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorSidePaneSettings
