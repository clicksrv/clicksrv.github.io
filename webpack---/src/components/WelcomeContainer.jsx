import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from './styled/Grid'
import { primary } from '../colors'

import NavBar from './NavBar'
import NavBarHome from './NavBarHome'

const Container = styled.div`
  background-color: white;
  overflow-y: auto;
  text-align: center;

  flex-grow: 1;

  height: 100%;
  margin-top: var(--nav-bar-height);
  padding: 30px;
`

const Icon = styled.i`
  color: ${primary};
  font-size: 80px;

  display: block;
  margin: 20px auto 20px;

  ${media.sm`
    font-size: 100px;
  `}
`

const WelcomeContainer = ({ children }) => (
  <>
    <NavBar>
      <NavBarHome
        black
        fixed
      />
    </NavBar>

    <Container>
      <Icon
        alt="VisualCV"
        className="icon-vcv"
      />

      {children}
    </Container>
  </>
)

WelcomeContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default WelcomeContainer
