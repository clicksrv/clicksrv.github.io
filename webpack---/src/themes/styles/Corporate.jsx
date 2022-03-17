import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'

import ProfileContactInfo from './shared/ProfileContactInfo'
import ProfileLogo from './shared/ProfileLogo'
import PortfoliosDefault from './shared/PortfoliosDefault'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${ProfileContactInfo}
  ${ProfileLogo}
  ${PortfoliosDefault}

  .cv-container {
    .cv-content {
      padding: 4em 6%;
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
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 350%;
      font-weight: normal;

      margin-bottom: 5px;
    }

    h2 {
      color: #777;
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 175%;
      font-weight: bold;
    }

    h3 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 150%;
      font-weight: bold;
    }

    h4,
    h5,
    h6 {
      font-size: 120%;
    }

    h4 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: bold;
    }

    h5 {
      color: ${({ secondaryColor }) => secondaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: normal;
      line-height: 150%;
    }

    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: normal;
    }

    // We render *two* contact_info sections and show one for regular view and the other for mobile view
    .cv-content > section[data-bind=profile_sidebar] {
      display: none;
    }

    section {
      margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.8`)};
      position: relative;

      &[data-bind=profile] {
        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.7`)};
      }

      .date-range {
        font-weight: normal;

        span {
          line-height: 150%;
        }
      }

      header {
        text-align: left;
        text-transform: uppercase;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3 + 0.2em`)};
        width: 100%;

        &:after {
          border-bottom: 2px solid ${({ primaryColor }) => primaryColor};
          content: '';

          display: block;
          width: 3em;
        }
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    section.header-bar {
      border-bottom: 1px solid ${({ subtleColor }) => subtleColor};
    }

    .main,
    .sidebar {
      section {
        border-top: 1px solid ${({ subtleColor }) => subtleColor};

        padding-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.8`)};
      }

      section:first-child {
        border: none;

        padding-top: 0;
      }
    }

    article.vcard {
      padding-left: 0;
      padding-right: 0;
    }

    .flex-columns {
      width: 100%;

      display: flex;
      flex-wrap: wrap;
    }

    .sidebar {
      border-right: 1px solid ${({ subtleColor }) => subtleColor};

      padding-left: 0;
      padding-right: 1.5em;
      width: 30%;

      .reference_story h3 {
        color: white;
        font-size: 125%;
      }
    }

    .main {
      padding-left: 1.5em;
      width: 70%;
    }

    // TODO consolidate into less file with mobile sass
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
    }

    .vcard {
      .user-contact,
      .user-links {
        li {
          margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3 + 0.3em`)};
        }
      }
    }

    .user-thumb {
      height: 150px;
      margin: 1em auto;
      width: 150px;

      ${media.md`
        float: left;
        margin: 0 1em 1em 0;
        height: 100px;
        width: 100px;
      `}
    }

    .competency {
      .competency-name {
        font-size: 120%;
      }
    }

    @media screen and (max-width: ${md}) {
      .cv-content {
        padding: 5em 8%;
      }

      h1 {
        font-size: 250%;
      }

      h2 {
        font-size: 150%;
      }

      h3 {
        font-size: 125%;
      }

      .cv-content > section[data-bind=profile_sidebar] {
        display: block;
      }

      .sidebar >  section[data-bind=profile_sidebar] {
        display: none;
      }

      .sidebar {
        border: none;
      }

      .main {
        ${flex('1 0 auto')}
        order: 0;

        padding: 0;
        width: 100%;

        section:first-child {
          border-top: 1px solid ${({ subtleColor }) => subtleColor};

          padding-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.8`)};
        }
      }

      .sidebar {
        ${flex('1 0 auto')}
        order: 1;

        padding-left: 0;
        width: 100%;

        .contact_info {
          display: none;
        }
      }

      h6.date-range {
        text-align: left;

        float: none;
      }

      .dated_story {
        article {
          flex-wrap: wrap;

          .article-headings,
          .article-body {
            width: 100%;
          }
        }
      }

      article {
        padding: 0;
      }
    }
  }

  .pdf {
    .cv-container {
      .cv-content {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
`

export default style
