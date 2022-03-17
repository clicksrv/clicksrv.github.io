import PropTypes from 'prop-types'
import styled from 'styled-components'

import conf from '../conf'
import { isCoverLetter } from '../helpers/cv'
import { media } from './styled/Grid'

import ButtonResetStyling from './ButtonResetStyling'
import ChangeImage from './ChangeImage'
import DropdownCoverLetterFormat from './DropdownCoverLetterFormat'
import DropdownStyling from './DropdownStyling'
import DropdownStylingColors from './DropdownStylingColors'
import NavBarSeparator from './NavBarSeparator'
import PageNumbersToggle from './PageNumbersToggle'

const Separator = styled(NavBarSeparator)`
  display: none;

  ${media.lg`
    display: inline-block;
  `}
`
const Whitespace = styled.span`
  display: inline-block;
  width: 15px;
`

const Appearance = ({ cv }) => {
  const { theme } = cv
  const defaultStyles = conf.themes[theme].styles

  const hasBackground = Object.keys(defaultStyles).includes('@bg-url')
  const hasLogo = Object.keys(defaultStyles).includes('@logo-url')
  const hasImage = hasBackground || hasLogo

  const coverLetter = isCoverLetter(cv)

  return (
    <>
      {coverLetter && <DropdownCoverLetterFormat cv={cv} />}

      {coverLetter && <Separator separated />}

      <DropdownStyling
        cv={cv}
        element={'@header-font'}
      />

      <Whitespace />

      <DropdownStyling
        cv={cv}
        element={'@body-font'}
      />

      <Whitespace />

      <DropdownStyling
        cv={cv}
        element={'@body-font-size'}
        narrow
      />

      <Separator separated />

      <DropdownStylingColors cv={cv} />

      <Separator separated />

      <ChangeImage
        element="@bg-url"
        cv={cv}
      />

      <ChangeImage
        element="@logo-url"
        cv={cv}
      />

      {hasImage && <Separator separated />}

      <PageNumbersToggle cv={cv} />

      <ButtonResetStyling cv={cv} />
    </>
  )
}

Appearance.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default Appearance
