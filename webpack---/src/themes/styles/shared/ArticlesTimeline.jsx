import { css } from 'styled-components'
import { math } from 'polished'

import { breakpointsPx } from '../../../components/styled/Grid'

const { md } = breakpointsPx

const ArticlesTimeline = css`
  .cv-container {
    .timeline {
      padding: 1px 0 3.5em 0;
      position: relative;

      .timeline-row {
        &:first-child {
          margin-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.4 + 1.5em`)};
        }
      }

      &:before {
        border-right: 1px solid #e5e5e5;
        content: '';

        bottom: 0;
        position: absolute;
        top: 0;
        width: 30%;
      }

      .timeline-left {
        clear: both;
        float: left;
        position: relative;
        width: 30%;

        &.marked:after {
          background-color: ${({ primaryColor }) => primaryColor};
          border-radius: 100%;
          box-shadow: 0 0 0 2px white;
          content: '';

          height: 12px;
          position: absolute;
          right: -6px;
          top: 4px;
          width: 12px;
          z-index: 1;
        }
      }

      .timeline-right {
        padding-left: 33%;
      }

      @media screen and (max-width: ${md}) {
        &:before {
          width: 9px;
        }

        &:after {
          width: 10px;
        }

        .timeline-left {
          float: none;
          padding-left: 10px;
          width: 100%;

          &:after {
            left: 4px;
            top: 65px;
          }
        }

        .timeline-right {
          width: 100%;
        }
      }
    }
  }
`

export default ArticlesTimeline
