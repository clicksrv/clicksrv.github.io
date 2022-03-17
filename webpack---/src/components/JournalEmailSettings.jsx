import { useEffect } from 'react'

import useJournalOnboarding from '../hooks/useJournalOnboarding'
import { t } from '../locales'

import ButtonJournalGoBack from './ButtonJournalGoBack'
import ContainerJournal from './ContainerJournal'
import JournalEmailSettingsForm from './JournalEmailSettingsForm'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'

const JournalEmailSettings = () => {
  const { onboarding, setOnboardingStep } = useJournalOnboarding()

  useEffect(() => {
    setOnboardingStep('email_settings')
  }, [])

  return (
    <ContainerJournal>
      {!onboarding && <ButtonJournalGoBack />}

      <PageTitle>{t('how_often_journal_reminders')}</PageTitle>
      <PageParagraph as="h2">{t('friendly_email_reminder')}</PageParagraph>

      <JournalEmailSettingsForm />
    </ContainerJournal>
  )
}

export default JournalEmailSettings
