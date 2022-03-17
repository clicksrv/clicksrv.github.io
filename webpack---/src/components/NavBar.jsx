import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { greyLightest } from '../colors'
import { media } from './styled/Grid'

const transparentStyles = css`
  ${media.md`
    background: transparent;
    border-bottom: unset;
    position: absolute;
  `}
`

const Container = styled.nav`
  background-color: #fff;
  border-bottom: 1px solid ${greyLightest};
  font-size: 15px;
  font-weight: 300;
  z-index: 7; // UpgradeBarFloating/EditorBar hide underneath; must be higher than EditorSidePane on mobile

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: var(--nav-bar-height);

  ${({ transparent }) => (transparent ? transparentStyles : '')}
`

const NavBar = ({ children, className, transparent }) => {
  return (
    <Container
      className={className}
      transparent={transparent}>
      {children}
    </Container>
  )
}

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  transparent: PropTypes.bool,
}

export default NavBar
