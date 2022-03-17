import { css } from 'styled-components'
import { math } from 'polished'

import { breakpointsPx, media } from '../../../components/styled/Grid'

const { sm, md } = breakpointsPx

const CompetenciesColumns12 = css`
  .competency {
    vertical-align: top;

    // necessary so that wkhtml wraps them as it doesn't support 'flex-wrap: wrap'
    display: inline-block;
    width: 100%;

    ${media.sm`
      width: 45%;
    `}

    &:nth-of-type(odd) {
      margin-right: 10%;
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
      }
    }

    .main {
      .competency {
        // on bigger screens in .main column, second element also without article margins
        ${media.sm`
          &:nth-of-type(2) {
            margin-top: 0;
          }
        `}
      }
    }

    .sidebar {
      .competency {
        width: 100%;

        @media screen and (min-width: ${sm}) and (max-width: ${md}) {
          width: 45%;

          // on sm <-> md screens in .sidebar column, second element also without article margins
          &:nth-of-type(2) {
            margin-top: 0;
          }
        }

        &:nth-of-type(odd) {
          margin-right: inherit;

          @media screen and (min-width: ${sm}) and (max-width: ${md}) {
            margin-right: 10%;
          }
        }
      }
    }
  }
`

export default CompetenciesColumns12
