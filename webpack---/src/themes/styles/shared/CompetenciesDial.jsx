import { css } from 'styled-components'

import { flex } from '../shared/Mixins'

const CompetenciesDial = css`
  .cv-container {
    .competency {
      vertical-align: middle;

      .article-body {
        display: flex;
        align-items: center;
      }

      .competency-name {
        line-height: 110%;

        margin: 0 0 0.4em;
      }

      .competency-description {
        ${flex('1 4 60%')}
      }

      .placeholder,
      .mce-content-body {
        line-height: 120%;
      }
    }
  }
`

export default CompetenciesDial
