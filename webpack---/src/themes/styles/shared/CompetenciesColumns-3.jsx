import { css } from 'styled-components'

import { flex } from '../shared/Mixins'
import { media } from '../../../components/styled/Grid'

const CompetenciesColumns3 = css`
  .competency {
    display: block;

    .competency-description {
      ${flex('1 1 auto')}
    }

    ${media.md`
      // necessary so that wkhtml wraps them as it doesn't support 'flex-wrap: wrap'
      display: inline-block;
      vertical-align: top;

      width: 44%;
    `}

    ${media.lg`
      width: 30%;
    `}
  }
`

export default CompetenciesColumns3
