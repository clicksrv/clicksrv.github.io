import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { breakpointsPx } from '../../components/styled/Grid'

import ProfileBar from './shared/ProfileBar'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${ProfileBar}

  .cv-container {
    .cv-content {
      padding: 4em 8.5%;
    }

    h1,
    h3,
    h4 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1,
    h2,
    h3,
    h4 {
      margin-top: 0;
      margin-bottom: 0.25em;
    }

    h1 {
      color: ${({ primaryColor }) => primaryColor};
      font-size: 250%;
      line-height: 100%;
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      font-weight: normal;
    }

    h3 {
      font-size: 150%;
      font-weight: normal;
      color: ${({ primaryColor }) => primaryColor};
    }

    h4 {
      font-size: 110%;
      font-weight: bold;
      margin-top: 0.3em;
      margin-bottom: 0.3em;
    }

    h5,
    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      margin-top: 0.6em;
      margin-bottom: 0.6em;
    }

    label {
      font-weight: bold;
    }

    p {
      margin-bottom: 0.6em;
    }

    .col-sm-9 .glyphicon {
      font-size: 85%;
      padding-top: 2px;
      width: 25px;
      text-align: left;
      vertical-align: top;
      padding-top: 2px;
    }

    .vcard {
      border-bottom: 1px solid ${({ faintColor }) => faintColor};

      .col-sm-2 {
        padding-right: 0;
      }
    }

    .user-thumb {
      border: 1px solid ${({ primaryColor }) => primaryColor};
      border-radius: 50%;
      box-shadow: 1px 1px 3px 0 ${({ subtleColor }) => subtleColor};

      margin-left: 1em;
      padding: 4px;

      height: 80px;
      width: 80px;
    }

    .css-crop,
    .image-placeholder {
      border-radius: 50%;
    }

    .user-contact {
      li:before {
        color: black;
      }
    }

    #summary {
      margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)};

      header {
        display: none;
      }

      article {
        border-bottom: 1px solid ${({ faintColor }) => faintColor};
        font-size: 120%;
        font-weight: normal;
        text-align: center;

        padding: 0 1.5em ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)};

        .header-text {
          display: none;
        }

        .mce-content-body {
          p:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    #references {
      .ribbon {
        display: none;
      }
    }

    section {
      clear: both;
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      &.profile {
        margin-top: 0;
        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)};
      }

      &.dated_story {
        .article-body {
          h4 {
            color: ${({ secondaryColor }) => secondaryColor};
          }
        }
      }

      &.strengths {
        // Allow for two rows of skills
        padding-left: 28%;

        .article-body,
        .header-text,
        .add-article {
          padding-left: initial;
          margin-left: initial;
        }

        .competency {
          float: left;
          margin-top: 0.8em;
          width: 48%;

          &:nth-of-type(odd) {
            margin-right: 4%;
          }

          &:nth-of-type(1),
          &:nth-of-type(2) {
            margin-top: 0;
          }
        }
      }

      header {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
      }

      .date-range {
        font-weight: normal;
        text-align: center;
      }

      .header-text,
      .add-article {
        margin-left: 28%;
      }

      .article-headings {
        float: left;
        margin-right: 3%;
        width: 25%;
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
    }

    .ribbon {
      position: relative;
      border: 1px solid ${({ primaryColor }) => primaryColor};
      color: ${({ primaryColor }) => primaryColor};
      border-radius: 3px 1px 1px 0;
      padding: 5px;
      text-align: center;
      box-shadow: 1px 1px 3px 0 ${({ subtleColor }) => subtleColor};

      a {
        color: ${({ linkColor }) => linkColor};
      }

      h4 {
        margin: 0;
      }

      &:before {
        content: '';
        left: -2px;
        bottom: -0.5em;
        border-width: 0.5em 0 0 0.75em;
        border-color: ${({ primaryColor }) => primaryColor} transparent transparent transparent;
        position: absolute;
        display: block;
        border-style: solid;
      }
    }

    // Portfolio Section
    .portfolio {
      .asset-row {
        margin-left: -5px;
        margin-right: -5px;
      }

      .asset {
        padding-left: 5px;
        padding-right: 5px;

        .asset-description {
          display: none;
        }

        label {
          min-height: 0.8em;
        }
      }

      .css-crop {
        border: 2px solid ${({ primaryColor }) => primaryColor};
        border-radius: 0 25px 0 25px;
        box-shadow: 1px 1px 3px 0 ${({ subtleColor }) => subtleColor};

        padding-bottom: 75%;
        width: 100%;
      }

      a label {
        cursor: pointer;
      }
    }

    .competency {
      .competency-bar,
      .competency-level {
        border-radius: 3px;
      }

      .competency-name {
        font-weight: bold;

        margin-bottom: 0.2em;
      }

      &:nth-of-type(2n + 1) {
        clear: both;
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      #summary {
        article {
          padding-left: 0;
          padding-right: 0;
        }
      }

      section {
        .date-range {
          text-align: left;
          color: ${({ subtleColor }) => subtleColor};
        }
      }

      section {
        padding-left: initial !important;

        .article-body {
          padding-left: initial;
        }

        .header-text,
        .add-article {
          margin-left: initial;
        }
      }

      article {
        .article-headings,
        .article-body {
          width: 100% !important;
        }
      }

      .user-thumb {
        height: calc(50vw - 70px);
        margin: 15px auto;
        min-height: 180px;
        min-width: 180px;
        width: calc(50vw - 70px);
      }

      .user-contact,
      .user-links {
        text-align: center;
        line-height: 150%;

        padding: 0;
        margin: 0;
      }
    }
  }

  .pdf {
    .cv-container {
      .cv-content {
        padding-top: 0;
        padding-bottom: 0;
      }

      .vcard {
        padding-top: 2px; // so that wkhtmltopdf doesn't crop the circle at the top
      }
    }
  }
`

export default style
