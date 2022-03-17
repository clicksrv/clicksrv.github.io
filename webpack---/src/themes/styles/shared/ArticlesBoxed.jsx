import { css } from 'styled-components'
import { math } from 'polished'

import { greySubtleBluish } from '../../../colors'
import { media } from '../../../components/styled/Grid'

const ArticlesBoxed = css`
  .dated_story {
    .article-headings {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;

      ${media.md`
        flex-wrap: nowrap;
      `}

      h4 {
        width: 100%;

        ${media.md`
          width: 60%;
        `}
      }

      [data-bind='organization_url'] {
        width: 100%;

        ${media.md`
          width: 40%;
        `}
      }

      h5 {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2 + 0.15em`)};

        ${media.md`
          padding-top: 0.3em;
        `}
      }
    }

    .article-body {
      background-color: ${greySubtleBluish};
      border-radius: 8px;

      // don't show empty boxes (relies on .empty class for container in CvPreview)
      .placeholder,
      .mce-content-body:not(:empty) {
        padding: 0.8em 1.1em 0.4em;
      }

      .placeholder {
        padding-bottom: calc(0.4em + 10px);
      }
    }
  }
`

export default ArticlesBoxed
