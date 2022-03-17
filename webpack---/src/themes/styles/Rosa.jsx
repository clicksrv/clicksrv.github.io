import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { media } from '../../components/styled/Grid'

import ArticlesSimple from './shared/ArticlesSimple'
import CompetenciesBarNumber from './shared/CompetenciesBarNumber'
import HeaderClean from './shared/HeaderClean'
import HeadlinesBasic from './shared/HeadlinesBasic'
import PortfoliosInterchangeable from './shared/PortfoliosInterchangeable'

const style = createGlobalStyle`
  ${ArticlesSimple}
  ${CompetenciesBarNumber}
  ${HeaderClean}
  ${HeadlinesBasic}
  ${PortfoliosInterchangeable}

  .cv-container {

    // Layout

    .columns {
      display: flex;
      flex-wrap: wrap;

      width: 100%;
    }

    .sidebar {
      width: 100%;

      ${media.md`
        width: 45%;
      `}
    }

    .main {
      width: 100%;

      ${media.md`
        width: 55%;
      `}
    }

    // Margins

    .profile {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .columns {
      padding: ${({ sectionMargins }) => sectionMargins} ${({ horizontalSpacing }) => horizontalSpacing};
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};
      padding-bottom: ${({ sectionMargins }) => math(`${sectionMargins} - 0.5em`)};
    }

    .sidebar {
      ${media.md`
        padding-right: ${({ horizontalSpacing }) => horizontalSpacing};
      `}

      section {
        ${media.md`
          &:last-of-type {
            margin-bottom: 0;
            padding-bottom: 0;
          }
        `}
      }
    }

    .main {
      ${media.md`
        padding-left: ${({ horizontalSpacing }) => horizontalSpacing};
      `}

      section {
        &:last-of-type {
          margin-bottom: 0;
          padding-bottom: 0;
        }
      }
    }

    .user-title {
      margin: 0 ${({ horizontalSpacing }) => horizontalSpacing};
    }

    .contact-links {
      margin: 0 ${({ horizontalSpacing }) => horizontalSpacing};
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    // Spacing

    .placeholder,
    .mce-content-body {
      line-height: ${({ articleSpacing }) => articleSpacing};
    }

    // Borders

    .contact-links {
      border-bottom: 1px solid ${({ primaryColor }) => primaryColor};
    }

    .columns {
      .sidebar {
        ${media.md`
          border-right: 1px solid ${({ primaryColor }) => primaryColor};
        `}
      }

      section {
        border-bottom: 1px solid ${({ primaryColor }) => primaryColor};

        ${media.md`
          &:last-of-type {
            border-bottom: none;
          }
        `}
      }

      .main {
        section {
          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }

    // Competencies

    .competency {
      .competency-level,
      .placeholder,
      .mce-content-body {
        font-size: 87.5%;
      }
    }

    // Portfolio

    .portfolio {
      .asset {
        label {
          min-height: 0.2em;
        }
      }
    }
  }

  .pdf {
    .cv-container {
      .columns {
        padding-bottom: 0;
      }
    }
  }
`

export default style
