import { t } from '../locales'

import NavBar from './NavBar'
import NavBarHome from './NavBarHome'
import NavBarLink from './NavBarLink'
import NavBarMenu from './NavBarMenu'
import NavBarSection from './NavBarSection'

const CompanyNavBar = () => {
  return (
    <NavBar>
      <NavBarSection grow>
        <NavBarHome />

        <NavBarLink
          active
          icon="flowchart"
          title={t('admin_dashboard')}
          to="/company"
        />
      </NavBarSection>

      <NavBarSection>
        <NavBarMenu />
      </NavBarSection>
    </NavBar>
  )
}

export default CompanyNavBar
