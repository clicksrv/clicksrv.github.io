import { css } from 'styled-components'
import { math } from 'polished'

import { flex } from '../shared/Mixins'

const CompetenciesDotsNumber = css`
  .cv-container {
    .competency {
      .article-headings {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      }

      .competency-name {
        font-size: 87.5%;
        font-weight: bold;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3`)};

        ${flex('1')}
      }

      .competency-level {
        font-size: 87.5%;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3`)};
        margin-left: 5px;
      }

      .competency-list {
        ${flex('1')}

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2`)};
        margin-left: 1px;
        padding-right: 1px;
      }

      .placeholder,
      .mce-content-body {
        font-size: 87.5%;
      }
    }
  }
`

export default CompetenciesDotsNumber
