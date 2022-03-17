import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import events from '../services/events'
import { getSectionType, isCoverLetter, isFixedSection, moveElement, sectionOrder } from '../helpers/cv'
import { primary, primaryDarker, redDanger, redDangerDarker, redErrorLight, redErrorLightDark } from '../colors'
import { t } from '../locales'

import ModalConfirm from './ModalConfirm'

const Container = styled.aside`
  opacity: 0;
  transition: opacity 0.2s, visibility 0s ease 0.2s;
  visibility: hidden;
  z-index: 2; // must not exceed EditorSidebar/EditorBar's z-index

  display: ${({ show }) => (show ? 'flex' : 'none')};

  padding: 4px 12px 12px 4px;

  position: absolute;
  left: -13px;
  top: -56px;
`

const Button = styled.a`
  background-color: ${primary};
  border-radius: 4px;
  border: none !important;
  font-size: 20px;
  text-decoration: none !important;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  margin-right: 4px;
  width: 40px;

  &:hover {
    background-color: ${primaryDarker};
  }
`

const Icon = styled.i`
  color: white;
`

const IconUp = styled(Icon)``

const IconDown = styled(Icon)`
  transform: rotate(180deg);
`

const IconDelete = styled(Icon)`
  font-size: 25px;
`

const ButtonDelete = styled(Button)`
  background-color: ${redErrorLight};

  ${IconDelete} {
    color: ${redDanger};
  }

  &:hover {
    background-color: ${redErrorLightDark};

    ${IconDelete} {
      color: ${redDangerDarker};
    }
  }
`

const CvSectionEditButtons = ({ cv, pageBreaksMode, sectionKey, sidebar }) => {
  const [showModal, setShowModal] = useState(false)

  const sections = sectionOrder(cv.sections, cv.main_order, cv.side_order, cv.theme)
  const sortedSections = sidebar ? sections.sidebar : sections.sorted
  const sectionIndex = sortedSections.indexOf(sectionKey)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const sortUp = () => {
    const sectionOrder = moveElement(sortedSections, sectionIndex, sectionIndex - 1)

    events.emit('CV::SORT', { sectionOrder, sidebar })
  }

  const sortDown = () => {
    const sectionOrder = moveElement(sortedSections, sectionIndex, sectionIndex + 1)

    events.emit('CV::SORT', { sectionOrder, sidebar })
  }

  const onConfirm = () => {
    events.emit('CV::REMOVE_SECTION', { sectionKey })

    closeModal()
  }

  const isFirstSection = sectionIndex === 0
  const isLastSection = sectionIndex === sortedSections.length - 1

  const canSort = !isFixedSection(cv.theme, sectionKey)
  const canSortUp = canSort && !isFirstSection
  const canSortDown = canSort && !isLastSection

  const sectionType = getSectionType(sectionKey)

  const canDelete = sectionType !== 'profile'
  const show = !pageBreaksMode && !isCoverLetter(cv)

  return (
    <Container
      className="section-edit"
      show={show}>
      {canSortUp && (
        <Button
          className="section-sort-up"
          onClick={sortUp}
          title={t('sort_up')}>
          <IconUp className="icon-arrow" />
        </Button>
      )}

      {canSortDown && (
        <Button
          className="section-sort-down"
          onClick={sortDown}
          title={t('sort_down')}>
          <IconDown className="icon-arrow" />
        </Button>
      )}

      {canDelete && (
        <ButtonDelete
          onClick={openModal}
          title={t('delete')}>
          <IconDelete className="icon-trash" />
        </ButtonDelete>
      )}

      <ModalConfirm
        danger
        cancelLabel={t('cancel')}
        confirmLabel={t('delete')}
        isOpen={showModal}
        onCancel={closeModal}
        onClose={closeModal}
        onConfirm={onConfirm}
        title={t('delete_confirm')}
      />
    </Container>
  )
}

CvSectionEditButtons.propTypes = {
  cv: PropTypes.object.isRequired,
  pageBreaksMode: PropTypes.bool.isRequired,
  sectionKey: PropTypes.string.isRequired,
  sidebar: PropTypes.bool.isRequired,
}

export default CvSectionEditButtons
