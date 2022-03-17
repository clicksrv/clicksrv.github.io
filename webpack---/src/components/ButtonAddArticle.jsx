import PropTypes from 'prop-types'
import styled from 'styled-components'

import events from '../services/events'
import { t } from '../locales'

import ButtonAddArticleSection from './ButtonAddArticleSection'
import IconPlus from './IconPlus'

const Button = styled(ButtonAddArticleSection)`
  margin-bottom: 20px;
  max-width: unset;
  padding-top: 10px;
  padding-bottom: 10px;
`

const ButtonAddArticle = ({ cv, pageBreaksMode, sectionKey, sidebar }) => {
  const prependArticle = () => {
    events.emit('CV::PREPEND_ARTICLE', sectionKey)
  }

  return (
    <Button
      className="add-article"
      cv={cv}
      onClick={prependArticle}
      pageBreaksMode={pageBreaksMode}
      sidebar={sidebar}>
      <IconPlus className="icon-plus" />

      {t('add_entry')}
    </Button>
  )
}

ButtonAddArticle.propTypes = {
  cv: PropTypes.object.isRequired,
  pageBreaksMode: PropTypes.bool.isRequired,
  sectionKey: PropTypes.string.isRequired,
  sidebar: PropTypes.bool,
}

export default ButtonAddArticle
