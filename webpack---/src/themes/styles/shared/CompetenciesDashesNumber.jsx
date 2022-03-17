import { css } from 'styled-components'
import { math } from 'polished'

import { flex } from '../shared/Mixins'

const CompetenciesDashesNumber = css`
  .cv-container {
    .competency {
      .article-headings {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }

      .competency-name {
        font-size: 87.5%;
        font-weight: bold;

        ${flex('1')}

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};
      }

      .competency-level {
        font-size: 87.5%;

        margin-right: 1px;
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};
        margin-left: 5px;
      }

      .competency-list {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};
      }

      .placeholder,
      .mce-content-body {
        font-size: 87.5%;
      }
    }
  }

  .pdf {
    .cv-container {
      .competency {
        .competency-level {
          // wkhtmltopdf does not stretch dashes to 100%
          margin-right: 4px;
        }
      }
    }
  }
`

export default CompetenciesDashesNumber
