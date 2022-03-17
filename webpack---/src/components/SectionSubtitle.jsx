import styled from 'styled-components'

import { black } from '../colors'
import { media } from './styled/Grid'

const SectionSubtitle = styled.h4`
  color: ${black};
  font-family: 'Crimson Pro', serif;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;

  @supports (font-variation-settings: normal) {
    font-family: 'Crimson ProVariable', serif;
    font-synthesis: none;
  }

  ${media.sm`
    font-size: 22px;
  `}

  ${media.md`
    font-size: 24px;
  `}
`

export default SectionSubtitle
