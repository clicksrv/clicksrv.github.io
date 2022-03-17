import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

const CompetenciesColumns22 = css`
  .competency {
    vertical-align: top;

    // necessary so that wkhtml wraps them as it doesn't support 'flex-wrap: wrap'
    display: inline-block;
    width: 100%;

    ${media.sm`
      width: 47%;
    `}

    &:nth-of-type(odd) {
      margin-right: 6%;
    }
  }

  .cv-container {
    .main,
    .sidebar {
      .competency {
        margin-bottom: 0;
        margin-top: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};

        // first element without article margins
        &:nth-of-type(1) {
          margin-top: 0;
        }

        // on bigger screens, second element also without article margins
        ${media.sm`
          &:nth-of-type(2) {
            margin-top: 0;
          }
        `}
      }
    }
  }
`

export default CompetenciesColumns22
