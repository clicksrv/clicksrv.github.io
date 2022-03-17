import { createGlobalStyle } from 'styled-components'
import { lighten, math } from 'polished'

import { breakpointsPx } from '../../components/styled/Grid'

import black20 from '../../assets/images/textures/black20.png'
import diagonalLeft from '../../assets/images/textures/diagonal-left.png'

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

  .vcv-header,
  .vcv-footer {
    display: none !important;
  }

  .vcv-footer time {
    opacity: 0 !important;
  }

  .cv-container {
    margin-bottom: 0;

    .banner {
      background-image: url(${diagonalLeft}), url(${black20}) ${({ bgUrl }) => (bgUrl ? `, url(${bgUrl})` : '')};
      background-color: transparent;
      background-size: 5px, 5px, cover;
      background-repeat: repeat, repeat, no-repeat;
      background-position: center center;
      box-shadow: 0 -50px 100px 20px rgba(0, 0, 0, 0.5) inset;
      color: white;

      padding-top: 175px;
      padding-bottom: 175px;
    }

    h2,
    h3,
    h4,
    h5,
    h6,
    label {
      font-weight: normal;

      margin-top: 0;
      margin-bottom: 0.25em;
    }

    h1,
    h3 {
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
    }

    h3 {
      font-size: 250%;
    }

    h4 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 150%;
    }

    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      font-weight: normal;
    }

    h6 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 225%;
    }

    strong {
      font-weight: bold;
    }

    section[data-table] {
      clear: both;
    }

    article {
      clear: both;
    }

    header {
      font-weight: initial;
      text-align: center;

      margin-top: ${({ sectionMargins }) => sectionMargins};
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};

      .header-text {
        text-transform: uppercase;
        margin: 0;
        text-align: left;
      }
    }

    .content-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 5%;
      width: 100%;

      section {
        &:after {
          content: ' ';
          display: table;
        }
      }

      &.full-width {
        padding: 0;
      }
    }

    .vcard {
      margin: 0 auto;
      text-align: center;
    }

    .user-contact,
    .user-links {
      li {
        color: white;

        a {
          color: white;
        }
      }
    }

    .menu-container {
      background-color: ${({ secondaryColor }) => secondaryColor};
      border-bottom: 1px solid ${({ faintColor }) => faintColor};
    }

    .menu-bar {
      position: relative;
    }

    .menu {
      overflow: hidden;

      ul {
        font-size: 110%;

        height: 52px;
        margin-left: 180px;
      }

      a {
        border-right: 1px solid ${({ faintColor }) => lighten(0.07, faintColor)};
        font-family: ${({ headerFontFamily }) => headerFontFamily};
        font-weight: normal;
        line-height: 150%;

        padding: 15px 25px;
      }
    }

    .user-thumb {
      border: 2px solid black;

      position: absolute;
      bottom: 0;

      height: 180px;
      width: 180px;
    }

    .user-title {
      text-shadow: 0 0 5px black;

      padding: 0;

      h1 {
        & > span {
          border-bottom: 2px solid white;
        }
      }
    }

    // Story sections
    section[data-table='graph_stories'],
    section[data-table='text_stories'] {
      border-left: 1px solid ${({ faintColor }) => faintColor};

      margin-left: 33.33333%;
      padding-left: 50px;
    }

    // Summary Section
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

    section[data-table='graph_stories'] {
      article .article-body {
        padding-bottom: 0;
        min-height: initial;
      }
    }

    // Competencies

    .competency {
      .competency-name {
        color: ${({ bodyColor }) => bodyColor};
        font-size: 150%;
      }
    }

    .user-contact {
      .title {
        padding: 0 5%;
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      .menu-bar {
        .user-thumb {
          bottom: -30px;
          left: calc(5% + 15px);
        }

        .menu {
          display: none;
        }
      }

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
    }
  }

  .pdf {
    .cv-container {
      border-radius: 0;

      margin: 0;

      .banner {
        padding-top: 75px;
        padding-bottom: 75px;
      }

      .menu {
        display: block;

        li {
          display: none;
        }
      }

      .banner {
        box-shadow: none;
      }

      .contact_info > .banner {
        padding: 75px 0;
      }

      .footer.banner {
        display: none;
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
