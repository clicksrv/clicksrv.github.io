import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import history from '../services/history'
import notify from '../services/notify'
import useJournalEntries from '../hooks/useJournalEntries'
import { trackEvent } from '../helpers/analytics'
import { t } from '../locales'

import ButtonJournalGoBack from './ButtonJournalGoBack'
import ContainerJournal from './ContainerJournal'
import JournalEntryForm from './JournalEntryForm'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'

const JournalEntryEdit = () => {
  const { id } = useParams()
  const [submitting, setSubmitting] = useState(false)
  const [journalEntry, setJournalEntry] = useState(null)
  const { getJournalEntries, journalEntries, updateJournalEntry } = useJournalEntries()

  useEffect(() => {
    if (journalEntries) {
      setJournalEntry(journalEntries.find((entry) => entry.id === Number(id)))
    } else {
      getJournalEntries()
    }
  }, [id, getJournalEntries, journalEntries])

  const onUpdateError = () => {
    setSubmitting(false)

    notify.error(t('journal_entry_update_error'))
  }

  const onJournalEntryUpdated = () => {
    trackEvent('journal-entry-updated', 'interaction')

    notify.success(t('journal_entry_updated'))

    history.push('/journal')
  }

  const onSubmit = (form) => {
    setSubmitting(true)

    updateJournalEntry({ id, ...form })
      .then(onJournalEntryUpdated)
      .catch(onUpdateError)
  }

  return (
    <ContainerJournal>
      <ButtonJournalGoBack />

      <PageTitle>{t('edit_journal_entry')}</PageTitle>
      <PageParagraph>{t('journal_entry_details')}</PageParagraph>

      {journalEntry && (
        <JournalEntryForm
          journalEntry={journalEntry}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      )}
    </ContainerJournal>
  )
}

export default JournalEntryEdit
