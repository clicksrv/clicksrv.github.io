import PropTypes from 'prop-types'
import styled from 'styled-components'

import { blueLight, blueLighter, mintDark, mintDarker, orangeDark, orangeLighter, violet, violetDark } from '../colors'

const Container = styled.div`
  background-color: ${({ $color }) => $color};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  height: var(--cv-card-${({ large }) => (large ? '' : 'small-')}height);
  min-width: var(--cv-card-minimum-width);
  width: 100%;
`

const Icon = styled.i`
  color: ${({ $color }) => $color};
  font-size: ${({ large }) => (large ? 50 : 42)}px;
`

const containerColors = {
  cover_letter: violet,
  journal_entry: mintDark,
  resume: orangeLighter,
  website: blueLighter,
}

const icons = {
  cover_letter: 'icon-cover-letter',
  journal_entry: 'icon-journal',
  resume: 'icon-document-alt',
  website: 'icon-browser-alt',
}

const iconColors = {
  cover_letter: violetDark,
  journal_entry: mintDarker,
  resume: orangeDark,
  website: blueLight,
}

/**
 * @param {string} type resume / cover_letter / website / journal_entry
 */
const PinSkeleton = ({ className, large, type }) => {
  const containerColor = containerColors[type]
  const icon = icons[type]
  const iconColor = iconColors[type]

  return (
    <Container
      $color={containerColor}
      className={className}
      large={large}
      role="figure">
      <Icon
        $color={iconColor}
        className={icon}
        large={large}
        role="img"
      />
    </Container>
  )
}

PinSkeleton.propTypes = {
  className: PropTypes.string,
  large: PropTypes.bool,
  type: PropTypes.string.isRequired,
}

export default PinSkeleton
