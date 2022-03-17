import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

const ArticlesSimple = css`
  .cv-container {
    h4 {
      color: black;
      font-size: 133%;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-weight: normal;
      line-height: 110%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.15`)};

      ${media.md`
        font-size: 150%;
      `}
    }

    h5 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      font-weight: bold;
      line-height: 133%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.15em`)};

      ${media.md`
        font-size: 112.5%;
      `}
    }

    h6 {
      font-size: 87.5%;
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: normal;
      line-height: 133%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.2 + 0.15em`)};
    }
  }
`

export default ArticlesSimple
