import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'

import HeadlinesCenterLine from './shared/HeadlinesCenterLine'
import PortfoliosDefault from './shared/PortfoliosDefault'
import ProfileLetterhead from './shared/ProfileLetterhead'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${HeadlinesCenterLine}
  ${PortfoliosDefault}
  ${ProfileLetterhead}

  .cv-container {
    .cv-content {
      padding: 5em 8.5%;
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
    h3 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1 {
      font-weight: bold;
      font-size: 350%;

      margin-bottom: 0;
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 175%;
      font-weight: normal;
    }

    h3 {
      font-size: 150%;
      font-weight: bold;
    }

    h4,
    h5,
    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      font-weight: normal;
    }

    h5 {
      color: ${({ secondaryColor }) => secondaryColor};
    }

    h6 {
      color: #555;
    }

    .column-container {
      display: flex;
      flex-wrap: wrap;
    }

    .main {
      padding-right: 3%;
      width: 70%;
    }

    .sidebar {
      width: 30%;

      .article-headings,
      .article-body {
        float: none !important;
        width: 100% !important;
      }
    }

    #profile article {
      &:after {
        content: '';
        clear: both;
      }
    }

    article {
      &:after {
        content: none;
        clear: left;
      }
    }

    .user-thumb {
      box-shadow: 1px 1px 3px 0px ${({ subtleColor }) => subtleColor};
      border: 1px solid ${({ primaryColor }) => primaryColor};

      float: right;
      height: 150px;
      width: 150px;
    }

    .user-title {
      ${media.md`
        max-width: calc(100% - 160px);
     `}
    }

    .user-links {
      margin-left: -0.2em;
      margin-top: 0.1em;
    }

    .main.col-sm-8 {
      width: 70%;
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};
      position: relative;

      &.profile {
        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)};
      }

      .date-range {
        float: right;
        font-weight: normal;
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }

      .article-headings.col-sm-3 {
        padding-right: 0;
        width: 20%;
      }

      .article-body.col-sm-9 {
        width: 80%;
      }

      .left-col {
        padding-right: 0;
      }
    }

    .competency {
      .competency-name {
        color: #555;
        font-size: 125%;

        margin-bottom: 0.2em;
      }
    }

    .portfolio {
      .row:after {
        clear: left;
      }
    }

    @media screen and (max-width: ${md}) {
      .cv-content {
        padding: 3em 6%;
      }

      h1 {
        font-size: 250%;
        text-align: center;
      }

      h2 {
        font-size: 150%;
        text-align: center;
      }

      h3 {
        font-size: 125%;
      }

      h6.date-range {
        text-align: left;

        float: none;
      }

      .summary-text {
        padding: 0;
      }

      .main {
        ${flex('1 0 auto')}

        padding: 30px 0 0 0;
        width: 100%;
      }

      .sidebar {
        ${flex('1 0 auto')}

        width: 100%;
      }

      article {
        .article-headings,
        .article-body {
          width: 100% !important;
        }
      }

      .user-thumb {
        float: none;
        margin: 0 auto 1em;
      }
    }
  }

  .pdf {
    .cv-container {
      .cv-content {
        // 1px is so that wkhtmltopdf renders name's top border
        padding: 1px 7% 0;
      }

      // there should be a gap below profile in PDFs
      section.profile + .column-container {
        margin-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)};
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
