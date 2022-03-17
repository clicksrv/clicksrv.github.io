import { css } from 'styled-components'

import { breakpointsPx } from '../../../components/styled/Grid'

const { md } = breakpointsPx

const PortfoliosDefault = css`
  .cv-container {
    .portfolio {
      .row {
        margin-left: -5px;
        margin-right: -5px;

        &:before {
          content: '';
          display: none;
        }
      }

      .col-sm-4 {
        padding-left: 5px;
        padding-right: 5px;
      }

      .asset {
        .asset-description {
          display: none;
        }
      }

      label {
        font-weight: bold;

        margin-bottom: 5px;
        margin-top: 5px;
        min-height: 0.15em;
      }

      .css-crop {
        box-shadow: 1px 1px 3px 0 ${({ subtleColor }) => subtleColor};
        background-size: cover;
        background-position: center center;
        border: 1px solid ${({ primaryColor }) => primaryColor};

        padding-bottom: 75%;
        width: 100%;
      }

      a {
        label {
          cursor: pointer;
        }
      }
    }

    .sidebar {
      .portfolio {
        .asset {
          padding-left: 0;
          padding-right: 0;
        }

        .css-crop {
          box-shadow: none;
          background-image: none !important;
          border: 0;

          height: auto;
          padding: 0;

          img {
            display: block !important;
          }
        }
      }
    }

    @media screen and (max-width: ${md}) {
      .sidebar {
        .portfolio {
          label {
            text-align: left;
          }

          .asset,
          .asset-thumb {
            width: 100%;
          }

          .asset-description {
            display: block;
          }
        }
      }
    }
  }
`

export default PortfoliosDefault
