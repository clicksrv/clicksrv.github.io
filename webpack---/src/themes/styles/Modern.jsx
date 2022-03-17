import { createGlobalStyle } from 'styled-components'
import { darken, desaturate, math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'

import ProfileContactInfo from './shared/ProfileContactInfo'
import ProfileLogo from './shared/ProfileLogo'
import PortfoliosDefault from './shared/PortfoliosDefault'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosDefault}
  ${ProfileContactInfo}
  ${ProfileLogo}

  .cv-container {
    h2,
    h3 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h4 {
      font-weight: bold;
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

    h1 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: normal;
      font-size: 350%;
      color: ${({ primaryColor }) => primaryColor};
      line-height: 120%;

      margin-bottom: 0;
    }

    h2 {
      background-color: ${({ secondaryColor }) => secondaryColor};

      font-size: 175%;
      font-weight: normal;

      padding: 1em ${({ horizontalSpacing }) => horizontalSpacing};
      margin: 0;
    }

    h3 {
      font-size: 150%;
      font-weight: bold;
      text-transform: uppercase;
    }

    h4,
    h5,
    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
    }

    h5 {
      font-weight: normal;
    }

    h6 {
      color: #555;
    }

    .banner {
      display: flex;

      background-color: ${({ backgroundColor }) => backgroundColor};

      padding-left: ${({ horizontalSpacing }) => horizontalSpacing};
      position: relative;


      &:after {
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 12px solid ${({ backgroundColor }) => backgroundColor};
        content: '';
        z-index: 1;
        -webkit-filter: drop-shadow(rgba(0, 0, 0, 0.1) 0 3px 2px);

        position: absolute;
        bottom: -12px;
        left: 70px;

        height: 0;
        width: 0;
      }

      .user-title {
        padding: 1.5em 2em 1.5em 0;
        width: 70%;
      }

      .spacer {
        background-color: ${({ logoUrl, primaryColor }) => (logoUrl ? 'inherit' : primaryColor)};

        width: 30%;
      }
    }

    .column-container {
      display: flex;
      flex-wrap: wrap;

      padding: 0 ${({ horizontalSpacing }) => horizontalSpacing};
    }

    .vcard {
      padding-right: ${({ horizontalSpacing }) => horizontalSpacing};

      article,
      section {
        margin: 0;
      }

      .adr {
        margin: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)} 0;
      }

      .logo {
        float: none;
        padding: 0;
        width: 100%;

        ${media.md`
          padding-top: 1.8em;
        `}

        .css-crop {
          background-position: right;

          padding-bottom: 50px;

          ${media.md`
            background-position: center;

            padding-bottom: 80px;
          `}
        }
      }

      .user-thumb {
        border-radius: 2px;

        height: 160px;
        margin: 0 auto;
        width: 160px;

        ${media.md`
          @media screen and (max-width: 900px) {
            height: 130px;
            width: 130px;
          }
        `}
      }

      .user-contact,
      .user-links {
        li {
          white-space: initial;

          margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3 + 0.5em`)};

          i {
            opacity: 0.75;
          }
        }

        li:before {
          opacity: 0.75;
        }
      }
    }

    .sidebar {
      background-color: ${({ secondaryColor }) => secondaryColor};

      width: 30%;

      .vcard {
        display: block;
        padding-right: 0;
      }

      article,
      [data-bind=add-sidebar-section-btn] {
        padding: 0 2em;
      }

      .add-article {
        margin-left: 2em;
        margin-right: 2em;
      }

      header {
        position: relative;

        margin-bottom: 1.5em;
        width: 100%;

        .header-text {
          background-color: ${({ secondaryColor }) => darken(0.05, desaturate(0.3, secondaryColor))};
          font-weight: bold;
          text-align: left;
          text-transform: uppercase;
          vertical-align: top;

          padding: 1em 1.5em;
        }

        &:after {
          border-color: transparent;
          border-style: solid;
          border-top-color: ${({ secondaryColor }) => darken(0.05, desaturate(0.3, secondaryColor))};
          border-width: 10px 15px 0 15px;
          content: ' ';

          bottom: -10px;
          display: block;
          height: 0;
          left: 19px;
          position: absolute;
          width: 0;
          z-index: 1;
        }
      }
    }

    .main {
      padding: 2rem 2rem 2rem 0;
      width: 70%;

      .vcard {
        display: none;
      }

      header {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
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
          width: 14%;
        `}
      }

      .article-body {
        width: 100%;

        ${media.md`
          width: 85%;
        `}
      }
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};
      position: relative;

      .date-range {
        font-weight: normal;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    .profile {
      margin-bottom: 0;
    }

    .competency {
      .competency-name {
        margin-bottom: 0.3em;
      }
    }

    .portfolio {
      .row {
        margin-left: 0;
        margin-right: 0;
      }

      .col-sm-4 {
        padding-left: 0;
        padding-right: 0;
      }

      .css-crop {
        border: 0;
      }

      label {
        display: none;
      }

      .overlay {
        background-color: rgba(255, 255, 255, 0.9);
        opacity: 0;
        overflow: hidden;
        transition: opacity 0.75s ease;
        z-index: 1;

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: block;
        padding: 2em 1.5em;
        height: 100%;
        width: 100%;
      }

      .asset-title {
        text-align: center;
        font-weight: bold;
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

    @media screen and (max-width: ${md}) {
      h2 {
        margin-left: ${({ horizontalSpacing }) => horizontalSpacing};
        padding-left: 26px;
      }

      .vcard {
        .user-title {
          padding: 1em 26px;

          h1 {
            font-size: 200%;
          }
        }

        .user-thumb {
          margin-left: 0;
        }
      }

      h6.date-range {
        text-align: left;
      }

      .main {
        ${flex('1 0 auto')}

        width: 100%;

        .vcard {
          background-color: ${({ secondaryColor }) => secondaryColor};

          display: block;
          padding: 0 26px 1em;
        }
      }

      .sidebar {
        ${flex('1 0 auto')}

        padding-left: 0;
        width: 100%;

        .vcard {
          display: none;
        }

        header .header-text {
          padding-left: 1.3em;
        }
      }

      .main {
        padding: 0;

        section {
          margin: 30px 26px;
        }
      }

      article {
        margin-top: 15px;
      }
    }
  }

  .pdf {
    .cv-container {
      .vcard {
        .logo {
          padding-top: 0;
        }
      }

      .user-title {
        margin-top: -5px;
        padding-top: 0;
      }

      section:last-of-type article:last-of-type > h2:last-child {
        padding-bottom: 1em !important;
      }
    }
  }
`

export default style
