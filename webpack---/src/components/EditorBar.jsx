import PropTypes from 'prop-types'
import styled from 'styled-components'

import useSidebar from '../hooks/useSidebar'
import { greyLightest } from '../colors'
import { media } from './styled/Grid'

const Container = styled.aside`
  background: white;
  border-bottom: 1px solid ${greyLightest};
  font-size: 15px;
  font-weight: 300;
  text-align: left;
  transition: margin-left 0.4s, top 0.3s;
  z-index: ${({ active }) => (active ? 3 : 0)};

  // allows bar to expand in height on small screens
  flex: 1 0 auto;

  display: none;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: ${({ active }) => (active ? 'var(--nav-bar-height)' : '-1px')};
  left: 0;
  right: 0;

  height: 60px;
  padding: 0 ${({ sidebarOpen }) => (sidebarOpen ? 15 : 20)}px;

  ${media.md`
    transform: translateX(0);

    display: flex;

    margin-left: var(--editor-sidebar-${({ sidebarState }) => sidebarState}-width);
  `}
`

const EditorBar = ({ active, children, className }) => {
  const { sidebarOpen, sidebarState } = useSidebar()

  return (
    <Container
      active={active}
      className={className}
      sidebarOpen={sidebarOpen}
      sidebarState={sidebarState}>
      {children}
    </Container>
  )
}

EditorBar.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default EditorBar
