import { createGlobalStyle } from 'styled-components'
import { math, transparentize } from 'polished'

import { breakpointsPx, media } from '../../components/styled/Grid'

import PortfoliosDefault from './shared/PortfoliosDefault'
import ProfileDefault from './shared/ProfileDefault'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosDefault}
  ${ProfileDefault}

  .cv-container {
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: normal;

      margin-top: 0;
      margin-bottom: 0.25em;
    }

    h1,
    h2,
    h3 {
      text-align: center;
    }

    h1 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 250%;
      font-weight: normal;
      line-height: 1.15em;
      text-transform: uppercase;

      margin: 0;
    }

    h2,
    h3 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 150%;
    }

    h4,
    h5,
    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 115%;

      margin: 0 0 5px 0;
    }

    h5 {
      color: ${({ secondaryColor }) => secondaryColor};
      font-style: italic;
    }

    h6 {
      color: #444;

      margin-bottom: 20px;
    }

    p {
      margin-bottom: 0.6em;
      margin-top: 0;
    }

    .cv-content {
      padding: 5em 8%;
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      &.profile {
        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.75`)};
      }

      header {
        text-align: center;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
        width: 100%;

        .header-text {
          background-color: ${({ backgroundColor }) => backgroundColor};
          text-align: center;
          vertical-align: middle;

          display: inline-block;
          margin: 0;
          padding: 0 0.75em;
          position: relative;
          z-index: 1;

          span {
            white-space: nowrap;
          }
        }

        &:after {
          border-bottom: 1px solid ${({ primaryColor }) => transparentize(0.7, primaryColor)};
          content: '';

          display: block;
          left: 0;
          position: absolute;
          right: 0;
          top: 1em;
          width: 100%;
          z-index: 0;
        }
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    .dated_story {
      article {
        display: flex;
        flex-wrap: wrap;
      }

      .article-headings {
        margin-right: 1%;
        width: 100%;

        ${media.md`
          width: 21%;
        `}
      }

      .article-body {
        margin: 0;
        width: 100%;

        ${media.md`
          width: 78%;
        `}
      }
    }

    .vcard {
      margin-bottom: 0;
      margin-top: 0;
    }

    .user-contact {
      padding-top: 0.5em;
    }

    .user-thumb {
      border-radius: 50%;
      box-shadow: 1px 1px 3px 0 ${({ subtleColor }) => subtleColor};

      height: 80px;
      margin: 1em auto;
      width: 80px;

      .css-crop,
      .image-placeholder {
        border-radius: 50%;
      }
    }

    .user-title {
      border-top: 1px solid ${({ primaryColor }) => primaryColor};
      border-bottom: 3px solid ${({ primaryColor }) => primaryColor};
      text-align: center;

      padding: 1em 0 0.85em;
    }

    #summary {
      article {
        font-size: 115%;
        text-align: center;

        padding: 0 1.5em;
      }
    }

    #references {
      .article-body {
        padding-left: 0;
      }
    }

    // displays skills in two columns
    .skills {
      margin: -${({ articleMargins }) => math(`${articleMargins} * 0.25`)} -20px -${({ articleMargins }) =>
  math(`${articleMargins} * 0.5`)};

      .competency {
        vertical-align: top;

        // necessary so that wkhtmltopdf wraps them as it doesn't support 'flex-wrap: wrap'
        display: inline-block;
        margin: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)} 20px;
        max-width: 43%;
        width: 43%;

        h6 {
          font-size: 115%;
        }

        .placeholder,
        .mce-content-body {
          font-size: 100%;
        }
      }
    }

    @media screen and (max-width: ${md}) {
      .cv-content {
        padding: 3em 6%;
      }

      h1 {
        font-size: 200%;
      }

      #summary article {
        padding: 0;
      }

      .skills {
        .competency {
          width: 100%;
        }
      }
    }
  }

  .pdf {
    .cv-container {
      .cv-content {
        // 1px is so that wkhtmltopdf renders name's top border
        padding: 1px 7% 0;
      }

      .skills {
        .competency {
          // wkhtmltopdf needs this
          vertical-align: top;

          max-width: 45%;
          width: 45%;
        }
      }
    }
  }
`

export default style
