import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'

import CompetenciesColumns2 from './shared/CompetenciesColumns-2'
import CompetenciesDial from './shared/CompetenciesDial'
import ProfileLogo from './shared/ProfileLogo'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${CompetenciesColumns2}
  ${CompetenciesDial}
  ${ProfileLogo}

  // --- CV Styles --- //
  .cv-container {
    .cv-content {
      padding: 0 5%;
    }

    h2,
    h3,
    h4,
    h5,
    label {
      font-weight: normal;

      margin-top: 0;
      margin-bottom: 0.25em;
    }

    h1,
    h2,
    h3 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1 {
      font-size: 375%;
      font-weight: normal;
      letter-spacing: -2px;
      line-height: 1em;
      text-transform: uppercase;
      word-spacing: 5px;

      margin: 0;

      ${media.sm`
        font-size: 425%;
      `}

      ${media.md`
        font-size: 475%;
      `}
    }

    h2 {
      color: #555;
      font-size: 150%;
    }

    h3 {
      font-size: 200%;
      text-transform: uppercase;
    }

    h4,
    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      font-weight: normal;
    }

    h5 {
      color: ${({ secondaryColor }) => secondaryColor};
    }

    h6 {
      color: #555;
      font-size: 125%;

      margin: 0 0 0.25em;
    }

    .column-container {
      display: flex;
      flex-wrap: wrap;

      -webkit-box-align: stretch;
      box-align: stretch;

      background-color: ${({ primaryColor }) => primaryColor};
      clear: both;

      position: relative;
      height: 100%;

      &:after {
        content: ' ';
        clear: both;
        display: table;
      }

      // Using the faux column technique
      &:before {
        content: ' ';
        display: block;
        position: absolute;
        z-index: 0;
        top: 0;
        width: 71%;
        height: 100%;
        left: 30%;
        background-color: ${({ backgroundColor }) => backgroundColor};
      }
    }

    .sidebar,
    .main {
      position: relative;
    }

    .sidebar {
      background-color: ${({ primaryColor }) => primaryColor};

      padding-left: 0;
      padding-right: 0;
      width: 30%;

      .reference_story {
        h3 {
          color: white;
          font-size: 125%;
        }
      }

      .add-page-break {
        color: white !important;
      }
    }

    .main {
      background-color: ${({ backgroundColor }) => backgroundColor};

      padding-left: 30px;
      width: 70%;
    }

    // We render *two* contact_info sections and show one for regular view and the other for mobile view
    .contact_info {
      display: none;
    }

    .sidebar {
      .contact_info {
        display: block;
      }
    }

    section {
      margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 1.5`)};

      &.profile {
        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.7`)};
      }

      header {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3`)};
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }

      &.vcard {
        margin-bottom: 0;
      }
    }

    .vcard {
      li:before {
        color: white;
        font-family: FontAwesome;
        text-align: center;

        display: inline-block;
        margin-right: 0.25em;
        width: 1.4em;
      }

      li.locality:before {
        content: '\\f041'; // pin
      }

      li.phone:before {
        content: '\\f095'; // phone
      }

      li.email:before {
        content: '\\f003'; // email
      }

      .user-links {
        i {
          margin-right: 0.25em;
          width: 1.4em;
        }
      }

      .logo {
        width: 200px;
      }
    }

    .contact-spacer {
      background-color: ${({ primaryColor }) => primaryColor};

      height: 75px;
      position: relative;
      width: 30%;

      .spacer-stripe {
        border-top: 3px solid ${({ backgroundColor }) => backgroundColor};

        bottom: 0;
        height: 5px;
        position: absolute;
        width: 100%;
      }
    }

    .user-title {
      color: ${({ bodyColor }) => bodyColor};

      padding: 1em 0;
      position: relative;

      .title {
        font-style: italic;
      }
    }

    .sidebar {
      color: white;
      z-index: 1;

      article {
        a,
        [data-bind=email] span span {
          color: white;
        }
      }

      .text-section {
        padding: 15px;
      }

      .user-photo {
        position: relative;

        .user-thumb {
          height: 230px;
          width: 100%;

          ${media.lg`
            height: 270px;
          `}
        }

        .spacer-stripe {
          border-top: 2px solid ${({ primaryColor }) => primaryColor};

          bottom: 0;
          height: 4px;
          position: absolute;
          width: 100%;
        }
      }

      .adr {
        margin-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.2`)};
      }

      .user-contact,
      .user-links {
        padding: 15px 15px 0;

        li {
          color: white;

          margin-bottom: 1em;
        }
      }

      .user-links {
        padding-top: 0;
      }

      section[data-table='text_stories'],
      section[data-table='reference_stories'] {
        article {
          padding: 0 15px;
        }

        .header-text {
          margin-top: 1.5em;
        }
      }

      .margin-top {
        margin-top: 1.5em;
      }

      [data-bind=add-sidebar-section-btn] {
        padding-left: 15px;
        padding-right: 15px;
      }
    }

    .dated_story {
      article {
        display: flex;
        flex-wrap: wrap;
      }

      .article-headings {
        ${flex('none')}

        margin-right: 2%;
        width: 17.5%;
      }

      .article-body {
        ${flex('1 5 80%')}

        max-width: 80%; // fallback for wkhtmltopdf as it doesn't support flex() fully
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

    .skills {
      margin: -${({ articleMargins }) => math(`${articleMargins} * 0.2`)} -12px;

      .competency {
        margin: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)} 12px;

        .competency-dial {
          circle:nth-of-type(2) {
            stroke-width: 20px;
          }

          circle:nth-of-type(3) {
            opacity: 0;
          }
        }

        .competency-name {
          color: #555;
          font-size: 125%;
        }
      }
    }

    // TODO use standard portfolio styling with extension
    .portfolio {
      .row {
        margin: 0 -4px;

        .col-sm-12 {
          padding: 0;
        }

        .col-sm-6,
        .col-sm-4 {
          padding: 4px;
        }
      }

      .asset {
        label {
          min-height: 0.2em;
          text-align: left;
          margin: 0;
        }
      }

      .asset-description {
        display: none;
      }

      .asset-thumb {
        position: relative;
        border: 3px solid ${({ bodyColor }) => bodyColor};
        -webkit-transition: all 0.5s ease;
        transition: all 0.5s ease;

        &:hover {
          .overlay {
            opacity: 1;
          }

          .portfolio-open {
            bottom: 0;
          }
        }

        .overlay {
          background-color: rgba(0, 0, 0, 0.6);
          opacity: 0;
          transition: all 0.5s ease;
          z-index: 1;

          position: absolute;
          left: 0;
          bottom: -1px;

          display: block;
          max-width: 100%;
          padding: 10px;
          width: 150px;
        }

        .css-crop {
          padding-bottom: 100%;
          width: 100%;
        }
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      h1,
      h2 {
        text-align: center;
      }

      .contact-spacer {
        height: 50px;
        width: 100%;
      }

      .user-title {
        white-space: initial;
        width: auto;
      }

      .column-container {
        &:before {
          content: none;
        }
      }

      .contact_info {
        display: block;
      }

      .user-contact,
      .user-links {
        li {
          color: ${({ bodyColor }) => bodyColor};

          i,
          &:before {
            color: ${({ bodyColor }) => bodyColor};
            opacity: 0.5;
          }
        }
      }

      .user-photo {
        background-color: ${({ backgroundColor }) => backgroundColor};
      }

      .user-thumb {
        height: calc(50vw - 70px);
        margin: 0 auto;
        min-height: 180px;
        min-width: 180px;
        width: calc(50vw - 70px);
      }

      .adr {
        line-height: 150%;
        text-align: center;

        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.6`)};
        margin-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.6`)};
      }

      .main {
        ${flex('1 0 auto')}
        order: 0;

        margin-top: 30px;
        padding: 40px 0;
        width: 100%;

        .title-spacer {
          display: none;
        }
      }

      .sidebar {
        ${flex('1 0 auto')}
        order: 1;

        width: 100%;

        .contact_info {
          display: none;
        }
      }

      .dated_story {
        article {
          .article-headings,
          .article-body {
            ${flex('none')}
            width: 100%;
          }
        }
      }
    }
  }

  .pdf {
    .cv-container {
      margin: 0;

      h1 {
        letter-spacing: initial;
      }

      .contact-spacer {
        display: none;
      }

      .column-container {
        background-color: transparent;

        &:after {
          content: none;
        }

        &:before {
          content: none;
        }
      }

      .portfolio {
        .overlay {
          opacity: 1 !important;
        }
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
