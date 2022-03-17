import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { media } from './styled/Grid'
import { t } from '../locales'

import DashboardExpert from './DashboardExpert'
import DashboardItems from './DashboardItems'
import DashboardOnboardingBar from './DashboardOnboardingBar'
import DashboardResources from './DashboardResources'
import DashboardResumes from './DashboardResumes'
import PageHeader from './PageHeader'

const Container = styled.div`
  background: white;

  margin: -10px;
  min-height: calc(100vh - var(--nav-bar-height));
  padding: 15px;

  // bigger bottom padding is for the HelpScout beacon
  ${media.sm`
    margin: -20px;
    padding: 20px 20px 80px;
  `}

  ${media.lg`
    padding: 30px 30px 80px;
  `}

  ${media.xl`
    padding: 40px 40px 80px;
  `}

  ${media.xxl`
    padding: 60px;
  `}
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 1350px;
`

const Onboarding = styled(DashboardOnboardingBar)`
  margin-bottom: var(--dashboard-spacing);
`

const ResumesWebsitesJournal = styled.section`
  display: grid;
  gap: var(--dashboard-spacing);
  grid-template-columns: 1fr;
  justify-items: center;

  ${media.lg`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  `}
`

const Resumes = styled(DashboardResumes)`
  ${media.lg`
    grid-column: 1;
    grid-row: 1 / span-2;
  `}
`

const Websites = styled(DashboardItems)`
  ${media.lg`
    grid-column: 2;
    grid-row: 1;
  `}
`

const CoverLetters = styled(DashboardItems)`
  order: 0;

  ${media.lg`
    order: 1;
  `}
`

const ExpertCoverLetters = styled(ResumesWebsitesJournal)`
  margin-top: var(--dashboard-spacing);
`

const JournalEntries = styled(DashboardItems)`
  ${media.lg`
    grid-column: 2;
    grid-row: 2;
  `}
`

const Expert = styled(DashboardExpert)`
  order: 1;

  ${media.lg`
    order: 0;
  `}
`

const Resources = styled(DashboardResources)`
  margin-top: var(--dashboard-spacing);
`

const Dashboard = () => {
  const user = useSelector((state) => state.session.user)

  const { first_name: firstName } = user

  return (
    <Container>
      <Content>
        <PageHeader
          subtitle={t('landing_dream_job')}
          title={t('welcome_to_vcv', { name: firstName })}
        />

        <Onboarding />

        <ResumesWebsitesJournal>
          <Resumes />

          <Websites type="website" />

          <JournalEntries type="journal_entry" />
        </ResumesWebsitesJournal>

        <ExpertCoverLetters>
          <Expert />

          <CoverLetters type="cover_letter" />
        </ExpertCoverLetters>

        <Resources />
      </Content>
    </Container>
  )
}

export default Dashboard
