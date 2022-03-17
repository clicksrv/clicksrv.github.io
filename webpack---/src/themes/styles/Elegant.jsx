import { createGlobalStyle } from 'styled-components'
import { math, transparentize } from 'polished'

import { breakpointsPx } from '../../components/styled/Grid'

import PortfoliosInterchangeable from './shared/PortfoliosInterchangeable'
import ProfileContactInfo from './shared/ProfileContactInfo'

const { sm, md, lg } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosInterchangeable}
  ${ProfileContactInfo}

  .cv-container {
    padding-top: ${({ sectionMargins }) => math(`${sectionMargins} * 2`)};

    .cv-content {
      background-color: ${({ primaryColor }) => primaryColor};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0;
    }

    h1 {
      // -webkit prefixed gradient required for wkhtmltopdf
      background-image: -webkit-linear-gradient(bottom, ${({ primaryColor }) => primaryColor} 0%, ${({
  primaryColor,
}) => primaryColor} 35%, ${({ backgroundColor }) => backgroundColor} 35%, ${({ backgroundColor }) =>
  backgroundColor} 100%);
      background-image: linear-gradient(0deg, ${({ primaryColor }) => primaryColor} 0%, ${({ primaryColor }) =>
  primaryColor} 35%, ${({ backgroundColor }) => backgroundColor} 35%, ${({ backgroundColor }) => backgroundColor} 100%);
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 600%;
      font-weight: normal;
      line-height: 100%;

      padding: 0 ${({ headerSpacing }) => headerSpacing};
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.2em`)};
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      font-weight: bold;
      letter-spacing: 2px;
      line-height: 150%;

      padding: 0 ${({ headerSpacing }) => headerSpacing};
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.8`)};
    }

    h3 {
      border-bottom: 1px solid ${({ subtleColor }) => subtleColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      font-weight: bold;
      letter-spacing: 6px;
      line-height: 200%;

      margin-bottom: 0.25em;
    }

    h4 {
      color: ${({ secondaryColor }) => secondaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 150%;
      font-weight: bold;

      margin-bottom: 0.1em;
    }

    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 125%;
      font-weight: normal;
      line-height: 150%;

      margin-bottom: 0.3em;
    }

    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      font-weight: normal;

      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.15em`)};
    }

    p {
      margin-bottom: 0.5em;
    }

    a,
    [data-bind=email] span span,
    a[data-bind=organization_url] span span,
    a[data-bind=link_url] span span {
      text-decoration: underline;
    }

    p, ol, ul {
      color: ${({ bodyColor }) => transparentize(0.5, bodyColor)};
    }

    section.profile,
    section.summary {
      text-align: center;
    }

    section.summary {
      line-height: 200%;

      padding: 0 ${({ headerSpacing }) => math(`${headerSpacing} * 1.8`)};
    }

    .vcard {
      .user-photo {
        background-color: ${({ backgroundColor }) => backgroundColor};

        padding-bottom: 1px;
      }

      .user-thumb {
        border-radius: 50%;

        height: 130px;
        margin: 0 auto;
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.7`)};
        width: 130px;

        .css-crop,
        .image-placeholder {
          border-radius: 50%;
        }
      }

      .contact-links {
        margin: 0 ${({ headerSpacing }) => headerSpacing};
      }

      .user-contact,
      .user-links {
        color: ${({ bodyColor }) => transparentize(0.15, bodyColor)};
        line-height: 160%;

        display: inline-block;

        li {
          display: inline-block;
          margin: 0 20px 0 0;

          &:last-child {
            margin-right: 0;
          }

          &:before {
            color: ${({ bodyColor }) => bodyColor};
            font-family: Icons;
            font-size: 100%;
            opacity: 1;
            text-align: right;
            vertical-align: middle;

            display: inline-block;
            margin-right: 0.5em;
          }

          &.phone:before {
            content: '\\e900';
          }

          &.locality:before {
            content: '\\e901';
          }

          &.email:before {
            content: '\\e903';
          }

          &.website:before {
            content: '\\e904';
          }
        }
      }

      .user-links {
        margin-left: 20px;

        li {
          i {
            display: none;
          }
        }
      }
    }

    .columns {
      background-color: ${({ backgroundColor }) => backgroundColor};

      padding: ${({ sectionMargins }) => math(`${sectionMargins} * 1.3`)} 6%;
      width: 100%;

      display: flex;
      flex-wrap: wrap;
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};
      position: relative;

      &[data-bind=profile] {
        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)};
      }

      header {
        text-transform: uppercase;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3 + 0.2em`)};
        width: 100%;
      }

      .date-range {
        color: ${({ bodyColor }) => transparentize(0.5, bodyColor)};
        font-size: 82%;
        font-weight: normal;
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    .sidebar {
      padding-right: 4em;
      width: 48%;
    }

    .main {
      width: 52%;
    }

    // Portfolio

    .portfolio {
      .asset {
        label {
          min-height: 0.2em;
        }
      }
    }

    // Competencies

    .competency {
      .placeholder,
      .mce-content-body {
        font-size: 87.5%;
      }
    }

    // Spacing

    .mce-content-body {
      line-height: 160%;
    }

    @media screen and (max-width: ${lg}) {
      h1 {
        font-size: 500%;
      }

      h2 {
        letter-spacing: 15px;
      }

      .vcard {
        .user-thumb {
          height: 110px;
          width: 110px;
        }
      }
    }

    @media screen and (max-width: ${md}) {
      padding-top: ${({ sectionMargins }) => sectionMargins};

      h1 {
        font-size: 350%;

        padding: 0 ${({ headerSpacing }) => math(`${headerSpacing} * 0.25`)};
      }

      h2 {
        letter-spacing: 10px;

        padding: 0 ${({ headerSpacing }) => math(`${headerSpacing} * 0.25`)};
      }

      .vcard {
        .user-thumb {
          height: 100px;
          width: 100px;
        }
      }

      section.summary {
        padding: 0 ${({ headerSpacing }) => math(`${headerSpacing} * 0.25`)};
      }

      .vcard {
        .contact-links {
          margin: 0 ${({ headerSpacing }) => math(`${headerSpacing} * 0.25`)};
        }

        .user-contact,
        .user-links {
          display: block;

          li {
            display: block;
            margin-right: 0;
            margin-bottom: 5px;
          }
        }

        .user-links {
          margin-left: 0;
        }
      }

      .sidebar {
        order: 1;
        padding-right: 0;
        width: 100%;
      }

      .main {
        order: 0;
        width: 100%;
      }
    }

    @media screen and (max-width: ${sm}) {
      h1 {
        font-size: 280%;
      }
    }
  }

  .pdf {
    .cv-container {
      .cv-content {
        padding-bottom: 0;
      }

      h2 {
        letter-spacing: 0;
      }

      h3 {
        // border with background color is required to fix issue with wkhtmltopdf
        border: 1px solid ${({ backgroundColor }) => backgroundColor};
        border-bottom-color: ${({ subtleColor }) => subtleColor};
        letter-spacing: 1px;
      }

      #summary {
        margin-bottom: ${({ sectionMargins }) => sectionMargins} !important;
      }

      .user-photo {
        // wkhtmltopdf fix for dark line underneath the profile picture
        border-bottom: 1px solid ${({ backgroundColor }) => backgroundColor};
      }

      .user-thumb {
        // wkhtmltopdf bug with circle cut
        padding-top: 1px;
      }

      .user-title {
        // wkhtmltopdf overlap fix
        margin-top: -2px;
      }

      .columns {
        padding-bottom: 0;
      }

      .asset-thumb {
        .asset-overlay {
          display: none;
        }
      }
    }
  }
`

export default style
