import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'
import { greyDarker } from '../../colors'

import diagonalThin from '../../assets/images/textures/diagonal_thin.png'

import PortfoliosDefault from './shared/PortfoliosDefault'
import ProfileBar from './shared/ProfileBar'
import ProfileLogo from './shared/ProfileLogo'

const { sm, md } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosDefault}
  ${ProfileBar}
  ${ProfileLogo}

  .cv-container {
    .cv-content {
      padding: 20px 0;
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
      font-weight: bold;
      font-size: 300%;
      line-height: 100%;

      margin-bottom: 5px;
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
    h6 {
      font-size: 125%;
      font-weight: normal;
    }

    h4 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
    }

    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 105%;
      font-weight: normal;
    }

    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      color: #555;
    }

    .profile {
      margin-bottom: 0;
    }

    .banner {
      color: white;
      padding: 15px 20px;
      margin: 0 20px;
      background-color: ${({ primaryColor }) => primaryColor};
      background-image: url(${diagonalThin});
      background-repeat: repeat;
    }

    .header-bar {
      display: none;
      margin: 0 15px;

      ${media.sm`
        display: block;
      `}

      ${media.md`
        margin-left: 20px;
        margin-right: 20px;
      `}

      .menu {
        background-color: black;
        overflow: hidden;

        height: 37px;

        ul {
          height: 100%;
        }

        a {
          border-right: 1px solid ${greyDarker};
          color: white;

          padding-top: 9px;
          padding-bottom: 8px;
        }
      }
    }

    .vcard {
      padding: 0;
    }

    .user-thumb {
      border-radius: 2px;

      margin: 4px 1.5em 4px 4px;
      height: 110px;
      width: 110px;
    }

    .logo {
      float: none;
    }

    .user-contact {
      line-height: 130%;

      li:before {
        opacity: 1;
      }

      i,
      a,
      [data-bind=email] span span {
        color: white;
      }
    }

    .column-container {
      display: flex;
      flex-wrap: wrap;

      margin: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5 + 0.5em`)} 0;
    }

    .sidebar {
      padding: 0 20px;
      width: 32%;
      z-index: 1;
    }

    .main {
      width: 68%;

      section {
        background-color: ${({ secondaryColor }) => secondaryColor};
        border: 1px solid ${({ subtleColor }) => subtleColor};
        border-radius: 3px;
        margin-right: 20px;
        padding: 20px;
      }
    }

    section {
      position: relative;
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      .date-range {
        text-align: right;
        font-weight: normal;
      }

      header {
        width: 100%;
        position: relative;
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.7`)};

        .header-text {
          padding: 6px;
          padding-left: 20px;
          background-color: ${({ primaryColor }) => primaryColor};
          color: white;
          text-align: left;
          vertical-align: top;
        }

        &:after {
          content: ' ';
          display: block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
          border-width: 6px 8px 0 8px;
          border-top-color: ${({ primaryColor }) => primaryColor};
          position: absolute;
          bottom: -6px;
          left: 12px;
          z-index: 1;
        }
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    h6 {
      float: right;
    }

    .article-headings.col-sm-3 {
      width: 20%;
      padding-right: 0;
    }

    .article-body.col-sm-9 {
      width: 80%;
    }

    .left-col {
      padding-right: 0;
    }

    // Summary Section
    .summary-header {
      display: none;
    }

    .summary-text {
      font-size: 100%;
    }

    .competency {
      display: flex;

      .article-headings {
        ${flex('1 1 auto')}

        margin-right: 10px;
        width: 30%;
      }

      .article-body {
        ${flex('1 1 auto')}

        margin-right: 12px;
        width: 70%;

        .mce-content-body {
          p {
            margin: 0;
            min-height: auto;
          }
        }
      }

      .competency-name {
        color: #555;
        font-size: 105%;

        float: none;
      }

      .placeholder,
      .mce-content-body {
        font-size: 87.5%;
      }
    }

    @media screen and (max-width: ${md}) {
      .banner {
        margin: 0 15px;
      }

      .user-thumb {
        margin: 15px auto;
      }

      .user-contact,
      .user-title {
        text-align: center;
        padding: 0;
      }

      .user-title {
        margin-top: 1em;
      }

      .logo {
        display: none;
      }

      h6.date-range {
        text-align: left;
        float: none;
      }

      .column-container {
        margin: 0;
      }

      .main {
        ${flex('1 0 auto')}
        order: 0;

        padding-top: 20px;
        width: 100%;

        section {
          margin-left: 15px;
          margin-right: 15px;
        }
      }

      .sidebar {
        ${flex('1 0 auto')}
        order: 1;

        padding: 0 15px;
        width: 100%;
      }

      article {
        .article-headings,
        .article-body {
          width: 100% !important;
        }

        &.competency {
          .article-headings {
            width: 30% !important;
          }

          .article-body {
            width: 70% !important;
          }
        }
      }
    }

    @media screen and (max-width: ${sm}) {
      article.competency {
        flex-wrap: wrap;
      }
    }
  }

  .pdf {
    .cv-container {
      .cv-content {
        padding: 0 10px;
      }

      .column-container {
        margin-bottom: 0;
      }

      section:last-of-type article:last-of-type > *:last-child {
        margin-bottom: 1em !important;

        &.user-contact {
          margin-bottom: 0 !important;
        }
      }

      section:last-of-type {
        padding-bottom: 20px !important
      }

      #profile {
        padding-bottom: 0 !important;
      }
    }
  }
`

export default style
