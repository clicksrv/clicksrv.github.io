import { createGlobalStyle } from 'styled-components'
import { darken, lighten, math, saturate, transparentize } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'

import CompetenciesColumns3 from './shared/CompetenciesColumns-3'
import CompetenciesDial from './shared/CompetenciesDial'

const { sm, md, lg } = breakpointsPx

const style = createGlobalStyle`
  ${CompetenciesColumns3}
  ${CompetenciesDial}

  .cv-editor .cv-container {
    max-width: 97% !important;
  }

  .cv-container {
    margin-bottom: 0;
    padding: 0 0 5em;

    a,
    [data-bind=email] span span,
    a[data-bind=organization_url] span span,
    a[data-bind=link_url] span span {
      color: ${({ linkColor }) => linkColor};

      &:hover {
        text-decoration: underline;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      letter-spacing: 1px;

      margin: 0;
    }

    h1 {
      font-size: 194%;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.15);

      width: 30%;
    }

    h2 {
      font-size: 266%;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.15);

      margin-top: 150px;
      width: 50%;
    }

    h3 {
      color: ${({ primaryColor }) => primaryColor};
      font-size: 183%;
      line-height: 110%;
    }

    h4 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 111%;
      font-weight: normal;
    }

    h4[data-bind=organization] {
      font-size: 83.3%;

      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};
    }

    h5 {
      color: #888;
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 83.3%;
      font-weight: normal;
    }

    p {
      min-height: auto;
    }

    .cv-content:after,
    article:after {
      display: none;
    }

    .content-container {
      margin: 0 auto;
      max-width: 1240px;
      padding: 0 20px;

      ${media.lg`
        padding-left: 30px;
        padding-right: 30px;
      `}
    }

    .banner {
      background-color: #AAA;
      background-image: ${({ bgUrl }) => (bgUrl ? `url(${bgUrl})` : 'none')};
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center 0%;
      color: white;
      min-height: 600px;

      .content-container {
        position: relative;
        padding: 25px 20px 15px;

        ${media.md`
          padding: 40px 30px;
        `}
      }

      a {
        color: white;
      }
    }

    .menu {
      position: absolute;
      right: 15px;
      top: 40px;
      width: 65%;

      ul {
        justify-content: flex-end;
      }

      li {
        margin: 3px;

        justify-content: flex-end;

        a {
          border: 1px solid transparent;
          text-shadow: 1px 1px rgba(0, 0, 0, 0.3);

          padding: 7px 15px;

          &:hover,
          &:focus {
            background-color: ${({ primaryColor }) => transparentize(0.92, primaryColor)};
            border-color: white;
            text-decoration: none;
          }
        }
      }
    }

    .main-content {
      .profile {
        background-color: ${({ secondaryColor }) => secondaryColor};

        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 2`)};

        article {
          display: flex;
          flex-wrap: wrap;

          max-width: 1240px;
          margin: 0 auto;
          padding: 40px 30px;
        }

        ul {
          text-align: left;

          ${flex('1 1 auto')}

          min-width: 250px;
          padding: 0;

          li {
            display: block;
            line-height: 180%;
          }

          li:before {
            color: ${({ subtleColor }) => subtleColor};
            font-family: FontAwesome;
            font-size: 100%;
            text-align: center;

            display: inline-block;
            margin: 0 0.5em 0 0;
            vertical-align: baseline;
            width: 1em;
          }

          li.adr:before {
            content: '\\f041'; // pin
          }

          li.phone:before {
            content: '\\f095'; // phone
          }

          li.email:before {
            content: '\\f003'; // email
          }

          i {
            color: ${({ subtleColor }) => subtleColor};

            margin-right: 0.3em;
          }
        }

        .user-contact {
          width: 33.33333333%;
        }

        .user-links {
          width: 66.66666666%;
        }
      }
    }

    section[data-bind=sections] {
      margin: 0 auto ${({ sectionMargins }) => math(`${sectionMargins} * 2`)};

      header {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.7 + 0.5em`)};
      }

      article {
        line-height: 160%;
      }
    }

    .dated_story {
      article {
        display: flex;
        flex-wrap: wrap;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 1.7`)};
      }

      article:last-child {
        margin-bottom: 0;
      }

      h5 {
        ${flex('1 1 auto')}

        width: 33.33333333%;
      }

      .article-body {
        ${flex('1 1 auto')}

        width: 66.66666666%;
      }

      .mce-content-body {
        color: #888;
        font-size: 77.8%;
      }
    }

    .text_story,
    .contact_me {
      display: flex;
      flex-wrap: wrap;

      header {
        ${flex('1 1 auto')}

        width: 33.33333333%;
      }

      article {
        ${flex('1 1 auto')}

        width: 66.66666666%;
      }
    }

    .gallery {
      display: flex;
      flex-wrap: wrap;

      margin: -6px -0.8%;

      .asset {
        ${flex('1 1 auto')}

        margin: 6px 0.8%;
        max-width: 23%;
        width: 23%;

        &:hover {
          .css-crop {
            filter: grayscale(60%);
          }
        }

        .asset-overlay {
          background-size: 12%;
        }

        a {
          text-decoration: none;

          &:hover {
            label {
              text-decoration: underline;
            }
          }
        }

        label {
          font-size: ${({ bodyFontSize }) => bodyFontSize};
          line-height: 140%;

          margin-top: 10px;
        }

        p {
          // ellipsis (cannot use 'ellipsis()' helper as it sets 'display')
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;

          color: #888;
          font-size: 72%;
          line-height: 140%;
          text-align: center;
        }
      }

      .css-crop {
        transition: all 0.6s ease;

        padding-bottom: 80%;
      }
    }

    .skills {
      margin: 0 -12px;

      .competency {
        margin: 0 12px ${({ articleMargins }) => math(`${articleMargins} * 0.7 + 0.4em`)};

        .competency-dial {
          margin-right: 25px;

          circle:nth-of-type(1) {
            fill: ${({ primaryColor }) => transparentize(0.75, primaryColor)};
          }

          circle:nth-of-type(2) {
            stroke-width: 27px;
          }

          circle:nth-of-type(3) {
            opacity: 0;
          }
        }

        .competency-level {
          color: ${({ primaryColor }) => primaryColor};
        }

        .placeholder,
        .mce-content-body {
          font-size: 77.8%;
          line-height: 150%;
        }

        .mce-content-body {
          color: #888;
        }
      }
    }

    .contact_me {
      .description, .success-message {
        margin-top: 7px;
        margin-bottom: 30px;
      }

      .input-group {
        margin-bottom: 30px;
      }

      label,
      input,
      button,
      textarea {
        font-family: ${({ bodyFontFamily }) => bodyFontFamily};
        font-size: 83.3%;
      }

      label {
        color: ligthen(${({ bodyColor }) => bodyColor}, 15%);
        font-size: 77.8%;
      }

      input[type='text'],
      input[type='email'],
      textarea {
        background-color: ${({ backgroundColor }) => lighten(0.02, backgroundColor)};
        border: 1px solid ${({ primaryColor }) => primaryColor};

        padding: 10px 13px;

        &:focus,
        &:active {
          border-color: ${({ primaryColor }) => lighten(0.15, saturate(0.15, primaryColor))};
          box-shadow: 0 0 4px ${({ primaryColor }) => lighten(0.15, saturate(0.15, primaryColor))};
        }
      }

      button[type='submit'] {
        background-color: ${({ primaryColor }) => darken(0.03, primaryColor)};
        border: 1px solid ${({ primaryColor }) => darken(0.15, primaryColor)};
        color: white;
        font-size: 88.9%;
        font-weight: normal;

        padding: 12px 30px;
        margin-top: -15px;

        &:hover,
        &:focus {
          background-color: ${({ primaryColor }) => primaryColor};
          border-color: ${({ primaryColor }) => darken(0.05, primaryColor)};
          box-shadow: 0 0 4px ${({ primaryColor }) => lighten(0.15, saturate(0.15, primaryColor))};
        }

        &[disabled] {
          background-color: ${({ primaryColor }) => lighten(0.1, primaryColor)};
          border-color: ${({ primaryColor }) => primaryColor};
          color: #f0f0f0;
        }
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${lg}) {
      .main-content {
        .profile {
          margin-bottom: ${({ sectionMargins }) => sectionMargins};

          article {
            padding: 25px 20px 15px;
          }

          .user-contact, .user-links {
            width: 50%;
          }
        }
      }

      section[data-bind=sections] {
        margin-bottom: ${({ sectionMargins }) => sectionMargins};

        header {
          margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5 + 0.3em`)};
        }
      }
    }

    @media screen and (max-width: ${md}) {
      h1 {
        font-size: 150%;
        width: 45%;
      }

      h2 {
        font-size: 194%;
        text-align: center;

        margin-top: 340px;
        width: 90%;
      }

      h3 {
        font-size: 144%;
      }

      .menu {
        font-size: 88.9%;

        max-width: 54%;
        right: 25px;
        top: 23px;
        width: auto;

        li {
          width: 100%;
        }
      }

      .dated_story {
        article {
          margin-bottom: ${({ articleMargins }) => articleMargins};
        }

        h5,
        .article-body {
          width: 100%;
        }
      }

      .text_story, .contact_me {
        header, article {
          width: 100%;
        }

        article {
          font-size: 83%;
        }
      }

      .gallery {
        margin-left: -12px;
        margin-right: -12px;

        .asset {
          margin: 15px 12px 5px;
          max-width: 44%;
          width: 44%;

          label {
            margin-top: 6px;
          }
        }
      }
    }

    @media screen and (max-width: ${sm}) {
      .gallery {
        .asset {
          max-width: 100%;
          width: 100%;
        }
      }
    }
  }
`

export default style
