import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

const HeaderCleanSidebar = css`
  .cv-container {
    .cv-content {
      .user-thumb {
        margin: 0 auto ${({ articleMargins }) => math(`${articleMargins} * 0.8`)};
      }

      .user-title {
        text-align: center;
      }

      h1 {
        font-family: ${({ headerFontFamily }) => headerFontFamily};
        font-size: 250%;
        font-weight: bold;
        line-height: 100%;

        margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.05em`)};

        ${media.md`
          font-size: 280%;
        `}
      }

      h2 {
        font-family: ${({ bodyFontFamily }) => bodyFontFamily};
        font-size: 112.5%;
        font-weight: normal;
        line-height: 133%;
        opacity: 0.6;

        margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.7`)};

        ${media.md`
          font-size: 125%;
        `}
      }

      .contact-links-wrapper {
        display: flex;
        justify-content: center;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};
      }
    }
  }
`

export default HeaderCleanSidebar
