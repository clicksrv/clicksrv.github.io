import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import history from '../services/history'
import notify from '../services/notify'
import useJournalEntries from '../hooks/useJournalEntries'
import { buttonBig, buttonDanger, buttonHollowBig } from '../styles/buttons'
import { greyDark } from '../colors'
import { t } from '../locales'

import { Btn } from './styled/Button'

const Confirmation = styled.span`
  color: ${greyDark};
  font-weight: 700;
`

const Container = styled.p`
  display: inline-block;
  margin-left: 20px;

  ${Confirmation} ${Btn} {
    font-weight: 500;

    margin-left: 15px;
  }
`

const ButtonDanger = styled.a`
  ${buttonBig}
  ${buttonDanger}

  margin-left: 10px;
`

const ButtonCancel = styled.a`
  ${buttonHollowBig}

  margin-left: 10px;
`

const ButtonJournalEntryDelete = ({ className, journalEntry }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { deleteJournalEntry } = useJournalEntries()

  const { id } = journalEntry

  const onDeleted = () => history.push('/journal')

  const onError = () => notify.error(t('journal_entry_delete_error'))

  const onDelete = (event) => {
    event.preventDefault()

    deleteJournalEntry(id).then(onDeleted).catch(onError)
  }

  const onDeleteClick = (event) => {
    event.preventDefault()

    setShowConfirmation(true)
  }

  const onCancelClick = (event) => {
    event.preventDefault()

    setShowConfirmation(false)
  }

  return (
    <Container className={className}>
      {showConfirmation && (
        <Confirmation>
          {t('delete_journal_entry')}

          <ButtonDanger onClick={onDelete}>{t('delete')}</ButtonDanger>

          <ButtonCancel onClick={onCancelClick}>{t('cancel')}</ButtonCancel>
        </Confirmation>
      )}

      {!showConfirmation && (
        <Btn
          big
          hollow
          onClick={onDeleteClick}>
          {t('delete')}
        </Btn>
      )}
    </Container>
  )
}

ButtonJournalEntryDelete.propTypes = {
  className: PropTypes.string,
  journalEntry: PropTypes.object.isRequired,
}

export default ButtonJournalEntryDelete
