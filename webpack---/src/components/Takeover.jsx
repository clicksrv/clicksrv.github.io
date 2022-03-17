import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import useOnboarding from '../hooks/useOnboarding'

import ButtonGoBack from './ButtonGoBack'
import ButtonOnboardingSkip from './ButtonOnboardingSkip'
import NavBar from './NavBar'
import NavBarHome from './NavBarHome'

const Container = styled.main`
  background: white;
  color: #aaa;
  position: relative;
  text-align: center;
  -webkit-touch-callout: none;

  flex: 1;

  display: flex;
  flex-direction: column;

  margin-top: ${({ transparent }) => (transparent ? 0 : 'var(--nav-bar-height)')};
`

const Takeover = ({ children }) => {
  const { pathname } = useLocation()
  const { onboarding } = useOnboarding()

  const checkout = pathname.startsWith('/checkout')

  return (
    <>
      <NavBar transparent={checkout}>
        <NavBarHome
          black={!checkout}
          fixed
          full={checkout}
        />

        {onboarding ? <ButtonOnboardingSkip /> : <ButtonGoBack />}
      </NavBar>

      <Container
        className="scrollable-container"
        transparent={checkout}>
        {children}
      </Container>
    </>
  )
}

Takeover.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Takeover
