import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import events from '../services/events'
import useSidebar from '../hooks/useSidebar'
import { isFreeTheme } from '../helpers/theme'
import { trackEvent } from '../helpers/analytics'

import CvTemplates from './CvTemplates'
import EditorSidePane from './EditorSidePane'

const SidePane = styled(EditorSidePane)`
  border-right: none;
`

const EditorSidePaneTemplates = ({ cv }) => {
  const { handleSidebarItemSelected, sidebarItem, sidebarState } = useSidebar()
  const user = useSelector((state) => state.session.user)

  const item = 'templates'
  const active = sidebarItem === item

  const changeTheme = (theme) => {
    trackEvent('changed-theme', 'interaction', 0, { theme, free: isFreeTheme(theme, user) })

    handleSidebarItemSelected(cv)

    events.emit('CV::UPDATE_THEME', theme)
  }

  return (
    <SidePane
      active={active}
      cv={cv}
      item={item}
      sidebarState={sidebarState}>
      <CvTemplates
        cv={cv}
        onClick={changeTheme}
      />
    </SidePane>
  )
}

EditorSidePaneTemplates.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorSidePaneTemplates
