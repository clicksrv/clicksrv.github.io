import styled from 'styled-components'

import { black } from '../colors'
import { media } from './styled/Grid'

const PageSubtitle = styled.h2`
  color: ${black};
  font-family: 'Crimson Pro', serif;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.67px;

  @supports (font-variation-settings: normal) {
    font-family: 'Crimson ProVariable', serif;
    font-synthesis: none;
  }

  ${media.sm`
    font-size: 36px;
  `}

  ${media.md`
    font-size: 42px;
  `}

  ${media.lg`
    font-size: 48px;
  `}
`

export default PageSubtitle
