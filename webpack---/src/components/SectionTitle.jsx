import styled from 'styled-components'

import { black } from '../colors'
import { media } from './styled/Grid'

const SectionTitle = styled.h3`
  color: ${black};
  font-family: 'Crimson Pro', serif;
  font-size: 24px;
  font-weight: 550;
  letter-spacing: -0.4px;

  @supports (font-variation-settings: normal) {
    font-family: 'Crimson ProVariable', serif;
    font-synthesis: none;
  }

  ${media.xs`
    font-size: 26px;
  `}

  ${media.sm`
    font-size: 28px;
  `}

  ${media.md`
    font-size: 32px;
  `}
`

export default SectionTitle
