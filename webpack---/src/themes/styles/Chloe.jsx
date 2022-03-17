import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx } from '../../components/styled/Grid'

import PortfoliosDefault from './shared/PortfoliosDefault'
import ProfileContactInfo from './shared/ProfileContactInfo'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosDefault}
  ${ProfileContactInfo}

  .cv-container {
    border-top: 2em solid ${({ primaryColor }) => primaryColor};
    line-height: 1.6;

    .cv-content {
      padding: 3em 6.5%;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};

      margin-top: 0;
    }

    h1 {
      color: black;
      font-size: 400%;
      font-weight: normal;
      text-transform: uppercase;

      margin-bottom: .5em;
    }

    h2 {
      color: ${({ primaryColor }) => primaryColor};
      font-size: 125%;
      font-weight: normal;
      text-transform: uppercase;
    }

    h3 {
      font-size: 125%;
      font-weight: normal;
      text-transform: uppercase;
      color: black;

      margin: 0;
    }

    h4 {
      color: black;
      font-size: 110%;
      font-weight: normal;

      margin-bottom: 0;
    }

    h5,
    h6 {
      font-size: 110%;
      font-weight: normal;

      margin-bottom: 0.5em;
    }

    h5 {
      color: ${({ secondaryColor }) => secondaryColor};
    }

    h6 {
      color: black;
    }

    .profile-heading {
      text-align: center;
    }

    .vcard {
      .user-contact,
      .user-links {
        li {
          margin-bottom: 0.5em;
        }
      }

      .user-contact li:before,
      .user-links li i {
        color: ${({ bodyColor }) => bodyColor};
        opacity: 1;

        margin-right: 0.6em;
        width: 1em;
      }
    }

    .user-thumb {
      border-radius: 50%;

      height: 150px;
      margin: 0 auto 0.5em;
      width: 150px;

      .css-crop,
      .image-placeholder {
        border-radius: 50%;
      }
    }

    .column-container {
      display: flex;
      flex-wrap: wrap;

      border-top: 1px solid ${({ bodyColor }) => bodyColor};

      margin-top: ${({ sectionMargins }) => sectionMargins};
      padding-top: ${({ sectionMargins }) => sectionMargins};
    }

    .main {
      width: 70%;
      padding-right: 3%;

      .vcard {
        display: none;
      }
    }

    .sidebar {
      width: 30%;
      padding-left: 3%;

      .article-headings,
      .article-body {
        float: none !important;
        width: 100% !important;
      }

      .vcard {
        display: block;
      }
    }

    #profile article {
      &:after {
        content: '';
        clear: both;
      }
    }

    article {
      &:after {
        content: none;
        clear: left;
      }
    }

    .main.col-sm-8 {
      width: 70%;
    }

    section {
      position: relative;
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      .date-range {
        float: right;
        font-weight: normal;
        min-width: 260px;
        text-align: right;
      }

      header {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }

      .article-headings.col-sm-3 {
        padding-right: 0;
        width: 20%;
      }

      .article-body.col-sm-9 {
        width: 80%;
      }

      .left-col {
        padding-right: 0;
      }
    }

    .portfolio {
      .row:after {
        clear: left
      }

      .css-crop {
        box-shadow: none;
        border: none;
      }

      label {
        font-weight: normal;
        text-align: left;
      }
    }

    .competency {
      .competency-name {
        font-family: ${({ headerFontFamily }) => headerFontFamily};
      }

      .competency-bar,
      .competency-level {
        border-radius: 12px;
      }
    }

    @media screen and (max-width: ${md}) {
      h1 {
        font-size: 250%;
        text-align: center;
      }

      h2 {
        font-size: 150%;
        text-align: center;
      }

      h3 {
        font-size: 125%;
      }

      h6.date-range {
        text-align: left;
        float: none;
      }

      .summary-text {
        padding: 0;
      }

      .main {
        ${flex('1 0 auto')}

        width: 100%;

        .vcard {
          display: block;
        }
      }

      .sidebar {
        ${flex('1 0 auto')}

        padding-left: 0;
        width: 100%;

        .vcard {
          display: none;
        }
      }

      article {
        .article-headings,
        .article-body {
          width: 100% !important;
        }
      }
    }
  }

  .pdf {
    .cv-container {
      .cv-content {
        padding: 1em 6.5% 3em;
      }

      .header-text:after {
        // wkhtmltopdf fix for unnecessary line breaks
        content: '\\00a0';

        padding-right: 0;
      }

      .portfolio {
        .css-crop {
          box-shadow: none;
        }
      }

      .user-thumb {
        box-shadow: none;
      }
    }
  }
`

export default style
