import { createGlobalStyle } from 'styled-components'
import { math, transparentize } from 'polished'

import PortfoliosDefault from './shared/PortfoliosDefault'

const style = createGlobalStyle`
  ${PortfoliosDefault}

  .cv-container {
    line-height: 1.5;

    .cv-content {
      padding: 0 5%;
    }

    h1,
    h2,
    h3 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h2,
    h3,
    h4,
    h5,
    h6,
    label {
      font-weight: bold;

      margin-bottom: 0.2em;
      margin-top: 0;
    }

    h1 {
      color: ${({ primaryColor }) => primaryColor};
      font-size: 200%;
      font-weight: bold;
      line-height: 1.4;
      text-align: center;

      margin: 0;
    }

    h2 {
      color: ${({ primaryColor }) => primaryColor};
      font-size: 125%;
      font-weight: normal;
      line-height: 1.4;
      text-align: center;

      margin: 0;
    }

    h3 {
      color: ${({ primaryColor }) => primaryColor};
      font-weight: normal;
      font-size: 125%;

      margin-bottom: 1.5em;
    }

    h4,
    h5,
    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: bold;
      font-size: 110%;
    }

    h4 {
      color: ${({ secondaryColor }) => secondaryColor};
      font-weight: bold;
      font-size: 100%;
      line-height: 230%;

      margin-bottom: 0;
    }

    h5 {
      color: ${({ primaryColor }) => primaryColor};
      display: inline;

      margin: 0;
    }

    h6 {
      color: ${({ primaryColor }) => primaryColor};
    }

    section {
      clear: both;

      margin-bottom: ${({ sectionMargins }) => sectionMargins};
    }

    #profile {
      border-bottom: 1px solid ${({ primaryColor }) => primaryColor};
      text-align: center;

      padding-bottom: 1px;

      .vcard {
        border-bottom: 4px solid ${({ primaryColor }) => primaryColor};

        margin-bottom: 0;
        padding-bottom: 1.5em;
      }

      .user-contact, .user-links {
        display: inline-block;
        margin-top: 1em;

        li {
          border-left: 1px solid ${({ primaryColor }) => primaryColor};
          white-space: nowrap;

          display: inline-block;
          margin-left: 1em;
          padding-left: 1em;
        }

        i {
          display: none;
        }
      }

      .user-contact li:first-child {
        border-left: none;

        margin-left: 0;
        padding-left: 0;
      }
    }

    .user-thumb {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2`)};
      height: 100px;
      width: 100px;
    }

    #summary {
      header {
        border-bottom: none;
        padding-bottom: 0;

        .header-text {
          border-bottom: 0;
          text-align: center;
        }
      }
    }

    header {
      border-bottom: 2px solid ${({ primaryColor }) => primaryColor};

      padding-bottom: 2px;

      .header-text {
        border-bottom: 4px solid ${({ primaryColor }) => primaryColor};

        margin-bottom: 0;
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
      padding-top: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};

      &:last-child {
        margin-bottom: 0;
      }
    }

    .date-range {
      text-align: right;

      float: right;
      width: 350px;
    }

    .dated_story {
      header + article {
        border-top: none;
      }

      article {
        border-top: 1px solid ${({ primaryColor }) => primaryColor};
      }
    }

    .competency {
      // properly alignes articles
      vertical-align: top;

      display: inline-block;
      width: 50%;

      &:nth-of-type(2n+1) {
        padding-right: 3%;
      }

      .competency-name {
        font-size: 110%;
        font-weight: bold;
      }

      .competency-bar {
        background-color: ${({ primaryColor }) => transparentize(0.9, primaryColor)};

        margin: 1em 0;
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
  }

  .cv-editor {
    .add-article {
      margin-top: 1em;
    }
  }

  .pdf {
    .cv-container {
      margin: 0;

      .cv-content {
        padding-top: 1px;
      }

      .header-text:after {
        // wkhtmltopdf fix for unnecessary line breaks
        content: '\\00a0';

        padding-right: 0;
      }

      .main {
        padding: 0 3%;
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
