import { css } from 'styled-components'
import { math } from 'polished'

// requires theme styles to include `Timeseries` styles separately
const ArticlesTimeseriesSpaced = css`
  .cv-container {
    .cv-content {
      .dated_story {
        article {
          // line
          &:before {
            background-color: ${({ primaryColor }) => primaryColor};

            left: 5px;
            top: ${({ timelineOffset }) => math(`${timelineOffset} + 2.3em`)};
            bottom: ${({ timelineOffset }) => math(`${timelineOffset} + 0.3em`)};

            height: auto;
            width: 2px;
          }

          // circle
          &:after {
            background-color: ${({ primaryColor }) => primaryColor};

            height: 8px;
            width: 8px;
          }

          &:first-of-type {
            // line
            &:before {
              height: auto;
              top: ${({ timelineOffset }) => math(`${timelineOffset} + 2.3em`)};
            }

            // circle
            &:after {
              background-color: ${({ primaryColor }) => primaryColor};
            }
          }

          &:last-of-type {
            // line
            &:before {
              height: 0;
            }
          }
        }
      }
    }
  }
`

export default ArticlesTimeseriesSpaced
