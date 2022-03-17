import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import conf from '../conf'
import events from '../services/events'
import { getSectionType, isArticle, isCoverLetter, moveElement } from '../helpers/cv'
import { primary, primaryDarker, redDanger, redDangerDarker, redErrorLight, redErrorLightDark } from '../colors'
import { t } from '../locales'

import ModalConfirm from './ModalConfirm'

const Container = styled.aside`
  opacity: 0;
  transition: opacity 0.2s, visibility 0s ease 0.2s;
  visibility: hidden;
  z-index: 2; // must not exceed EditorSidebar/EditorBar's z-index

  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;

  padding: 4px 6px 4px 4px;

  position: absolute;
  left: -40px;
  top: -6px;
`

const Button = styled.a`
  background-color: ${primary};
  border-radius: 4px;
  border: none !important;
  font-size: 18px;
  text-decoration: none !important;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  margin-bottom: 4px;
  width: 30px;

  :hover {
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
  font-size: 23px;
`

const ButtonDelete = styled(Button)`
  background-color: ${redErrorLight};

  ${IconDelete} {
    color: ${redDanger};
  }

  :hover {
    background-color: ${redErrorLightDark};

    ${IconDelete} {
      color: ${redDangerDarker};
    }
  }
`

const CvArticleEditButtons = ({ articles, cv, index, pageBreaksMode, sectionKey, to }) => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const sortUp = () => {
    const sortedArticles = moveElement(articles, index, index - 1)

    events.emit('CV::SORT_ARTICLES', { sectionKey, articles: sortedArticles })
  }

  const sortDown = () => {
    const sortedArticles = moveElement(articles, index, index + 1)

    events.emit('CV::SORT_ARTICLES', { sectionKey, articles: sortedArticles })
  }

  const onConfirm = () => {
    events.emit('CV::REMOVE_ARTICLE', { sectionKey, index })

    closeModal()
  }

  const sectionType = getSectionType(sectionKey)

  const isFirstArticle = index === 0
  const isLastArticle = index === articles.length - 1

  const canSort = articles.length > 1
  const canSortUp = canSort && !isFirstArticle
  const canSortDown = canSort && !isLastArticle
  const canEdit = conf.editableSections.includes(sectionType)
  const canDelete = !isArticle(sectionKey)

  const containerShow = !pageBreaksMode && !isCoverLetter(cv)

  return (
    <Container
      className="article-edit"
      show={containerShow}>
      {canEdit && (
        <Button
          as={Link}
          title={t('edit')}
          to={to}>
          <Icon className="icon-pencil" />
        </Button>
      )}

      {canSortUp && (
        <Button
          onClick={sortUp}
          className="article-sort-up"
          title={t('sort_up')}>
          <IconUp className="icon-arrow" />
        </Button>
      )}

      {canSortDown && (
        <Button
          onClick={sortDown}
          className="article-sort-down"
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

CvArticleEditButtons.propTypes = {
  articles: PropTypes.array.isRequired,
  cv: PropTypes.object.isRequired,
  index: PropTypes.number,
  pageBreaksMode: PropTypes.bool.isRequired,
  sectionKey: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default CvArticleEditButtons
