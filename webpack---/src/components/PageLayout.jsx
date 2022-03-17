import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect } from 'react'

import usePageBreaks from '../hooks/usePageBreaks'
import useWindowSize from '../hooks/useWindowSize'
import { breakpoints, media } from './styled/Grid'
import { isResume } from '../helpers/cv'

import DropdownStyling from './DropdownStyling'
import NavBarSeparator from './NavBarSeparator'
import PageBreaksToggle from './PageBreaksToggle'

const Separator = styled(NavBarSeparator)`
  display: none;

  ${media.md`
    display: inline-block;
  `}
`

const Whitespace = styled.span`
  display: none;
  width: 15px;

  ${media.md`
    display: inline-block;
  `}
`

const PageLayout = ({ active, cv }) => {
  const { disablePageBreaksMode } = usePageBreaks()
  const { viewportWidth } = useWindowSize()

  const isMobile = viewportWidth < breakpoints.md

  useEffect(() => {
    if (!active && !isMobile) {
      // disable page breaks mode when this bar is being closed, but not on mobile
      disablePageBreaksMode()
    }
  }, [active, isMobile])

  return (
    <>
      <DropdownStyling
        narrow
        cv={cv}
        element={'@section-margins'}
      />

      <Whitespace />

      <DropdownStyling
        narrow
        cv={cv}
        element={'@article-margins'}
      />

      {isResume(cv) && (
        <>
          <Separator separated />

          <PageBreaksToggle cv={cv} />
        </>
      )}
    </>
  )
}

PageLayout.propTypes = {
  active: PropTypes.bool,
  cv: PropTypes.object.isRequired,
}

export default PageLayout
