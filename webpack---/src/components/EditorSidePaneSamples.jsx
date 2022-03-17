import PropTypes from 'prop-types'

import useSidebar from '../hooks/useSidebar'

import CvContentFromSample from './CvContentFromSample'
import EditorSidePane from './EditorSidePane'

const EditorSidePaneSamples = ({ cv }) => {
  const { sidebarItem } = useSidebar()

  const item = 'samples'
  const active = sidebarItem === item

  return (
    <EditorSidePane
      active={active}
      cv={cv}
      item={item}>
      <CvContentFromSample
        active={active}
        cv={cv}
      />
    </EditorSidePane>
  )
}

EditorSidePaneSamples.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorSidePaneSamples
