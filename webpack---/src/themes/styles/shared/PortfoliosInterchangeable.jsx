import { css } from 'styled-components'
import { transparentize } from 'polished'

// 'default' portfolio style to be used in 2-column layouts
// main column with 3 items per line, sidebar with 2 items
// css-crop in both columns
const PortfoliosInterchangeable = css`
  .portfolio {
    .row {
      margin-left: -5px;
      margin-right: -5px;

      &:before {
        display: none;
      }
    }

    .col-xs-4,
    .col-xs-6,
    .col-sm-4,
    .col-sm-6,
    .col-sm-12 {
      padding-left: 5px;
      padding-right: 5px;
    }

    a {
      span span {
        color: ${({ linkColor }) => transparentize(0.5, linkColor)};
      }

      label {
        color: inherit;
        cursor: pointer;
      }
    }

    .asset {
      label {
        color: ${({ bodyColor }) => transparentize(0.5, bodyColor)};
        font-size: 80%;
        font-weight: normal;
        line-height: 110%;

        margin-bottom: 5px;
        margin-top: 5px;
        min-height: 1.3em;
      }
    }

    .asset-thumb {
      border: 1px solid ${({ primaryColor }) => primaryColor};
    }

    .css-crop {
      background-size: cover;
      background-position: center center;
      box-shadow: 1px 1px 3px 0 ${({ subtleColor }) => subtleColor};

      padding-bottom: 75%;
      width: 100%;
    }
  }

  .pdf {
    .asset-thumb {
      // 1px border is being rendered extremely thin by wkhtmltopdf, to the
      // point of not being visible; make it thicker
      border-width: 1.4px;
    }
  }
`

export default PortfoliosInterchangeable
