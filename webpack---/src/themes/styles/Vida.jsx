import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { breakpointsPx } from '../../components/styled/Grid'

import PortfoliosDefault from './shared/PortfoliosDefault'
import ProfileDefault from './shared/ProfileDefault'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosDefault}
  ${ProfileDefault}

  .cv-container {
    .cv-content {
      padding: 3em 6%;
    }

    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      margin-top: 0;
      margin-bottom: 0.35em;
    }

    h1 {
      color: #777;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 300%;
      font-weight: normal;

      margin-bottom: 0.1em;
      margin-top: 0;

      strong {
        font-weight: normal;
      }
    }

    h2 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 150%;
      font-weight: bold;

      margin-bottom: 0;
    }

    h3 {
      color: #777;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 150%;
      font-weight: normal;

      margin-bottom: 2px;
    }

    h4,
    h5,
    h6 {
      font-size: 110%;
    }

    h4 {
      color: ${({ secondaryColor }) => secondaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
    }

    h5 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-weight: bold;
    }

    h6 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      header {
        border-bottom: 1px solid ${({ subtleColor }) => subtleColor};
        text-align: left;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};
      }

      .date-range {
        white-space: nowrap;
      }
    }

    // this fixes zero margin on column-container join with the first bottom section
    .column-container + section {
      margin-top: ${({ sectionMargins }) => sectionMargins};
    }

    #profile {
      margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)};
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }

      .date-range {
        float: right;
      }
    }

    .profile {
      .vcard {
        margin-bottom: 0;
        margin-top: 0;
        text-align: center;
      }
    }

    .user-thumb {
      border: 1px solid ${({ subtleColor }) => subtleColor};
      border-radius: 50%;

      margin-left: auto;
      margin-right: auto;
      padding: 4px;
      height: 115px;
      width: 115px;

      .css-crop,
      .image-placeholder {
        border-radius: 50%;
      }
    }

    .column-container {
      display: flex;
    }

    .main {
      padding-right: 2%;
      width: 50%;
    }

    .sidebar {
      padding-left: 2%;
      width: 50%;
    }

    .user-links {
      padding-top: 0;
    }

    .competency {
      .competency-name {
        color: ${({ primaryColor }) => primaryColor};
        font-family: ${({ headerFontFamily }) => headerFontFamily};
        font-size: 110%;
        font-weight: bold;
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      .summary-text {
        padding: 0;
      }

      .column-container {
        display: block;
      }

      .main,
      .sidebar {
        display: block;
        padding: 0;
        width: 100% !important;
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
        padding-top: 0;
        padding-bottom: 0;
      }

      .vcard {
        padding-top: 2px; // so that wkhtmltopdf won't cut the circle around avatar
      }

      .portfolio {
        .css-crop {
          box-shadow: none;
        }
      }

      // this fixes zero margin on #summary join with the column-container
      #summary + .column-container {
        margin-top: ${({ sectionMargins }) => sectionMargins};
      }

      // we don't want to break the page after two-column layout changes into a single column
      .main,
      .sidebar {
        > *:last-child {
          page-break-after: auto;
        }
      }
    }
  }
`

export default style
