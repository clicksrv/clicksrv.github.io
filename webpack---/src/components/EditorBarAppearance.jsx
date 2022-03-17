import PropTypes from 'prop-types'

import useSidebar from '../hooks/useSidebar'

import Appearance from './Appearance'
import EditorBar from './EditorBar'

const EditorBarAppearance = ({ cv }) => {
  const { sidebarItem } = useSidebar()
  const active = sidebarItem === 'appearance'

  return (
    <EditorBar active={active}>
      <Appearance cv={cv} />
    </EditorBar>
  )
}

EditorBarAppearance.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorBarAppearance
