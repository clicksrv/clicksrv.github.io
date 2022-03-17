import { createGlobalStyle } from 'styled-components'
import { darken, math, transparentize } from 'polished'

import { breakpointsPx } from '../../components/styled/Grid'

import diagonalLeft from '../../assets/images/textures/diagonal-left.png'

import ArticlesTimetable from './shared/ArticlesTimetable'
import PortfoliosOverlay from './shared/PortfoliosOverlay'
import ProfileDefault from './shared/ProfileDefault'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${ArticlesTimetable}
  ${PortfoliosOverlay}
  ${ProfileDefault}

  .cv-editor {
    .cv-container {
      max-width: 97% !important;
    }
  }

  .cv-container {
    background-image: url(${diagonalLeft}),
      linear-gradient(90deg, ${({ backgroundColor }) => transparentize(0.8, backgroundColor)}, ${({
  backgroundColor,
}) => transparentize(0.8, backgroundColor)})
      ${({ bgUrl }) => (bgUrl ? `, url(${bgUrl})` : '')};
    background-color: transparent !important;
    background-size: 5px, 5px, cover;
    background-repeat: repeat, repeat, no-repeat;
    background-position: center center;
    background-attachment: fixed;

    margin-bottom: 0;
    padding-bottom: 100px;

    h2, h3, h4, h5, h6, label {
      font-weight: normal;

      margin-top: 0;
      margin-bottom: 0.4em;
    }

    h1, h3, h6 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1 {
      font-size: 325%;
      font-weight: normal;
      line-height: 75px;
      text-transform: uppercase;

      margin: 0 0 0.25em;
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 150%;
      font-style: italic;

      margin-top: 0;
    }

    h3 {
      font-size: 250%;
    }

    h4 {
      color: ${({ secondaryColor }) => secondaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 150%;
    }

    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: normal;
      font-size: 125%;
    }

    h6 {
      font-size: 225%;
    }

    section[data-table] {
      clear: both;

      transition: opacity 0.75s ease;
    }

    article {
      clear: both; // Prevents edit buttons from floating in the wrong place
    }

    header {
      font-weight: initial;
      text-align: center;

      margin-top: ${({ sectionMargins }) => sectionMargins};
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};

      .header-text {
        text-align: left;
        text-transform: uppercase;

        margin: 0;
      }
    }
    .content-container {
      background-color: ${({ backgroundColor }) => transparentize(0.5, backgroundColor)};

      margin: 0 auto;
      max-width: 1200px;
      padding: 0 6%;
      width: auto;

      section:after {
        content: " ";
        display: table;
      }

      &.full-width {
        padding: 0;
      }
    }

    .vcard {
      text-align: center;

      margin: 0 auto;
      max-width: 960px;
      padding: 100px 0 50px;
    }

    .user-title {
      text-shadow: 0 0 5px black;

      padding: 0;

      h1 {
        border-bottom: 2px solid ${({ bodyColor }) => bodyColor};
        display: inline-block;
      }
    }

    .user-thumb {
      border: 5px solid ${({ backgroundColor }) => transparentize(0.7, backgroundColor)};
      border-radius: 50%;

      height: 150px;
      margin-left: auto;
      margin-right: auto;
      width: 150px;

      .css-crop,
      .image-placeholder {
        border-radius: 50%;
      }
    }

    .summary-header {
      text-align: center;
    }

    .summary-text {
      font-size: 125%;
      font-weight: normal;

      margin-top: 0;
    }

    article {
      .article-headings {
        padding-right: 0;
      }

      .article-body {
        min-height: 7em;
        padding-bottom: ${({ articleMargins }) => articleMargins};
      }

      &:last-child {
        .article-body {
          padding-bottom: ${({ sectionMargins }) => sectionMargins};
        }
      }

      &.competency {
        .article-body {
          min-height: initial;
        }
      }
    }

    .popup-gallery.timetable-right {
      padding-left: 50px;
      padding-right: 10px;
      padding-bottom: 3em;
    }

    section[data-table=graph_stories], section[data-table=text_stories] {
      margin-left: 33.33333%;
      border-left: 1px solid ${({ bodyColor }) => bodyColor};
      padding-left: 50px;
    }

    section[data-table=graph_stories] {
      article .article-body {
        padding-bottom: 0;
        min-height: initial;
      }
    }

    .user-contact {
      .title {
        padding: 0 5%;
      }
    }

    .timetable-left.marked:after {
      box-shadow: 0 0 0 2px ${({ bodyColor }) => bodyColor};
    }

    // Competencies

    .competency {
      .competency-name {
        color: ${({ secondaryColor }) => secondaryColor};
        font-size: 150%;
      }

      .competency-bar {
        background-color: rgba(0, 0, 0, 0.3);
      }

      .competency-level {
        background-color: ${({ secondaryColor }) => secondaryColor};
      }
    }

    // Contact me

    .contact_me {
      label,
      input,
      button,
      textarea {
        font-family: ${({ bodyFontFamily }) => bodyFontFamily};
        font-size: ${({ bodyFontSize }) => bodyFontSize};
      }

      label {
        color: ${({ bodyColor }) => darken(0.15, bodyColor)};
        font-size: ${({ bodyFontSize }) => math(`${bodyFontSize} - 1px`)};
      }

      input[type="text"],
      input[type="email"],
      textarea,
      button[type="submit"] {
        background-color: rgba(0, 0, 0, 0.3);
        border: 1px solid #555;
        color: ${({ bodyColor }) => bodyColor};

        padding: 12px 14px 11px;
      }

      input[type="text"],
      input[type="email"],
      textarea {
        &:focus, &:active {
          border-color: ${({ bodyColor }) => transparentize(0.6, bodyColor)};
          box-shadow: 0 0 4px ${({ bodyColor }) => transparentize(0.7, bodyColor)};
        }

        &::placeholder {
          color: ${({ bodyColor }) => darken(0.4, bodyColor)};
        }
      }

      button[type="submit"] {
        font-family: ${({ headerFontFamily }) => headerFontFamily};
        font-size: 23px;
        font-weight: normal;
        padding: 10px 30px;
        letter-spacing: 0.7px;

        margin-bottom: 90px;

        &:hover,
        &:focus {
          background-color: rgba(0, 0, 0, 0.4);
          border-color: ${({ bodyColor }) => transparentize(0.6, bodyColor)};
          box-shadow: 0 0 4px ${({ bodyColor }) => transparentize(0.7, bodyColor)};
        }

        &[disabled] {
          color: ${({ bodyColor }) => darken(0.4, bodyColor)};

          &:hover, &:focus {
            border-color: #555;
            box-shadow: none;
          }
        }
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      section[data-table=text_stories],
      section[data-table=graph_stories] {
        margin-left: 0;
        width: 100% !important;
      }

      .timetable-right,
      section[data-table=text_stories],
      section[data-table=graph_stories] {
        border-left: none;
        padding-left: 15px;

        &.popup-gallery {
          padding-left: 10px;
        }
      }

      img.holder {
        display: none;
      }
    }
  }
`

export default style
