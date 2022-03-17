import PropTypes from 'prop-types'

import useSidebar from '../hooks/useSidebar'

import EditorBar from './EditorBar'
import PageLayout from './PageLayout'

const EditorBarPageLayout = ({ cv }) => {
  const { sidebarItem } = useSidebar()
  const active = sidebarItem === 'layout'

  return (
    <EditorBar active={active}>
      <PageLayout
        active={active}
        cv={cv}
      />
    </EditorBar>
  )
}

EditorBarPageLayout.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorBarPageLayout
