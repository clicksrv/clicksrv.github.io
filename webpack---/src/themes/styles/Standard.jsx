import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { breakpointsPx, media } from '../../components/styled/Grid'

import HeadlinesCenterLine from './shared/HeadlinesCenterLine'
import PortfoliosDefault from './shared/PortfoliosDefault'
import ProfileBar from './shared/ProfileBar'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${HeadlinesCenterLine}
  ${PortfoliosDefault}
  ${ProfileBar}

  .cv-container {
    .cv-content {
      padding: 5em 10%;
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
      font-weight: bold;
      line-height: 100%;

      margin-bottom: 0.1em;
    }

    h2 {
      color: ${({ secondaryColor }) => secondaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 175%;
      font-weight: normal;
    }

    h3 {
      font-size: 150%;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-weight: bold;
      color: ${({ primaryColor }) => primaryColor};
      line-height: 110%;
    }

    h4,
    h5,
    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 120%;
    }

    h4 {
      font-weight: bold;
    }

    h5 {
      font-weight: normal;
    }

    h5,
    h6 {
      color: ${({ secondaryColor }) => secondaryColor};
      line-height: 1.5em;
    }

    .sidebar {
      width: 30%;
    }

    .main.col-sm-8 {
      width: 70%;
    }

    section {
      position: relative;
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      &.profile {
        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.3`)};
      }

      .date-range {
        font-weight: normal;
        text-align: right;
        white-space: nowrap;
      }
    }

    .user-contact {
      li.email:before {
        color: black;
      }
    }

    .vcard {
      padding-left: 0;
      padding-right: 0;
    }

    article {
      margin-top: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 1.5`)};
      margin-left: 0;
      margin-right: 0;
      padding: 0 5%;

      &:last-child {
        margin-bottom: 0;
      }

      &.contact_info {
        padding: 0;
      }

      .date-range {
        float: right;
      }
    }

    .add-article {
      ${media.md`
        margin-left: 5%;
        margin-right: 5%;
      `}
    }

    // Contact Section

    .user-thumb {
      flex: none;

      margin-right: 15px;
      height: 115px;
      width: 115px;
    }

    // Summary Section

    .summary-header {
      text-align: center;

      .header-text {
        padding: 0 15px;
      }
    }

    .summary-text {
      font-size: 125%;
      font-weight: normal;
      text-align: center;

      margin-top: 0;
      padding: 0.75em 1.5em;
    }

    .competency {
      .competency-name {
        color: ${({ secondaryColor }) => secondaryColor};
        font-size: 120%;
        font-weight: bold;
        line-height: 110%;

        margin-bottom: 0.2em;
      }

      .article-headings {
        float: left;
        width: 33%;
      }

      .article-body {
        float: right;
        width: 65%;
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
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

      .user-contact {
        text-align: center;

        margin: 0 -8% 0.5em !important;
        padding: 0 !important;
        width: 116% !important;
      }

      .user-thumb {
        margin: 1em auto;

        height: 150px;
        width: 150px;
      }

      .main {
        float: none;
        padding: 30px 0 0 0;
        width: 100% !important;
      }

      .sidebar {
        float: none;
        width: 100% !important;
      }

      h6.date-range {
        text-align: left;

        float: none;
      }

      article {
        padding: 0;

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
        padding: 0 7%;
      }
    }
  }
`

export default style
