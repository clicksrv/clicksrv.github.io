import { css } from 'styled-components'

import { flex } from '../shared/Mixins'
import { media } from '../../../components/styled/Grid'

const CompetenciesColumns2 = css`
  .competency {
    // properly alignes articles
    vertical-align: top;

    // necessary so that wkhtml wraps them as it doesn't support 'flex-wrap: wrap'
    display: inline-block;
    width: 100%;

    .competency-description {
      ${flex('1 1 auto')}
    }

    ${media.sm`
      width: 46%;
    `}
  }
`

export default CompetenciesColumns2
