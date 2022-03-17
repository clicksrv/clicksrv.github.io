import { css } from 'styled-components'

import { flex } from '../shared/Mixins'
import { breakpointsPx } from '../../../components/styled/Grid'

const { sm } = breakpointsPx

const CompetenciesBarPercentage = css`
  .cv-container {
    .competency {
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .competency-name {
        margin-bottom: 0;
        margin-right: 20px;
        max-width: 60%;
      }

      .competency-bar {
        ${flex('1')}

        margin-right: 20px;
        min-width: 20%;
      }

      .competency-percentage {
        color: ${({ primaryColor }) => primaryColor};
        font-family: ${({ headerFontFamily }) => headerFontFamily};
        font-size: 150%;
      }

      @media screen and (max-width: ${sm}) {
        header {
          flex-wrap: wrap;
        }

        .competency-name {
          margin-right: 0;
          order: 1;
          width: 80%;
        }

        .competency-bar {
          margin-right: 0;
          margin-top: 5px;
          order: 3;
          width: 100%;
        }

        .competency-percentage {
          text-align: right;

          order: 2;
          width: 20%;
        }
      }
    }
  }
`

export default CompetenciesBarPercentage
