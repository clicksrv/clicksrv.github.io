import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx } from '../../components/styled/Grid'

import PortfoliosDefault from './shared/PortfoliosDefault'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosDefault}

  .cv-container {
    line-height: 1.65;

    .cv-content {
      margin: 0;
      padding: 3em 0;
      position: relative;
    }

    h2,
    h3,
    h4,
    h5,
    h6,
    label {
      font-weight: bold;

      margin-top: 0;
      margin-bottom: 0.2em;
    }

    h1,
    h3 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1 {
      font-size: 200%;
      font-weight: bold;
      line-height: 1.4;
      text-align: center;
      text-transform: uppercase;

      margin: 0;
    }

    h2 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      font-weight: bold;
      line-height: 1.4;
      text-align: center;
      text-transform: uppercase;

      margin: 0;
    }

    h3 {
      color: ${({ primaryColor }) => primaryColor};
      font-weight: bold;
      font-size: 125%;
      text-transform: uppercase;
    }

    h4,
    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      font-weight: bold;
    }

    h4 {
      color: ${({ secondaryColor }) => secondaryColor};
    }

    h5 {
      color: ${({ primaryColor }) => primaryColor};

      margin: 0;
    }

    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      color: black;
      font-size: 125%;
    }

    p {
      font-weight: normal;
    }

    section {
      clear: both;

      margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 1.5`)};

      header {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
      }
    }

    #profile {
      margin-bottom: 0;
    }

    [data-bind='organization'] {
      font-weight: bold;
    }

    .column-container {
      display: flex;
      flex-wrap: wrap;
    }

    .main {
      padding: 1.5em 4% 2em 2%;
      width: 67%;

      .vcard {
        display: none;
      }
    }

    .sidebar {
      padding: 0 2% 0 4%;
      width: 33%;

      .vcard {
        display: block;
      }
    }

    .user-contact li,
    .user-links li {
      margin-bottom: 0.25em;
      text-align: center;

      i {
        display: none;
      }
    }

    .user-title {
      padding: 30px 0 20px;
    }

    .user-thumb {
      border: 2px solid black;
      border-radius: 100%;

      height: 140px;
      margin: 0 auto;
      width: 140px;

      .css-crop,
      .image-placeholder {
        border-radius: 50%;
      }
    }

    article.contact_info {
      margin-bottom: 2em;
    }

    .margin-top {
      margin-top: 1.5em;
    }

    .block-separator {
      display: block;
      text-align: center;

      &:after {
        background-color: black;
        content: '';

        display: inline-block;
        height: 2px;
        margin: 2.5em auto;
        width: 25px;
      }
    }

    .vcard {
      display: flex;

      margin-bottom: 0;

      ul.user-contact li:before {
        font-family: FontAwesome;

        display: inline-block;
        margin-right: 0.25em;
        width: 1em;
      }
    }

    article {
      clear: both;

      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 1.5`)};

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        margin-bottom: 0.5em;
      }
    }

    .dated_story {
      .article-headings {
        float: right;
      }

      &#references {
        .article-headings {
          display: none;
        }

        .article-body {
          width: 100%;
        }
      }
    }

    .competency {
      .competency-name {
        font-size: 125%;
        font-weight: bold;
      }

      .competency-bar {
        border-radius: 12px;

        margin: 1em 0;
      }

      .competency-level {
        border-radius: 12px;
      }

      &:nth-child(2n + 1) {
        clear: both;
      }
    }

    .portfolio {
      label {
        font-weight: initial;
      }

      .css-crop {
        border: none;
        box-shadow: none;

        padding-bottom: 75%;
        width: 100%;
      }

      .asset {
        padding-left: 5px;
        padding-right: 5px;
      }
    }

    .sidebar {
      text-align: center;
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      .cv-content {
        padding: 0;
      }

      .main {
        ${flex('1 0 auto')}
        order: 0;

        padding: 2em 5% 0;
        width: 100%;

        .vcard {
          display: block;
        }
      }

      .sidebar {
        ${flex('1 0 auto')}
        order: 1;

        padding: 1em 5% 0;
        width: 100%;

        .vcard {
          display: none;
        }
      }

      article {
        .article-headings,
        .article-body {
          width: 100% !important;
        }
      }
    }
  }

  .pdf {
    .cv-container {
      margin: 0;

      .cv-content {
        padding-top: 1px; // required so that wkhtmltopdf won't cut off Avatar's rounded border
      }

      .header-text:after {
        // wkhtmltopdf fix for unnecessary line breaks
        content: '\\00a0';

        padding-right: 0;
      }

      .main {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }

  @page {
    margin: 1.2cm;
  }

  @page :first {
    margin-top: 0cm;
  }
`

export default style
