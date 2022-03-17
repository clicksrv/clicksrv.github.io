import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

const HeadlinesSimple = css`
  .cv-container {
    h3 {
      border-bottom: 1px solid ${({ faintColor }) => faintColor};
      color: black;
      font-size: 100%;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-weight: bold;
      line-height: 130%;
      letter-spacing: 1px;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.4 + 0.3em`)};

      padding-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2`)};

      ${media.md`
        font-size: 112.5%;
      `}
    }
  }

  .pdf {
    .cv-container {
      h3 {
        // wkhtmltopdf fix for border around whole block
        border-top: 1px solid transparent;
        border-right: 1px solid transparent;
        border-left: 1px solid transparent;

        letter-spacing: 0;
      }
    }
  }

  // Icons

  .cv-container {
    h3 {
      &:before {
        color: ${({ secondaryColor }) => secondaryColor};
        content: '\\e912';
        font-family: 'Icons';
        font-size: 110%;
        font-weight: normal;
        text-align: center;
        vertical-align: middle;

        display: inline-block;
        margin-bottom: 4px;
        width: 2em;
      }
    }

    #summary {
      h3:before {
        content: '\\e91c';
      }
    }

    .strengths {
      h3:before {
        content: '\\e911';
      }
    }
  }
`

export default HeadlinesSimple
