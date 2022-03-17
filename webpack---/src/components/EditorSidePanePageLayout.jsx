import PropTypes from 'prop-types'
import styled from 'styled-components'

import useSidebar from '../hooks/useSidebar'
import { media } from './styled/Grid'

import EditorSidePane from './EditorSidePane'
import PageLayout from './PageLayout'

const SidePane = styled(EditorSidePane)`
  ${media.md`
    display: none;
  `}
`

const EditorSidePanePageLayout = ({ cv }) => {
  const { sidebarItem } = useSidebar()

  const item = 'layout'
  const active = sidebarItem === item

  return (
    <SidePane
      active={active}
      cv={cv}
      item={item}>
      <PageLayout
        active={active}
        cv={cv}
      />
    </SidePane>
  )
}

EditorSidePanePageLayout.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorSidePanePageLayout
