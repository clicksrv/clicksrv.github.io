import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import notify from '../services/notify'
import themes from '../constants/themes'
import useDropdown from '../hooks/useDropdown'
import useCvs from '../hooks/useCvs'
import useItems from '../hooks/useItems'
import { atLimit, duplicateCv, isCoverLetter, isWebsite, newPath } from '../helpers/cv'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import DropdownMenuDownloadWord from './DropdownMenuDownloadWord'
import ModalConfirm from './ModalConfirm'

import {
  Dropdown,
  DropdownContent,
  DropdownMenu,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuLink,
  DropdownTriggerDots,
} from './Dropdown'

const Container = styled(Dropdown)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`

/**
 * @param {number} index passed to DropdownContent so that it is re-rendered
 *   when CV changes its position in a list
 */
const CvActions = ({ className, cv, index }) => {
  const { type } = themes[cv.theme]

  const [showModal, setShowModal] = useState(false)
  const { closeDropdown, dropdownOpen, toggleDropdown } = useDropdown()
  const { deleteCv, togglePinned } = useCvs()
  const { items } = useItems(type)
  const user = useSelector((state) => state.session.user)

  const { id, pinned } = cv

  const word = !isWebsite(cv)
  const stats = !isCoverLetter(cv)

  const settingsPath = `/cvs/${id}/settings`
  const statsPath = `/stats/${id}`

  const pinUnpinIcon = pinned ? 'icon-unpin' : 'icon-pin'
  const pinUnpinTitle = pinned ? t('unpin') : t('pin')

  const duplicateCta = atLimit(user, items, type)
  const duplicateTo = newPath(user, items, type)

  const onUpdateError = () => notify.error(t('cv_update_error'))

  const togglePinnedState = () => togglePinned(cv).catch(onUpdateError)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const duplicate = (event) => {
    trackEvent('clicked-duplicate-cv', 'click')

    if (duplicateCta) {
      // will show upgrade modal
      return
    }

    // don't redirect the user to New CV page, just duplicate the CV
    event.preventDefault()

    const originalCv = items.find((existingCv) => existingCv.id === cv.id)

    duplicateCv(type, originalCv)
  }

  const onConfirm = () => deleteCv(id).then(closeModal)

  return (
    <Container className={className}>
      <DropdownTriggerDots onClick={toggleDropdown} />

      <DropdownContent
        separated
        closeDropdown={closeDropdown}
        dropdownOpen={dropdownOpen}
        index={index}>
        <DropdownMenu>
          <DropdownMenuItem onClick={togglePinnedState}>
            <DropdownMenuIcon className={pinUnpinIcon} />

            {pinUnpinTitle}
          </DropdownMenuItem>

          {word && <DropdownMenuDownloadWord cv={cv} />}

          <DropdownMenuLink
            onClick={duplicate}
            to={duplicateTo}>
            <DropdownMenuIcon
              className="icon-documents-plus"
              cta={duplicateCta}
            />

            {t('duplicate')}
          </DropdownMenuLink>

          {stats && (
            <DropdownMenuLink to={statsPath}>
              <DropdownMenuIcon className="icon-pie-chart-alt" />

              {t('stats')}
            </DropdownMenuLink>
          )}

          <DropdownMenuLink to={settingsPath}>
            <DropdownMenuIcon className="icon-gear-alt" />

            {t('settings')}
          </DropdownMenuLink>

          <DropdownMenuItem onClick={openModal}>
            <DropdownMenuIcon
              className="icon-trash"
              danger
            />

            {t('delete')}
          </DropdownMenuItem>
        </DropdownMenu>
      </DropdownContent>

      <ModalConfirm
        danger
        cancelLabel={t('cancel')}
        confirmLabel={t('delete')}
        isOpen={showModal}
        message={t(`delete_${type}_confirm`)}
        onCancel={closeModal}
        onClose={closeModal}
        onConfirm={onConfirm}
        title={t('are_you_sure')}
      />
    </Container>
  )
}

CvActions.propTypes = {
  className: PropTypes.string,
  cv: PropTypes.object.isRequired,
  index: PropTypes.number,
}

export default CvActions
