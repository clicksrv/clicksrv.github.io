import _ from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import events from '../services/events'
import { black, primary, primaryFadedLess, white } from '../colors'
import { getPath } from '../helpers/cv'
import { t } from '../locales'

const Container = styled.aside`
  border-bottom: 1px solid ${(props) => (props.hasPageBreak ? primary : primaryFadedLess)};
  text-align: left;
  transition: border-color 0.3s;

  display: ${({ pageBreaksMode }) => (pageBreaksMode ? 'block' : 'none')};
  margin-bottom: 5px;
  width: 100%;
`

const Button = styled.a`
  background-color: ${(props) => (props.hasPageBreak ? primary : primaryFadedLess)};
  color: ${(props) => (props.hasPageBreak ? white : black)} !important;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 400;
  text-decoration: none !important;
  transition: background-color 0.3s, color 0.3s;

  display: inline-block;
  padding: 0.3em 0.6em;

  @supports (font-variation-settings: normal) {
    font-family: 'InterVariable', sans-serif;
  }
`

const ButtonPageBreak = ({ cv, index, pageBreaksMode, sectionKey }) => {
  const path = index === null ? `sections.${sectionKey}.page_break` : getPath(sectionKey, index, 'page_break')
  const hasPageBreak = _.get(cv, path)

  const togglePageBreak = () => {
    events.emit(`CV::TOGGLE_PAGE_BREAK`, { sectionKey, index })
  }

  const text = hasPageBreak ? t('remove_page_break') : t('add_page_break')
  const className = hasPageBreak ? 'remove-page-break' : 'add-page-break'

  return (
    <Container
      hasPageBreak={hasPageBreak}
      pageBreaksMode={pageBreaksMode}>
      <Button
        className={className}
        hasPageBreak={hasPageBreak}
        onClick={togglePageBreak}>
        {text}
      </Button>
    </Container>
  )
}

ButtonPageBreak.propTypes = {
  cv: PropTypes.object.isRequired,
  index: PropTypes.number,
  pageBreaksMode: PropTypes.bool.isRequired,
  sectionKey: PropTypes.string.isRequired,
}

export default ButtonPageBreak
