import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import conf from '../conf'
import events from '../services/events'
import useDropdown from '../hooks/useDropdown'
import useEditor from '../hooks/useEditor'
import { media } from './styled/Grid'
import { openUrl } from '../helpers/cordova'
import { primary } from '../colors'
import { t } from '../locales'

import NavBarSeparator from './NavBarSeparator'
import ProfileImage from './ProfileImage'

import {
  Dropdown,
  DropdownContent,
  DropdownIcon,
  DropdownMenu,
  DropdownMenuHyperlink,
  DropdownMenuIcon,
  DropdownMenuLink,
} from './Dropdown'

const Container = styled(Dropdown)`
  display: flex;
  align-items: center;
`

const Separator = styled(NavBarSeparator)`
  display: ${({ cta, inEditor }) => (cta || inEditor ? 'inline-block' : 'none')};

  ${media.md`
    display: inline-block;
  `}
`

const Trigger = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  padding: 10px 5px 10px 0;
`

const Avatar = styled(ProfileImage)`
  margin-right: 3px;
  height: 32px;
  width: 32px;
`

const Chevron = styled(DropdownIcon)`
  color: ${primary};
`

// separate whitespace element so that DropdownContent aligns with down chevron
const Whitespace = styled.span`
  display: inline-block;
  width: 15px;
`

const NavBarMenu = ({ className }) => {
  const { closeDropdown, dropdownOpen, toggleDropdown } = useDropdown()
  const user = useSelector((state) => state.session.user)
  const { inEditor } = useEditor()

  const logout = () => events.emit('SESSION::LOGOUT')

  const freeTier = user?.free_tier
  const cta = !process.env.CORDOVA && freeTier // Upgrade button is shown (Dashboard)
  const showAdmin = !process.env.CORDOVA && user && user.visualcv_admin
  const showServicesAdmin = !process.env.CORDOVA && user && (user.visualcv_staff || user.visualcv_admin)
  const showCompanyManagement = user && user.cv_manager

  const adminUrl = `${conf.host}/admin`
  const servicesAdminUrl = `${conf.host}/services_admin`
  const resourcesUrl = `${conf.host}/resources/`

  return (
    <>
      <Separator
        cta={cta}
        inEditor={inEditor}
        separated
      />

      <Container className={className}>
        <Trigger onClick={toggleDropdown}>
          <Avatar src={user?.thumb} />

          <Chevron
            className="icon-chevron"
            dropdownOpen={dropdownOpen}
          />
        </Trigger>

        <DropdownContent
          closeDropdown={closeDropdown}
          dropdownOpen={dropdownOpen}>
          <DropdownMenu>
            <DropdownMenuLink to="/account">
              <DropdownMenuIcon className="icon-gear-alt" />

              {t('account_settings')}
            </DropdownMenuLink>

            {showAdmin && (
              <DropdownMenuHyperlink
                href={adminUrl}
                onClick={openUrl(adminUrl)}>
                <DropdownMenuIcon className="icon-tools" />
                Admin Panel
              </DropdownMenuHyperlink>
            )}

            {showServicesAdmin && (
              <DropdownMenuHyperlink
                href={servicesAdminUrl}
                onClick={openUrl(servicesAdminUrl)}>
                <DropdownMenuIcon className="icon-tool" />
                Services Admin
              </DropdownMenuHyperlink>
            )}

            {showCompanyManagement && (
              <DropdownMenuLink to="/company">
                <DropdownMenuIcon className="icon-flowchart" />

                {t('company_admin')}
              </DropdownMenuLink>
            )}

            <DropdownMenuHyperlink
              href={resourcesUrl}
              onClick={openUrl(resourcesUrl)}
              rel="noopener noreferrer"
              target="_blank">
              <DropdownMenuIcon className="icon-lightbulb" />

              {t('knowledge_center')}
            </DropdownMenuHyperlink>

            <DropdownMenuLink to="/stats">
              <DropdownMenuIcon className="icon-pie-chart-alt" />

              {t('stats')}
            </DropdownMenuLink>

            <DropdownMenuLink
              onClick={logout}
              to="/login">
              <DropdownMenuIcon
                className="icon-logout"
                indented
              />

              {t('logout')}
            </DropdownMenuLink>
          </DropdownMenu>
        </DropdownContent>
      </Container>

      <Whitespace />
    </>
  )
}

NavBarMenu.propTypes = {
  className: PropTypes.string,
}

export default NavBarMenu
