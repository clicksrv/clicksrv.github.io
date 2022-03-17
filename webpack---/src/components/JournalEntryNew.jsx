import { useEffect, useState } from 'react'

import history from '../services/history'
import notify from '../services/notify'
import useJournalEntries from '../hooks/useJournalEntries'
import useJournalOnboarding from '../hooks/useJournalOnboarding'
import { t } from '../locales'

import ButtonJournalGoBack from './ButtonJournalGoBack'
import ContainerJournal from './ContainerJournal'
import JournalEntryForm from './JournalEntryForm'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'

const JournalEntryNew = () => {
  const [submitting, setSubmitting] = useState(false)

  const { createJournalEntry } = useJournalEntries()
  const { finishOnboarding, onboarding, setOnboardingStep } = useJournalOnboarding()

  useEffect(() => {
    setOnboardingStep('new_entry')
  }, [])

  const onError = () => {
    setSubmitting(false)

    notify.error(t('journal_entry_creation_error'))
  }

  const onJournalEntryCreated = () => {
    if (onboarding) {
      finishOnboarding()
    } else {
      notify.success(t('journal_entry_created'))

      history.push('/journal')
    }
  }

  const onSubmit = (data) => {
    setSubmitting(true)

    createJournalEntry(data).then(onJournalEntryCreated).catch(onError)
  }

  return (
    <ContainerJournal>
      {!onboarding && <ButtonJournalGoBack />}

      <PageTitle>{t('create_new_journal_entry')}</PageTitle>
      <PageParagraph as="h2">{t('journal_entry_details')}</PageParagraph>

      <JournalEntryForm
        onSubmit={onSubmit}
        submitting={submitting}
      />
    </ContainerJournal>
  )
}

export default JournalEntryNew
