import { css } from 'styled-components'
import { transparentize } from 'polished'

import { media } from '../../../components/styled/Grid'

const ArticlesTimeseries = css`
  .cv-container {
    .dated_story {
      article {
        margin-bottom: 0;

        // 1px is requried to always have some padding, otherwise lines don't connect
        // calc(articleMargins + 1px) would do the trick, but wkhtmltopdf does not support calc()
        padding-bottom: ${({ articleMargins }) =>
          Number(articleMargins.replace(/[a-z]+/gi, '')) > 0 ? articleMargins : '1px'};

        padding-left: 1.8em;
        position: relative;

        // line
        &:before {
          background-color: ${({ bodyColor }) => transparentize(0.9, bodyColor)};
          content: '';
          height: 100%;
          left: 4px;
          position: absolute;
          top: 0;
          width: 1px;
        }

        // circle
        &:after {
          background-color: ${({ backgroundColor }) => backgroundColor};
          border: 1px solid ${({ bodyColor }) => transparentize(0.75, bodyColor)};
          border-radius: 100%;
          content: '';

          height: 5px;
          left: 1px;
          position: absolute;
          top: ${({ timelineOffset }) => timelineOffset};
          width: 5px;
        }

        &:first-of-type {
          // line
          &:before {
            height: calc(100% - ${({ timelineOffset }) => timelineOffset});
            top: ${({ timelineOffset }) => timelineOffset};
          }

          // circle
          &:after {
            background-color: ${({ bodyColor }) => transparentize(0.5, bodyColor)};
          }
        }

        &:last-of-type {
          padding-bottom: 0;

          // line
          &:before {
            height: ${({ timelineOffset }) => timelineOffset};
          }
        }

        // when just a single <article>
        &:first-of-type:last-of-type {
          // line
          &:before {
            height: 0;
          }
        }
      }
    }

    .sidebar {
      .dated_story {
        article {
          padding-left: 1.4em;

          ${media.md`
            margin-left: 0.2em;
          `}
        }
      }
    }
  }

  .pdf {
    .cv-container {
      .dated_story {
        article:first-of-type {
          // since wkhtmltopdf does not support calc(), which is used in :first-of-type above,
          // hide the overflowing line in a hacky way
          overflow: hidden;
        }
      }
    }
  }
`

export default ArticlesTimeseries
