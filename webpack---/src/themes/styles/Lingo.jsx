import { createGlobalStyle } from 'styled-components'
import { darken, lighten, math } from 'polished'

import { breakpointsPx, media } from '../../components/styled/Grid'
import { grey, white } from '../../colors'

const { sm, md, lg } = breakpointsPx

const style = createGlobalStyle`
  .cv-editor .cv-container {
    max-width: 97% !important;
  }

  .cv-container {
    margin-bottom: 0;
    padding: 0 0 3em;

    a,
    [data-bind=email] span span,
    a[data-bind=organization_url] span span,
    a[data-bind=link_url] span span {
      color: ${({ linkColor }) => linkColor};

      &:hover {
        text-decoration: underline;
      }
    }

    h1, h2, h3, h4, h5 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      letter-spacing: 1px;

      margin: 0;
    }

    h1 {
      font-size: 167%;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
    }

    h2 {
      color: white;
      font-size: 239%;
      line-height: 140%;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.2);

      width: 60%;
    }

    h3 {
      color: ${({ primaryColor }) => primaryColor};
      font-size: 183%;
      line-height: 110%;
    }

    h4 {
      color: ${({ secondaryColor }) => secondaryColor};
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
      font-size: 77.8%;
      font-weight: normal;
    }

    p {
      min-height: auto;
    }

    .cv-content:after,
    article:after {
      display: none;
    }

    .banner {
      background-image: ${({ bgUrl }) => (bgUrl ? `url(${bgUrl})` : 'none')};
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center 0%;
      color: white;

      display: flex;
      min-height: 550px;

      .banner-overlay {
        background-image: linear-gradient(180deg, rgba(173, 106, 22, 0.3) 0%, rgba(0, 0, 0, 0.2) 100%);

        width: 100%;
      }

      .content-container {
        display: flex;
        justify-content: space-between;

        padding: 40px 30px;
      }

      .profile {
        flex: 1 1 auto;

        white-space: nowrap;
      }
    }

    .content-container {
      margin: 0 auto;
      max-width: 1240px;
    }

    .menu {
      margin-right: -8px;

      ul {
        font-size: 83.3%;

        justify-content: flex-end;
      }

      li {
        margin-bottom: 6px;

        justify-content: flex-end;

        a {
          border: 1px solid transparent;
          border-radius: 8px;
          color: white;
          text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
          white-space: nowrap;

          margin: 3px 8px;
          padding: 7px 15px;

          &:hover,
          &:focus {
            background-color: ${({ linkColor }) => linkColor};
            border-color: ${({ linkColor }) => linkColor};
            text-decoration: none;
            text-shadow: none;
          }
        }
      }
    }

    .main-content {
      .content-container {
        padding-top: 0;
      }

      .profile {
        max-width: 1240px;
        min-height: 350px;
        margin: -350px auto ${({ sectionMargins }) => math(`${sectionMargins} * 1.5`)};
        padding: 40px 30px 0;

        article {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      }
    }

    section[data-bind=sections] {
      margin: 0 auto ${({ sectionMargins }) => math(`${sectionMargins} * 2.2`)};
      padding: 0 30% 0 30px;

      header {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.7`)};
      }

      article {
        line-height: 160%;
      }
    }

    [data-bind=add-section-btn] {
      margin-left: 20px;

      ${media.lg`
        margin-left: 30px;
      `}
    }

    .vcard {
      background-color: ${({ backgroundColor }) => lighten(0.02, backgroundColor)};
      border: 1px solid #c0c0c0;
      border-radius: 8px;
      color: ${({ bodyColor }) => bodyColor};
      font-size: 89%;
      text-align: center;

      min-width: 250px;
      max-width: 300px;
      margin-top: 5px;
      padding: 30px;

      .user-thumb {
        border-radius: 50%;

        margin: 0 auto 20px;
        height: 140px;
        width: 140px;

        .css-crop,
        .image-placeholder {
          border-radius: 50%;
        }
      }

      .user-contact {
        line-height: 160%;

        margin-bottom: 20px;
      }

      .user-websites {
        line-height: 160%;

        i {
          display: none;
        }
      }
    }

    .dated_story {
      article {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 1.7`)};
      }

      article:last-child {
        margin-bottom: 0;
      }

      .mce-content-body {
        color: #888;
        font-size: 77.8%;
      }
    }

    .gallery {
      display: flex;
      flex-wrap: wrap;

      margin: 0 -0.8%;

      .asset {
        flex: 1 1 auto;

        margin: 1px 0.8%;
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
          font-size: 80%;
          line-height: 110%;

          margin-top: 8px;
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
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .competency {
        flex: 1 1 auto;

        display: flex;
        align-items: center;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.7 + 0.3em`)};
        max-width: 100%;
        width: 100%;

        ${media.md`
          max-width: 48%;
          width: 48%;
        `}

        .competency-name {
          font-size: 89%;
          line-height: 120%;
          letter-spacing: 0;

          margin-bottom: 5px;
        }

        .placeholder,
        .mce-content-body {
          font-size: 77.8%;
          line-height: 120%;
        }

        .mce-content-body {
          color: ${grey};

          margin: 0;
        }
      }
    }

    .contact_me {
      .description,
      .success-message {
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
        color: #888;
        font-size: 77.8%;

        margin-bottom: 12px;
      }

      input[type='text'],
      input[type='email'],
      textarea {
        background-color: ${({ backgroundColor }) => lighten(0.02, backgroundColor)};
        border: 1px solid ${({ primaryColor }) => primaryColor};
        border-radius: 8px;

        padding: 10px 13px;

        &:focus,
        &:active {
          border-color: ${({ linkColor }) => linkColor};
        }

        &::placeholder {
          color: ${darken(0.2, white)};
        }
      }

      button[type='submit'] {
        background-color: ${({ linkColor }) => darken(0.03, linkColor)};
        border: 1px solid ${({ linkColor }) => darken(0.15, linkColor)};
        border-radius: 8px;
        color: white;
        font-size: 83.3%;
        font-weight: normal;

        padding: 12px 30px;
        margin-top: -15px;

        &:hover,
        &:focus {
          background-color: ${({ linkColor }) => linkColor};
          border-color: ${({ linkColor }) => darken(0.05, linkColor)};
        }

        &[disabled] {
          color: #c0c0c0;
          background-color: ${({ linkColor }) => lighten(0.1, linkColor)};
          border-color: ${({ linkColor }) => linkColor};
        }
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${lg}) {
      section[data-bind=sections] {
        padding-right: 35%;
      }
    }

    @media screen and (max-width: ${lg}) {
      h2 {
        width: 50%;
      }

      section[data-bind=sections] {
        padding: 0 30% 0 20px;
        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 1.5`)};

        header {
          margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
        }
      }
    }

    @media screen and (max-width: ${md}) {
      h2 {
        font-size: 194%;
        text-align: center;

        width: 80%;
      }

      h3 {
        font-size: 144%;
      }

      .banner {
        .content-container {
          padding: 25px 20px 15px;
        }
      }

      .menu {
        li {
          width: 100%;
        }
      }

      .main-content {
        .profile {
          margin-top: -210px;

          article {
            justify-content: center;
          }
        }

        .vcard {
          margin-top: 30px;
          max-width: 380px;
        }
      }

      section[data-bind=sections] {
        margin-bottom: ${({ sectionMargins }) => sectionMargins};
        padding-right: 20px;
      }

      .dated_story {
        article {
          margin-bottom: ${({ articleMargins }) => articleMargins};
        }

        h5, .article-body {
          width: 100%;
        }
      }

      .text_story, .contact_me {
        article {
          font-size: 83.3%;
        }
      }

      .gallery {
        margin-right: -12px;
        margin-left: -12px;

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
      h2 {
        font-size: 167%;
        line-height: 130%;

        width: 100%;
      }

      .banner {
        .profile {
          white-space: normal;
        }
      }

      .menu {
        white-space: normal;
      }

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
