import styled from 'styled-components'

import { black } from '../colors'
import { media } from './styled/Grid'

const PageTitle = styled.h1`
  color: ${black};
  font-family: 'Crimson Pro', serif;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 110%;

  margin: 20px 15px 10px;

  @supports (font-variation-settings: normal) {
    font-family: 'Crimson ProVariable', serif;
    font-synthesis: none;
  }

  ${media.xs`
    font-size: 38px;

    margin-top: 40px;
  `}

  ${media.sm`
    font-size: 44px;

    margin-top: 55px;
  `}

  ${media.md`
    font-size: 50px;

    margin-top: 70px;
  `}

  ${media.lg`
    font-size: 56px;
  `}
`

export default PageTitle
