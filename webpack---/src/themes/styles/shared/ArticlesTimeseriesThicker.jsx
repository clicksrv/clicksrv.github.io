import { css } from 'styled-components'
import { lighten, transparentize } from 'polished'

// requires theme styles to include `Timeseries` styles separately
const ArticlesTimeseriesThicker = css`
  .cv-container {
    .cv-content {
      .dated_story {
        article {
          // line
          &:before {
            background-color: ${({ secondaryColor }) => transparentize(0.2, lighten(0.25, secondaryColor))};

            width: 2px;
          }

          // circle
          &:after {
            background-color: ${({ secondaryColor }) => transparentize(0.2, lighten(0.25, secondaryColor))};
            border-color: ${({ secondaryColor }) => transparentize(0.2, lighten(0.25, secondaryColor))};

            height: 6px;
            width: 6px;
          }

          &:first-of-type {
            // circle
            &:after {
              background-color: ${({ secondaryColor }) => secondaryColor};
              border-color: ${({ secondaryColor }) => secondaryColor};
            }
          }
        }
      }
    }
  }
`

export default ArticlesTimeseriesThicker
