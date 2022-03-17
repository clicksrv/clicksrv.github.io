import { createGlobalStyle } from 'styled-components'
import { darken, lighten, math, saturate, transparentize } from 'polished'

import { breakpointsPx, media } from '../../components/styled/Grid'

import black20 from '../../assets/images/textures/black20.png'
import diagonalLeft from '../../assets/images/textures/diagonal-left.png'
import verticalFabricLight from '../../assets/images/textures/vertical_fabric_light.png'

import ArticlesTimetable from './shared/ArticlesTimetable'
import PortfoliosOverlay from './shared/PortfoliosOverlay'
import ProfileDefault from './shared/ProfileDefault'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${ArticlesTimetable}
  ${PortfoliosOverlay}
  ${ProfileDefault}

  .cv-editor .cv-container {
    max-width: 97% !important;
  }

  .cv-container {
    background-color: transparent !important;

    padding: 0;

    .main-content {
      background-color: ${({ secondaryColor }) => secondaryColor};
      background-image: url(${verticalFabricLight});
      background-repeat: repeat;

      padding: 100px 0;

      .content-container {
        background-color: ${({ backgroundColor }) => backgroundColor};
      }
    }

    .content-container {
      margin: 0 auto;
      max-width: 1020px;
      width: 100%;
    }

    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
      margin-bottom: 0.25em;
    }

    h1, h3 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1 {
      color: white;
      font-size: 250%;
      font-weight: normal;

      margin-bottom: 0;
    }

    h2 {
      color: white;
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 150%;
    }

    h3 {
      color: #555;
      font-size: 250%;
      font-weight: bold;
    }

    h4, h5, h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
    }

    h5, h6 {
      color: #555;
      font-weight: normal;
    }

    section[data-table] {
      clear: both
    }

    article {
      clear: both;
    }

    header {
      margin-top: ${({ sectionMargins }) => sectionMargins};
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
    }

    .banner {
      background-image: url(${diagonalLeft}), url(${black20}) ${({ bgUrl }) => (bgUrl ? `, url(${bgUrl})` : '')};
      background-size: 5px, 5px, cover;
      background-repeat: repeat, repeat, no-repeat;
      background-position: center center;
      box-shadow: 0 -50px 100px 20px rgba(0, 0, 0, 0.5) inset;
      color: white;

      min-height: 600px;
      padding-top: 5%;
      position: relative;

      a,
      [data-bind=email] span span,
      .website a {
        color: white;
      }
    }

    .menu {
      overflow: hidden;

      display: none;

      position: absolute;
      bottom: 15px;

      ${media.md`
        display: block;
      `}

      a {
        color: white;
        font-size: 115%;
        border-bottom: 3px solid transparent;
        text-shadow: 0 0 5px black;

        padding: 10px 20px;

        &:hover,
        &:focus {
          background-color: transparent;
          border-bottom-color: ${({ primaryColor }) => primaryColor};
        }
      }
    }

    .banner-overlay {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 2px;

      padding: 30px;
      width: 50%;
    }

    .user-thumb {
      margin-bottom: 1em;
      height: 150px;
      width: 150px;

      .css-crop {
        box-shadow: 0 0 5px -1px black;
      }
    }

    .summary-header {
      display: none;
    }

    .summary-text {
      font-size: 100%;
    }

    .user-mailer {
      padding-bottom: 50px;
    }

    .content-container {
      max-width: 1120px;
      padding: 0 30px;
    }

    section[data-table=graph_stories],
    section[data-table=text_stories] {
      border-left: 1px solid #e0e0e0;

      margin-left: 33.33333%;
      padding-left: 50px;
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

    .competency {
      .competency-name {
        color: ${({ bodyColor }) => bodyColor};
        font-size: 125%;
        font-weight: bold;
      }
    }

    .popup-gallery.timetable-right {
      padding-left: 50px;
      padding-right: 10px;
      padding-bottom: 3em;
    }

    section[data-table=graph_stories] {
      article {
        .article-body {
          min-height: initial;
          padding-bottom: 0;
        }
      }
    }

    .user-contact,
    .user-websites {
      text-align: left;
    }

    .user-websites {
      li {
        margin-right: 0.8em;
      }

      i {
        text-align: left;

        width: 1.3em;
      }
    }

    a,
    [data-bind=email] span span,
    a[data-bind=organization_url] span span,
    a[data-bind=link_url] span span {
      text-decoration: underline;
    }

    .contact_me {
      label,
      input,
      button,
      textarea {
        font-family: ${({ bodyFontFamily }) => bodyFontFamily};
        font-size: ${({ bodyFontSize }) => math(`${bodyFontSize} - 1px`)};
      }

      label {
        color: ${({ bodyColor }) => lighten(0.12, bodyColor)};
      }

      input[type="text"],
      input[type="email"],
      textarea {
        background-color: ${({ secondaryColor }) => transparentize(0.8, lighten(0.5, saturate(0.2, secondaryColor)))};
        border: 1px solid ${({ secondaryColor }) => lighten(0.4, secondaryColor)};
        color: black;

        padding: 12px 14px 11px;

        &:focus, &:active {
          background-color: ${({ secondaryColor }) =>
            transparentize(0.8, lighten(0.6, saturate(0.25, secondaryColor)))};
          border-color: ${({ secondaryColor }) => lighten(0.5, secondaryColor)};
          box-shadow: 0 0 4px ${({ secondaryColor }) => lighten(0.5, saturate(0.3, secondaryColor))};
        }
      }

      button[type="submit"] {
        background-color: ${({ secondaryColor }) => secondaryColor};
        border: 1px solid ${({ secondaryColor }) => darken(0.1, secondaryColor)};
        color: white;
        font-family: ${({ headerFontFamily }) => headerFontFamily};
        font-size: 23px;
        font-weight: bold;
        letter-spacing: 0.7px;

        margin-bottom: 50px;
        padding: 10px 30px;

        &:hover,
        &:focus {
          background-color: ${({ secondaryColor }) => lighten(0.1, secondaryColor)};
          box-shadow: 0 0 4px ${({ secondaryColor }) => lighten(0.5, saturate(0.3, secondaryColor))};
        }

        &[disabled] {
          background-color: ${({ secondaryColor }) => lighten(0.2, secondaryColor)};
          box-shadow: none;
          color: ${({ secondaryColor }) => lighten(0.6, secondaryColor)};
        }
      }
    }

    @media screen and (max-width: ${md}) {
      h1,
      h2 {
        text-align: center;
      }

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

      .banner-overlay {
        width: 100%;
      }

      .user-contact,
      .user-websites {
        text-align: center;
      }

      .user-thumb {
        margin: 1em auto;
        max-width: 150px;
        width: auto;
      }

      .main {
        float: none;
        padding: 30px 0 0 0;
        width: 100% !important;
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
