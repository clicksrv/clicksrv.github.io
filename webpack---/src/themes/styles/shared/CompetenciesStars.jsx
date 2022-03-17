import { css } from 'styled-components'
import { math } from 'polished'

import { flex } from '../shared/Mixins'

const CompetenciesStars = css`
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

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.15`)};
      }

      .competency-level {
        font-size: 87.5%;
        line-height: 110%;

        margin-right: 1px;
        margin-left: 5px;
      }

      .competency-list {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.1`)};
      }

      .placeholder,
      .mce-content-body {
        font-size: 87.5%;
      }
    }
  }
`

export default CompetenciesStars
