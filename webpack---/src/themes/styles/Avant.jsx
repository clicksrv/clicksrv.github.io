import { createGlobalStyle } from 'styled-components'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'

import HeadlinesCenterLine from './shared/HeadlinesCenterLine'
import PortfoliosDefault from './shared/PortfoliosDefault'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${HeadlinesCenterLine}
  ${PortfoliosDefault}

  .cv-container {
    .cv-content {
      margin: 0;
    }

    h2,
    h3,
    h4,
    h5,
    h6,
    label {
      font-weight: normal;

      margin-top: 0;
      margin-bottom: 0.2em;
    }

    h5 {
      margin: 0 0 0.2em;
    }

    h1,
    h3 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1 {
      color: white;
      font-size: 225%;
      font-weight: normal;
      line-height: 1em;
      text-align: center;
      text-transform: uppercase;

      margin: 0 0 0.25em;
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 150%;
      font-style: italic;
      text-align: center;
    }

    h3 {
      font-weight: bold;
      font-size: 150%;

      margin-bottom: 0.5em;
    }

    h4,
    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: normal;
      font-size: 125%;
    }

    h5 {
      color: ${({ secondaryColor }) => secondaryColor};
    }

    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      color: #555;
    }

    section {
      clear: both;
      margin-bottom: ${({ sectionMargins }) => sectionMargins};
    }

    .column-container {
      display: flex;
      flex-wrap: wrap;
    }

    .main {
      padding: 2em 3%;
      width: 67%;

      h3 {
        color: #555;
      }

      .header-text {
        background-color: ${({ backgroundColor }) => backgroundColor};
      }

      .vcard {
        display: none;
      }
    }

    .sidebar {
      background-color: ${({ primaryColor }) => primaryColor};
      color: white;

      padding: 3em 3%;
      width: 33%;

      .vcard {
        display: block;
        padding-top: 2px;
      }

      .header-text {
        background-color: ${({ primaryColor }) => primaryColor};
      }

      article {
        a {
          color: white;
        }

        &.contact_info {
          margin-bottom: 2em;
        }
      }

      .competency {
        .competency-name {
          color: white;
        }

        .competency-list-element {
          // wkhtmltopdf ignores 'opacity' in sidebar, use transparent color instead
          background-color: rgba(255, 255, 255, 0.2);

          opacity: 1;

          &.filled {
            background-color: white;
          }
        }
      }

      .add-page-break {
        color: white !important;
      }
    }

    .user-contact,
    .user-links {
      margin-left: -0.4em;

      li {
        margin-bottom: 0.75em;

        &:before,
        i {
          text-align: center;

          width: 1.9em;
        }
      }

      a,
      [data-bind=email] span span {
        color: white;
      }
    }

    .user-contact {
      li {
        &:before {
          font-family: FontAwesome;

          display: inline-block;
        }

        &.adr:before {
          content: '\\f041'; // pin
        }

        &.phone:before {
          content: '\\f095'; // phone

        }

        &.email:before {
          content: '\\f003'; // email
        }
      }
    }

    .user-title {
      padding: 15px 0;
    }

    .user-thumb {
      border: 1px solid white;
      border-radius: 50%;

      height: 140px;
      margin: 0 auto;
      padding: 4px;
      width: 140px;

      .css-crop,
      .image-placeholder {
        border-radius: 50%;
      }
    }

    #summary {
      header {
        text-align: center;

        .header-text {
          padding: 0 0.5em;
        }
      }

      article {
        font-size: 115%;
        font-weight: normal;
        text-align: center;

        margin-top: 0;
        padding: 0 1em;
      }
    }

    article {
      clear: both;

      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
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
          width: 18%;
        `}
      }

      .article-body {
        width: 100%;

        ${media.md`
          width: 81%;
        `}
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

        margin-bottom: 0.2em;
      }
    }

    .portfolio {
      label {
        font-weight: initial;
      }

      .css-crop {
        border: 2px solid ${({ primaryColor }) => primaryColor};
        border-radius: 2em 0 2em 0;
        box-shadow: 1px 1px 3px 0 ${({ faintColor }) => faintColor};

        padding-bottom: 75%;
        width: 100%;
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //

    @media screen and (max-width: ${md}) {
      #summary article {
        padding: 0;
      }

      .main {
        ${flex('1 0 auto')}

        order: 1;

        padding: 0;
        width: 100%;

        .vcard {
          background-color: ${({ primaryColor }) => primaryColor};
          color: white;

          display: block;
        }

        .vcard,
        section {
          padding: 2em 5%;
        }
      }

      .sidebar {
        ${flex('1 0 auto')}

        order: 2;

        padding: 1em 5% 0;
        width: 100%;

        .vcard {
          display: none;
        }
      }
    }
  }

  .pdf {
    .cv-container {
      .main,
      .sidebar {
        padding-bottom: 0;
        padding-top: 0;
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
