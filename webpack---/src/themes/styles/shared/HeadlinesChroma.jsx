import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

const HeadlinesChroma = css`
  .cv-container {
    h3 {
      background-color: ${({ secondaryColor }) => secondaryColor};
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 140%;
      font-weight: bold;
      line-height: 100%;
      transform: translate(
        ${({ headlineChromaOffsetX }) => headlineChromaOffsetX},
        ${({ headlineChromaOffsetY }) => headlineChromaOffsetY}
      );

      display: inline-block;
      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.4 + 0.6em`)};
      width: auto;

      ${media.md`
        font-size: 150%;
      `}

      & > span {
        content: '';
        transform: translate(
          -${({ headlineChromaOffsetX }) => headlineChromaOffsetX},
          -${({ headlineChromaOffsetY }) => headlineChromaOffsetY}
        );

        display: inline-block;
      }
    }
  }
`

export default HeadlinesChroma
