import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'

import PortfoliosDefault from './shared/PortfoliosDefault'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosDefault}

  .cv-container {
    line-height: 1.65;

    .cv-content {
      position: relative;
      padding: 3em 9% 3em 4%;
      margin: 0;
    }

    h2,
    h3,
    h4,
    h5,
    h6,
    label {
      font-weight: bold;

      margin-top: 0;
      margin-bottom: 0.2em;
    }

    h1,
    h3 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1 {
      font-size: 350%;
      font-weight: bold;
      line-height: 1;
      text-transform: uppercase;
      margin: 0 0 0.25em;
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      font-weight: bold;
      line-height: 1.4;
      text-transform: uppercase;
    }

    h3 {
      font-weight: bold;
      font-size: 125%;
      text-transform: uppercase;
    }

    h4,
    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: bold;
      font-size: 100%;
    }

    h4 {
      color: ${({ secondaryColor }) => secondaryColor};
    }

    h5 {
      color: black;

      margin: 0;
    }

    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      color: black;
      text-transform: uppercase;
    }

    p {
      font-weight: normal;
    }

    section {
      clear: both;

      margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 1.5`)};
    }

    [data-bind='organization'] {
      font-weight: bold;
      color: ${({ primaryColor }) => primaryColor};
      text-transform: uppercase;
    }

    a [data-bind='organization'] {
      color: ${({ primaryColor }) => primaryColor};
    }

    #profile {
      .article-body {
        display: flex;

        padding-top: 0.5em;
      }

      .user-title {
        ${flex('1')}
      }

      .user-info {
        text-align: right;
      }

      .user-contact li,
      .user-links li {
        margin-bottom: 0.25em;

        i {
          color: ${({ primaryColor }) => primaryColor};
          text-align: center;

          float: right;
          margin-top: 0.35em;
          margin-left: 0.75em;
          width: 1em;
        }
      }

      .user-thumb {
        border-radius: 50%;

        height: 120px;
        margin-left: auto;
        width: 120px;

        .css-crop,
        .image-placeholder {
          border-radius: 50%;
        }
      }
    }

    .vcard {
      .full-name {
        color: ${({ primaryColor }) => primaryColor};
      }

      ul.user-contact li {
        &:after {
          color: ${({ primaryColor }) => primaryColor};
          font-family: FontAwesome;
          text-align: center;

          display: inline-block;
          margin-left: 0.75em;
          width: 1em;
        }

        &.locality:after {
          content: '\\f041';
        }

        &.phone:after {
          content: '\\f095';
        }

        &.email:after {
          content: '\\f003';
        }
      }
    }

    header {
      display: flex;
      align-items: center;

      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};

      .header-text {
        color: ${({ primaryColor }) => primaryColor};
        text-align: right;

        margin-bottom: 0;
        width: 15%;
      }

      .header-separator {
        ${flex('1')}

        margin-left: 50px;
      }
    }

    .header-separator {
      background-color: black;

      height: 1px;
    }

    article {
      display: flex;
      flex-wrap: wrap;

      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 1.5`)};

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        margin-bottom: 0.5em;
      }

      .article-headings {
        text-align: right;

        width: 15%;
      }

      .article-body {
        line-height: 1.75;

        padding: 0 0 0 50px;
        width: 85%;

        .title-text {
          font-size: 110%;
          font-weight: bold;
        }
      }
    }

    .competency {
      vertical-align: top;

      display: inline-block;
      width: 50%;

      .competency-container {
        display: flex;
      }

      .article-headings {
        width: 30%;
      }

      .article-body {
        width: 70%;
      }

      .competency-list {
        margin-bottom: 0.5em;
      }

      .competency-name {
        font-weight: bold;
        line-height: 110%;
      }

      .placeholder,
      .mce-content-body {
        line-height: 120%;
      }
    }

    .portfolio {
      label {
        font-weight: initial;
      }

      .css-crop {
        box-shadow: none;
        border: none;

        padding-bottom: 75%;
        width: 100%;
      }

      .asset {
        padding-left: 5px;
        padding-right: 5px;
      }
    }

    .add-article {
      margin-left: 0;

      ${media.md`
        margin-left: calc(15% + 50px);
      `}
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      .cv-content {
        padding: 3em 5%;
      }

      .article-headings {
        margin-bottom: 1em;
      }

      #profile {
        .article-headings {
          text-align: center;
        }

        .article-body {
          display: block;
        }

        .user-info {
          text-align: left;

          margin-top: 1em;
        }

        .user-thumb {
          height: calc(50vw - 70px);
          margin: 0 auto;
          min-height: 180px;
          min-width: 180px;
          width: calc(50vw - 70px);
        }

        ul.user-contact li {
          &:after {
            display: none;
          }

          &:before {
            color: ${({ primaryColor }) => primaryColor};
            font-family: FontAwesome;
            text-align: center;

            display: inline-block;
            margin-right: 0.75em;
            width: 1em;
          }

          &.locality:before {
            content: '\\f041';
          }

          &.phone:before {
            content: '\\f095';
          }

          &.email:before {
            content: '\\f003';
          }
        }

        ul.user-links {
          i {
            color: ${({ primaryColor }) => primaryColor};
            text-align: center;
            float: none;

            margin-left: 0;
            margin-right: 0.75em;
            width: 1em;
          }
        }
      }

      .competency {
        display: block;
        width: 100%;

        .article-headings {
          text-align: right;
        }

        .article-body {
          padding-left: 2em;
        }
      }

      header {
        display: block;
        position: relative;

        .header-text {
          background-color: ${({ backgroundColor }) => backgroundColor};
          text-align: left;

          display: inline-block;
          padding-right: 1em;
          width: auto;
        }

        .header-separator {
          margin: 0;
          position: absolute;
          top: 50%;
          width: 100%;
          z-index: -1;
        }
      }

      article {
        -webkit-box-orient: vertical;

        .article-headings,
        .article-body {
          width: 100%;
        }

        .article-headings {
          text-align: left;
        }

        .article-body {
          padding: 0;
        }
      }
    }
  }

  .pdf {
    .cv-container {
      margin: 0;

      .cv-content {
        padding: 0 9% 0 5%;
      }

      .main {
        padding: 0 3%;
      }

      .profile {
        // 1px so that wkhtmltopdf does not cut the avatar
        padding-top: 1px;
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
