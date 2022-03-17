import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import conf from '../conf'
import { media } from './styled/Grid'
import { mint, primary } from '../colors'
import { t } from '../locales'

import vcvLogoFull from '../assets/images/logos/vcv_logo_blue_full.svg'

import NavBar from './NavBar'

const Container = styled(NavBar)`
  border-bottom: unset;
  background-color: ${({ imageLayout }) => (imageLayout ? mint : '#FEEFE5')};
`

const Icon = styled.i`
  color: ${primary};
  font-size: 30px;

  margin-left: 16px;
  margin-right: 8px;

  ${media.sm`
    display: none;
  `}
`

const VcvLogo = styled.img`
  display: none;
  height: 24px;
  margin-left: 22px;
  width: 133px;

  ${media.sm`
    display: block;
  `}
`

const LoginCopy = styled.span`
  font-size: 14px;
  line-height: 20px;

  height: max-content;
  margin-right: 16px;

  ${media.sm`
    margin-right: 30px;
  `}
`

const StyledLink = styled(Link)`
  margin-left: 5px;
`

const AuthenticationNavBar = ({ imageLayout }) => {
  const href = conf.host

  return (
    <Container imageLayout={imageLayout}>
      <a href={href}>
        <Icon
          alt="VisualCV"
          className="icon-vcv"
        />

        <VcvLogo
          src={vcvLogoFull}
          alt="VisualCV"
        />
      </a>

      <LoginCopy>
        {imageLayout ? t('dont_have_an_account') : t('already_have_an_account')}

        {imageLayout ? (
          <StyledLink to="/signup">{t('signup')}</StyledLink>
        ) : (
          <StyledLink to="/login">{t('login')}</StyledLink>
        )}
      </LoginCopy>
    </Container>
  )
}

AuthenticationNavBar.propTypes = {
  imageLayout: PropTypes.bool,
}

export default AuthenticationNavBar
