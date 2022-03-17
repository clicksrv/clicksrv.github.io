import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import notify from '../services/notify'
import useDropdown from '../hooks/useDropdown'
import useJournalEntries from '../hooks/useJournalEntries'
import { t } from '../locales'

import {
  Dropdown,
  DropdownContent,
  DropdownMenu,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuLink,
  DropdownTriggerDots,
} from './Dropdown'
import ModalConfirm from './ModalConfirm'

const Container = styled(Dropdown)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`

/**
 * @param {number} index passed to DropdownContent so that it is re-rendered
 *   when JournalEntry changes its position in a list
 */
const JournalEntryActions = ({ className, index, journalEntry, locked }) => {
  const [showModal, setShowModal] = useState(false)
  const { closeDropdown, dropdownOpen, toggleDropdown } = useDropdown()
  const { deleteJournalEntry, togglePinned } = useJournalEntries()

  const { id, pinned } = journalEntry

  const editEntryPath = `/journal/entries/${id}/edit`

  const pinUnpinIcon = pinned ? 'icon-unpin' : 'icon-pin'
  const pinUnpinTitle = pinned ? t('unpin') : t('pin')

  const onUpdateError = () => notify.error(t('journal_entry_update_error'))

  const togglePinnedState = () => togglePinned(journalEntry).catch(onUpdateError)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const onConfirm = () => deleteJournalEntry(id).then(closeModal)

  return (
    <Container className={className}>
      <DropdownTriggerDots
        locked={locked}
        onClick={toggleDropdown}
      />

      {!locked && (
        <DropdownContent
          separated
          closeDropdown={closeDropdown}
          dropdownOpen={dropdownOpen}
          index={index}>
          <DropdownMenu>
            <DropdownMenuLink to={editEntryPath}>
              <DropdownMenuIcon className="icon-pencil" />

              {t('edit_entry')}
            </DropdownMenuLink>

            <DropdownMenuItem onClick={togglePinnedState}>
              <DropdownMenuIcon className={pinUnpinIcon} />

              {pinUnpinTitle}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={openModal}>
              <DropdownMenuIcon
                className="icon-trash"
                danger
              />

              {t('delete')}
            </DropdownMenuItem>
          </DropdownMenu>
        </DropdownContent>
      )}

      <ModalConfirm
        danger
        cancelLabel={t('cancel')}
        confirmLabel={t('delete')}
        isOpen={showModal}
        message={t('delete_journal_entry_confirm')}
        onCancel={closeModal}
        onClose={closeModal}
        onConfirm={onConfirm}
        title={t('are_you_sure')}
      />
    </Container>
  )
}

JournalEntryActions.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  journalEntry: PropTypes.object.isRequired,
  locked: PropTypes.bool,
}

export default JournalEntryActions
