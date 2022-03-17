import styled from 'styled-components'
import PropTypes from 'prop-types'

import { media } from './styled/Grid'

import ButtonPreview from './ButtonPreview'
import ButtonShare from './ButtonShare'
import DropdownDownload from './DropdownDownload'
import NavBar from './NavBar'
import NavBarDefaultItems from './NavBarDefaultItems'
import NavBarHome from './NavBarHome'
import NavBarMenu from './NavBarMenu'
import NavBarSection from './NavBarSection'
import NavBarSeparator from './NavBarSeparator'

const NavBarButtons = styled(NavBarSection)`
  display: none;

  ${media.lg`
    display: flex;
  `}
`

const Download = styled(DropdownDownload)`
  margin-left: 8px;
`

const DefaultSection = styled(NavBarSection)`
  display: none;

  ${media.sm`
    display: flex;
  `}
`

const PreviewSection = styled(NavBarSection)`
  flex: 1;
  justify-content: flex-end;

  ${media.sm`
    flex: 0 1 auto;
  `}
`

const EditorNavBar = ({ cv }) => {
  if (!cv) {
    return null
  }

  return (
    <NavBar>
      <NavBarHome />

      <DefaultSection grow>
        <NavBarDefaultItems />
      </DefaultSection>

      <PreviewSection>
        <ButtonPreview cv={cv} />
      </PreviewSection>

      <NavBarButtons>
        <NavBarSeparator separated />

        <ButtonShare cv={cv} />

        <Download cv={cv} />
      </NavBarButtons>

      <NavBarMenu />
    </NavBar>
  )
}

EditorNavBar.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default EditorNavBar
