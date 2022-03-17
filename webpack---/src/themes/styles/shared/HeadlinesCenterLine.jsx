import { css } from 'styled-components'
import { math } from 'polished'

const HeadlinesCenterLine = css`
  .cv-container {
    section {
      header {
        text-align: left;

        position: relative;
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};
        width: 100%;

        .header-text {
          background-color: ${({ backgroundColor }) => backgroundColor};
          vertical-align: middle;

          display: inline;
          margin: 0 2px 0 0;
          padding: 0 0.5em 0 0;
          position: relative;
          z-index: 2;
        }

        &:after {
          border-bottom: 1px solid #dedede;
          content: '';

          display: block;
          left: 0;
          position: absolute;
          right: 0;
          bottom: 47%;
          width: 100%;
          z-index: 0;
        }
      }
    }
  }

  .pdf {
    .cv-container {
      section {
        header {
          // different alignment of the center line so that it matches web
          &:after {
            bottom: 44%;
          }
        }
      }
    }
  }
`

export default HeadlinesCenterLine
