import PropTypes from 'prop-types'
import styled from 'styled-components'

import useSidebar from '../hooks/useSidebar'
import { media } from './styled/Grid'

import AppearanceMobile from './AppearanceMobile'
import EditorSidePane from './EditorSidePane'

const SidePane = styled(EditorSidePane)`
  ${media.md`
    display: none;
  `}
`

const EditorSidePaneAppearance = ({ cv }) => {
  const { sidebarItem } = useSidebar()

  const item = 'appearance'
  const active = sidebarItem === item

  return (
    <SidePane
      active={active}
      cv={cv}
      item={item}>
      <AppearanceMobile cv={cv} />
    </SidePane>
  )
}

EditorSidePaneAppearance.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorSidePaneAppearance
