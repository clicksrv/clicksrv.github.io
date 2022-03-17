import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { breakpointsPx } from '../../components/styled/Grid'

import PortfoliosDefault from './shared/PortfoliosDefault'
import ProfileLetterhead from './shared/ProfileLetterhead'
import ProfileLogo from './shared/ProfileLogo'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosDefault}
  ${ProfileLetterhead}
  ${ProfileLogo}

  .cv-container {
    .cv-content {
      padding: 4em 7%;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0;
      margin-bottom: 0.25em;
    }

    h1,
    h2,
    h3 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1,
    h4 {
      font-weight: bold;
    }

    h1,
    h2,
    h3,
    h4 {
      color: ${({ primaryColor }) => primaryColor};
    }

    h1 {
      font-size: 250%;
      line-height: 1.25em;

      margin-bottom: 0.2em;
    }

    h2 {
      font-size: 125%;
    }

    h3 {
      font-size: 150%;
      font-weight: normal;
    }

    h4 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
    }

    h5 {
      color: ${({ secondaryColor }) => secondaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      font-weight: normal;
    }

    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
    }

    p {
      margin-bottom: 0.6em;
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      header {
        border-bottom: 1px solid ${({ primaryColor }) => primaryColor};

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5 + 0.2em`)};
        width: 100%;
      }

      .article-headings {
        float: left;
        width: 28%;
      }

      .article-body {
        padding-left: 28%;
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }

      .article-headings.col-sm-3 {
        padding-right: 0;
        width: 21%;
      }

      .article-body.col-sm-9 {
        width: 79%;
      }

      .article-body {
        margin: 0;
      }
    }

    #references {
      .article-body {
        padding-left: 0;
      }
    }

    // Contact Section

    .user-links {
      i {
        opacity: 0.75;
      }
    }

    .user-thumb {
      box-shadow: 1px 1px 3px 0px ${({ subtleColor }) => subtleColor};
      border: 1px solid ${({ primaryColor }) => primaryColor};

      float: left;
      height: 150px;
      margin-right: 1em;
      margin-bottom: 1em;
      width: 150px;
    }

    .competency {
      .competency-name {
        font-weight: bold;
      }

      .article-headings {
        float: left;
        width: 33%;
      }

      .article-body {
        float: right;
        margin-bottom: 0.5em;
        padding-left: 0%;
        width: 65%;
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      .summary-text {
        padding: 0;
      }

      article {
        .article-headings,
        .article-body {
          padding-left: 0;
          width: 100% !important;
        }
      }

      .user-thumb {
        float: none;
        margin: 1em auto;
      }
    }
  }

  .pdf {
    .cv-container {
      .cv-content {
        padding-top: 0;
        padding-bottom: 0;
      }

      .portfolio {
        .css-crop {
          box-shadow: none;
        }
      }
    }
  }
`

export default style
