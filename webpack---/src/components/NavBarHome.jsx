import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import useOnboarding from '../hooks/useOnboarding'
import { media } from './styled/Grid'
import { primary } from '../colors'
import { t } from '../locales'

import vcvLogoFull from '../assets/images/logos/vcv_logo_blue_full.svg'

const Icon = styled.i`
  color: ${({ $color }) => $color};
  transition: opacity 0.3s;

  position: absolute;
`

const IconDashboard = styled(Icon)`
  font-size: 25px;
  opacity: 0;
`

const IconVcv = styled(Icon)`
  font-size: 30px;
  opacity: 1;
`

const IconVcvMobile = styled(IconVcv)`
  ${media.sm`
    display: none;
  `}
`

const VcvLogo = styled.img`
  transition: opacity 0.3s;
  opacity: 1;

  display: none;
  height: 24px;
  margin-left: 22px;
  width: 133px;

  ${media.sm`
    display: block;
  `}
`

const NavBarBrand = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 60px;

  ${media.sm`
    width: ${({ $full }) => ($full ? 'auto' : '60px')};
  `}

  ${media.md`
    width: ${({ $full }) => ($full ? 'auto' : '80px')};
  `}

  &:hover {
    ${IconVcv},
    ${IconVcvMobile},
    ${VcvLogo} {
      opacity: ${({ $fixed }) => ($fixed ? 1 : 0)};
    }

    ${IconDashboard} {
      opacity: ${({ $fixed }) => ($fixed ? 0 : 1)};
    }
  }
`

/**
 * @param {boolean} fixed indicates dashboard 'hover' icon should not show (public page)
 * @param {boolean} full indicates full VisualCV logo should be displayed
 */
const NavBarHome = ({ black, fixed, full }) => {
  const { onboarding, stopOnboarding } = useOnboarding()

  const to = '/cvs'

  const onClick = () => {
    if (onboarding) {
      stopOnboarding()
    }
  }

  const color = black ? 'black' : primary

  return (
    <NavBarBrand
      $fixed={fixed}
      $full={full}
      onClick={onClick}
      to={to}>
      <IconDashboard
        $color={color}
        alt={t('dashboard')}
        className="icon-home"
      />

      {!full && (
        <IconVcv
          $color={color}
          alt="VisualCV"
          className="icon-vcv"
        />
      )}

      {full && (
        <IconVcvMobile
          $color={color}
          alt="VisualCV"
          className="icon-vcv"
        />
      )}

      {full && (
        <VcvLogo
          src={vcvLogoFull}
          alt="VisualCV"
        />
      )}
    </NavBarBrand>
  )
}

NavBarHome.propTypes = {
  black: PropTypes.bool,
  fixed: PropTypes.bool,
  full: PropTypes.bool,
}

export default NavBarHome
