import styled from 'styled-components'

import useSidebar from '../hooks/useSidebar'
import { media } from './styled/Grid'
import { shadowBigPrimary } from '../styles'

const Container = styled.div`
  cursor: pointer;
  z-index: 5;

  display: block;

  position: fixed;
  right: 16px;
  bottom: 16px;

  ${media.md`
    transform: translateX(0);

    display: none;
  `}
`

const Dot = styled.span`
  ${shadowBigPrimary};

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 64px;
  width: 64px;
`

const Icon = styled.i`
  color: white;
  font-size: 20px;
  transition: opacity 0.4s;

  position: absolute;

  display: block;
`

const IconOpen = styled(Icon)`
  opacity: ${({ sidebarOpen }) => (sidebarOpen ? 0 : 1)};
`

const IconClose = styled(Icon)`
  opacity: ${({ sidebarOpen }) => (sidebarOpen ? 1 : 0)};
`

const EditorSidebarExpandCollapseMobile = () => {
  const { sidebarOpen, toggleSidebar } = useSidebar()

  return (
    <Container onClick={toggleSidebar}>
      <Dot>
        <IconOpen
          className="icon-multiline"
          sidebarOpen={sidebarOpen}
        />

        <IconClose
          className="icon-close"
          sidebarOpen={sidebarOpen}
        />
      </Dot>
    </Container>
  )
}

export default EditorSidebarExpandCollapseMobile
