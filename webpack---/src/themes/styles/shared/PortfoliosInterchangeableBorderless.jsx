import { css } from 'styled-components'

// requires theme styles to include `Interchangeable` styles separately
const PortfoliosInterchangeableBorderless = css`
  .portfolio {
    .row {
      margin-left: -12px;
      margin-right: -12px;
    }

    .col-xs-4,
    .col-xs-6,
    .col-sm-4,
    .col-sm-6,
    .col-sm-12 {
      padding-left: 12px;
      padding-right: 12px;
    }

    .css-crop {
      box-shadow: none;
      border: none;
    }
  }
`

export default PortfoliosInterchangeableBorderless
