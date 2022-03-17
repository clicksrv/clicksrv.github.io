import { useRouteMatch } from 'react-router-dom'

import { t } from '../locales'

import NavBarLink from './NavBarLink'

const NavBarDefaultItems = () => {
  const resumesActive = !!useRouteMatch({ path: '/resumes' })
  const websitesActive = !!useRouteMatch({ path: '/websites' })
  const coverLettersActive = !!useRouteMatch({ path: '/cover-letters' })
  const journalActive = !!useRouteMatch({ path: '/journal' })

  return (
    <>
      <NavBarLink
        active={resumesActive}
        icon="document-alt"
        title={t('resumes')}
        to="/resumes"
      />

      <NavBarLink
        active={websitesActive}
        icon="browser-alt"
        title={t('websites')}
        to="/websites"
      />

      <NavBarLink
        active={coverLettersActive}
        icon="cover-letter"
        title={t('cover_letters')}
        to="/cover-letters"
      />

      <NavBarLink
        active={journalActive}
        icon="journal"
        title={t('career_journal')}
        to="/journal"
      />
    </>
  )
}

export default NavBarDefaultItems
