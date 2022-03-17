import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useWindowSize from '../hooks/useWindowSize'
import { breakpoints } from './styled/Grid'
import { buttonRegular } from '../styles/buttons'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import NavBar from './NavBar'
import NavBarDefaultItems from './NavBarDefaultItems'
import NavBarHome from './NavBarHome'
import NavBarMenu from './NavBarMenu'
import NavBarSection from './NavBarSection'

const UpgradeButton = styled(Link)`
  ${buttonRegular}
`

const DashboardNavBar = () => {
  const user = useSelector((state) => state.session.user)
  const { viewportWidth } = useWindowSize()

  const freeTier = user?.free_tier

  const trackUpgradeClick = () => trackEvent('clicked-upgrade', 'click', 0, { section: 'header' })
  const showUpgradeButton = !process.env.CORDOVA && freeTier && viewportWidth >= breakpoints.md

  return (
    <NavBar>
      <NavBarHome />

      <NavBarSection grow>
        <NavBarDefaultItems />
      </NavBarSection>

      <NavBarSection>
        {showUpgradeButton && (
          <UpgradeButton
            $cta
            onClick={trackUpgradeClick}
            to="/checkout">
            {t('upgrade_now')}
          </UpgradeButton>
        )}

        <NavBarMenu />
      </NavBarSection>
    </NavBar>
  )
}

export default DashboardNavBar
