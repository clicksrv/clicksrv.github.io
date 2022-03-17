import { createGlobalStyle } from 'styled-components'
import { darken, lighten, math, saturate, transparentize } from 'polished'

import { breakpointsPx } from '../../components/styled/Grid'

import ArticlesTimetable from './shared/ArticlesTimetable'
import PortfoliosDefault from './shared/PortfoliosDefault'
import ProfileContactInfo from './shared/ProfileContactInfo'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${ArticlesTimetable}
  ${PortfoliosDefault}
  ${ProfileContactInfo}

  .vcv-header,
  .vcv-footer {
    display: none !important;
  }

  .vcv-footer time {
    opacity: 0 !important;
  }

  .cv-editor .cv-container {
    max-width: 97% !important;
  }

  .cv-container {
    padding: 0;

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
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1 {
      font-weight: bold;
      font-size: 250%;

      margin-bottom: 0;
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: bold;
      font-size: 150%;
    }

    h3 {
      font-size: 125%;
      font-weight: normal;
      color: #22293b;
      text-transform: uppercase;
      text-align: right;
    }

    h4,
    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      font-weight: normal;
    }

    h4 {
      color: ${({ secondaryColor }) => secondaryColor};
    }

    h4[data-bind='title'] {
      font-size: 100%;
      font-weight: bold;
    }

    h6 {
      color: #555;
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 1rem;
      font-weight: normal;
    }

    section[data-table] {
      clear: both;
    }

    article {
      clear: both;
    }

    .banner {
      background-image: ${({ bgUrl }) => (bgUrl ? `url(${bgUrl})` : 'none')};
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      box-shadow: 0 -50px 100px 20px rgba(0, 0, 0, 0.25) inset;

      min-height: 300px;
      position: relative;
    }

    .banner-overlay {
      background-color: ${({ backgroundColor }) => transparentize(0.15, backgroundColor)};

      bottom: 0;
      float: right;
      height: 100%;
      padding: 3rem 4%;
      right: 0;
      top: 0;
      width: 40%;
    }

    .user-links {
      li {
        margin-bottom: 0.5em;
      }
    }

    .main-content {
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
      background-color: ${({ backgroundColor }) => backgroundColor};
      padding: 5rem 0 0 0;

      // 3rd section is black/inverted
      section:nth-child(3) {
        background-color: ${({ primaryColor }) => primaryColor};
        color: white;

        .timetable-left,
        .timetable-right {
          padding-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.8 + 0.4em`)};
        }

        .timetable-left.marked:after {
          top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.8 + 0.4em`)};
        }

        h3,
        h4,
        h6 {
          color: white;
        }

        .add-article {
          color: white !important;
        }

        .competency-bar {
          background-color: ${({ primaryColor }) => lighten(0.08, primaryColor)};
        }

        .competency-level {
          background-color: ${({ primaryColor }) => lighten(0.25, primaryColor)};
        }

        &.contact_me {
          label {
            color: ${darken(0.15, 'white')};
          }

          input[type='text'],
          input[type='email'],
          button[type='submit'],
          textarea {
            background-color: ${({ primaryColor }) => lighten(0.08, primaryColor)};
            border: 1px solid ${({ primaryColor }) => darken(0.08, primaryColor)};
            color: ${darken(0.02, 'white')};
          }

          input[type='text'],
          input[type='email'],
          textarea {
            &::placeholder {
              color: ${darken(0.15, 'white')};
            }

            &:focus,
            &:active {
              background-color: ${({ primaryColor }) => lighten(0.1, primaryColor)};
              border: 1px solid ${({ primaryColor }) => darken(0.05, primaryColor)};
              box-shadow: 0 0 4px ${transparentize(0.8, 'white')};
            }
          }

          button[type='submit'] {
            color: white;

            &:hover,
            &:focus {
              background-color: ${({ primaryColor }) => lighten(0.12, primaryColor)};
              border: 1px solid ${({ primaryColor }) => darken(0.05, primaryColor)};
              box-shadow: 0 0 4px ${transparentize(0.8, 'white')};
            }

            &[disabled] {
              background-color: ${({ primaryColor }) => primaryColor};
              color: ${darken(0.25, 'white')};
            }
          }
        }
      }

      section:nth-child(4) {
        .timetable-left,
        .timetable-right {
          padding-top: ${({ sectionMargins }) => math(`${sectionMargins} + 0.2em`)};
        }

        .timetable-left.marked:after {
          top: ${({ sectionMargins }) => math(`${sectionMargins} + 0.2em`)};
        }
      }
    }

    .content-container {
      clear: both;
      max-width: 1020px;
      margin: 0 auto;
      width: 100%;

      // clearfix row
      &:after {
        content: ' ';
        display: table;
        clear: both;
      }
    }

    // Sections
    article {
      padding-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        padding-bottom: ${({ sectionMargins }) => sectionMargins};
      }

      .article-headings {
        padding-right: 0;
      }
    }

    .dated_story {
      .article-headings {
        float: left;
        margin-right: 1%;
        width: 16%;
      }

      .article-body {
        float: left;
        min-height: 5em;
        width: 82%;
      }
    }

    // Competencies

    .competency {
      .competency-name {
        color: ${({ secondaryColor }) => secondaryColor};
        font-size: 125%;
      }
    }

    // Contact me

    #profile {
      article {
        padding: 0;
      }
    }

    .user-thumb {
      height: 150px;
      margin-bottom: 1em;
      width: 150px;

      .css-crop {
        box-shadow: 0 0 5px -1px black;
      }
    }

    .portfolio {
      .asset {
        padding-bottom: 10px;
      }

      .css-crop {
        border: 0;
        box-shadow: none;
      }

      label {
        display: none !important;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        padding: 2em 1.5em;
        z-index: 1;
        display: block;
        opacity: 0;
        background-color: rgba(255, 255, 255, 0.9);
        transition: opacity 0.75s ease;
        overflow: hidden;
      }

      .asset-title {
        font-weight: bold;
        text-align: center;
      }

      .asset-thumb {
        color: ${({ bodyColor }) => bodyColor} !important;

        &:hover {
          .overlay {
            opacity: 1;
          }
        }
      }
    }

    .contact_me {
      .input-group {
        margin-bottom: 15px;
      }

      label,
      input,
      button,
      textarea {
        font-family: ${({ bodyFontFamily }) => bodyFontFamily};
        font-size: ${({ bodyFontSize }) => math(`${bodyFontSize} - 2px`)};
      }

      label {
        color: ${({ bodyColor }) => lighten(0.15, bodyColor)};
        font-size: ${({ bodyFontSize }) => math(`${bodyFontSize} - 2px`)};
      }

      input[type='text'],
      input[type='email'],
      textarea {
        background-color: ${({ backgroundColor }) => lighten(0.03, backgroundColor)};
        border: 1px solid ${({ primaryColor }) => primaryColor};

        padding: 10px 13px;

        &:focus,
        &:active {
          background-color: ${({ backgroundColor }) => lighten(0.04, backgroundColor)};
          border-color: ${({ primaryColor }) => lighten(0.15, saturate(0.15, primaryColor))};
          box-shadow: 0 0 4px ${({ primaryColor }) => lighten(0.15, saturate(0.15, primaryColor))};
        }
      }

      button[type='submit'] {
        background-color: ${({ primaryColor }) => primaryColor};
        border: 1px solid ${({ primaryColor }) => darken(0.15, primaryColor)};
        color: white;
        font-size: 16px;
        font-weight: normal;

        margin-top: -10px;
        padding: 10px 20px;

        &:hover,
        &:focus {
          background-color: ${({ primaryColor }) => primaryColor};
          border-color: ${({ primaryColor }) => darken(0.05, primaryColor)};
          box-shadow: 0 0 4px ${({ primaryColor }) => lighten(0.15, saturate(0.15, primaryColor))};
        }

        &[disabled] {
          background-color: ${({ primaryColor }) => lighten(0.1, primaryColor)};
          border-color: ${({ primaryColor }) => primaryColor};
          color: ${({ faintColor }) => faintColor};
        }
      }
    }

    .timetable-left {
      padding-right: 4%;
    }

    .timetable-right {
      padding-left: 4%;
      min-height: 75px;
    }

    .timetable-left.marked {
      &:after {
        top: 2px;
        width: 10px;
        height: 10px;
        right: -5px;
        background-color: ${({ subtleColor }) => subtleColor};
      }
    }

    section {
      article,
      header {
        margin-top: -7px;
      }

      .date-range {
        padding-top: 0.33rem;
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //

    @media screen and (max-width: ${md}) {
      section[data-table='text_stories'],
      section[data-table='graph_stories'] {
        margin-left: 0;
        width: 100% !important;
      }

      .timetable-right,
      section[data-table='text_stories'],
      section[data-table='graph_stories'] {
        border-left: none;

        padding-left: 15px;

        &.popup-gallery {
          padding-left: 10px;
        }
      }

      img.holder {
        display: none;
      }

      .banner-overlay {
        width: 100%;
      }

      .vcard {
        text-align: center;
      }

      .user-thumb {
        height: 200px;
        margin: 1em auto;
        width: 200px;
      }

      .user-contact {
        text-align: center;
      }

      .main {
        float: none;
        width: 100% !important;
        padding: 30px 0 0;
      }

      .sidebar {
        float: none;
        width: 100% !important;
      }

      article {
        .article-headings,
        .article-body {
          width: 100% !important;
        }
      }
    }
  }
`

export default style
