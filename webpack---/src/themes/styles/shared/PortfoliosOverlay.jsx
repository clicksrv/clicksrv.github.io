import { css } from 'styled-components'

const PortfoliosOverlay = css`
  .cv-container {
    .portfolio {
      .row {
        margin-left: -5px;
        margin-right: -5px;
      }

      .asset {
        padding: 0px 5px 10px 5px;
      }

      a {
        label {
          cursor: pointer;
        }
      }

      .asset-thumb {
        border: 3px solid ${({ bodyColor }) => bodyColor};
        transition: all 0.5s ease;

        position: relative;

        &:hover {
          .overlay {
            opacity: 1;
          }

          .portfolio-open {
            bottom: 0;
          }

          .css-crop {
            filter: grayscale(0%);
          }
        }

        .overlay {
          background-color: rgba(0, 0, 0, 0.6);
          opacity: 0;
          transition: opacity 0.5s;
          z-index: 1;

          position: absolute;
          left: 0;
          bottom: -1px;

          display: block;
          max-width: 100%;
          padding: 0.625em;

          &.empty {
            display: none !important;
          }
        }

        .css-crop {
          filter: grayscale(100%);
          transition: filter 0.5s;

          padding-bottom: 80%;
          width: 100%;
        }
      }
    }
  }
`

export default PortfoliosOverlay
