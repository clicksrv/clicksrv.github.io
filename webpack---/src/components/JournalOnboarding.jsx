import styled from 'styled-components'
import { useEffect } from 'react'

import useJournalOnboarding from '../hooks/useJournalOnboarding'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import JournalEntryGhost from '../assets/images/journal-entry-ghost.svg'

import Button from './styled/Button'
import ContainerJournal from './ContainerJournal'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'

const Container = styled(ContainerJournal)`
  text-align: center;

  padding-bottom: 50px;
`

const Image = styled.img`
  display: block;
  height: auto;
  margin: 60px auto 30px;
  max-width: 100%;
`

const Icon = styled.i``

const JournalOnboarding = () => {
  const { nextOnboardingStepPath, setOnboardingStep } = useJournalOnboarding()

  useEffect(() => {
    setOnboardingStep('welcome')
  }, [])

  const trackOnboarding = () => trackEvent('started-journal-onboarding', 'interaction')

  return (
    <Container>
      <PageTitle>{t('we_all_have_workstory')}</PageTitle>
      <PageParagraph as="h2">{t('tracking_work_achievements')}</PageParagraph>

      <Image
        src={JournalEntryGhost}
        height={254}
        width={720}
      />

      <Button
        big
        onClick={trackOnboarding}
        to={nextOnboardingStepPath}>
        <Icon className="icon-plus" />

        {t('create_career_journal')}
      </Button>
    </Container>
  )
}

export default JournalOnboarding
