import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

const HeadlinesBasic = css`
  .cv-container {
    h3 {
      color: ${({ primaryColor }) => primaryColor};
      font-size: 160%;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-weight: bold;
      line-height: 100%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.3 + 0.2em`)};

      ${media.md`
        font-size: 175%;
      `}
    }
  }
`

export default HeadlinesBasic
