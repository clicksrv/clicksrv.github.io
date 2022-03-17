import { css } from 'styled-components'
import { math, transparentize } from 'polished'

import { media } from '../../../components/styled/Grid'

const ArticlesDuoColor = css`
  .cv-container {
    h3 {
      text-transform: uppercase;
    }

    .sidebar {
      ${media.md`
        h3 {
          border-bottom-color: ${({ faintColor }) => transparentize(0.4, faintColor)};
          color: white;
        }
      `}
    }

    h4 {
      color: black;
      font-size: 125%;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-weight: normal;
      line-height: 120%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.2`)};

      ${media.md`
        font-size: 137.5%;
      `}
    }

    h5 {
      color: ${({ bodyColor }) => bodyColor};
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

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.2 + 0.2em`)};
    }

    .sidebar {
      ${media.md`
        color: ${transparentize(0.4, 'white')};

        h4 {
          color: white;
        }

        h5 {
          color: ${transparentize(0.3, 'white')};
        }

        .competency {
          h6 {
            color: white;
          }
        }

        .portfolio {
          .asset {
            label {
              color: ${transparentize(0.4, 'white')};
            }
          }
        }
      `}
    }
  }
`

export default ArticlesDuoColor
