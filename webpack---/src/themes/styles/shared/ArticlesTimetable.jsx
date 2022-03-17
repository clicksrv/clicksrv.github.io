import { css } from 'styled-components'

const ArticlesTimetable = css`
  .cv-container {
    .timetable-left {
      border-right: 0;

      &.marked:after {
        background-color: ${({ primaryColor }) => primaryColor};
        border-radius: 100%;
        box-shadow: 0 0 0 2px ${({ backgroundColor }) => backgroundColor};
        content: '';
        z-index: 1;

        height: 12px;
        position: absolute;
        right: -6px;
        top: 12px;
        width: 12px;
      }
    }

    .timetable-right {
      border-left: 1px solid #e0e0e0;

      padding-left: 55px;

      &.last {
        padding-bottom: 2em;
      }
    }
  }
`

export default ArticlesTimetable
