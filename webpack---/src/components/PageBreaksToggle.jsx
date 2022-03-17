import PropTypes from 'prop-types'
import styled from 'styled-components'

import usePageBreaks from '../hooks/usePageBreaks'
import useSidebar from '../hooks/useSidebar'
import useWindowSize from '../hooks/useWindowSize'
import { breakpoints } from './styled/Grid'
import { t } from '../locales'

import Hyperlink from './styled/Hyperlink'

const Icon = styled.i`
  && {
    font-size: 20px;

    margin-left: -5px;
    margin-right: 5px;
  }
`

const PageBreaksToggle = ({ cv }) => {
  const { pageBreaksMode, togglePageBreaksMode } = usePageBreaks()
  const { handleSidebarItemSelected } = useSidebar()
  const { viewportWidth } = useWindowSize()

  const isMobile = viewportWidth < breakpoints.md

  const pageBreaksTitle = pageBreaksMode ? t('finish_adjusting') : t('adjust_page_breaks')
  const pageBreaksIconName = pageBreaksMode ? 'checkmark' : 'page-breaks'

  const onClick = () => {
    togglePageBreaksMode()

    // on mobile, when turning page breaks mode ON, close the sidebar to show the CV
    if (isMobile && !pageBreaksMode) {
      handleSidebarItemSelected(cv)
    }
  }

  return (
    <Hyperlink
      compact
      small
      hollow={!pageBreaksMode}
      onClick={onClick}>
      <Icon className={`icon-${pageBreaksIconName}`} />

      {pageBreaksTitle}
    </Hyperlink>
  )
}

PageBreaksToggle.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default PageBreaksToggle
