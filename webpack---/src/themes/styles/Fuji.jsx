import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { media } from '../../components/styled/Grid'

import ArticlesSimple from './shared/ArticlesSimple'
import CompetenciesColumns22 from './shared/CompetenciesColumns-2-2'
import CompetenciesDial from './shared/CompetenciesDial'
import HeaderFlag from './shared/HeaderFlag'
import HeadlinesChroma from './shared/HeadlinesChroma'
import ProfileColumns3 from './shared/ProfileColumns-3'
import PortfoliosInterchangeable from './shared/PortfoliosInterchangeable'
import PortfoliosInterchangeableBorderless from './shared/PortfoliosInterchangeableBorderless'

const style = createGlobalStyle`
  ${ArticlesSimple}
  ${CompetenciesColumns22}
  ${CompetenciesDial}
  ${HeaderFlag}
  ${HeadlinesChroma}
  ${ProfileColumns3}
  ${PortfoliosInterchangeable}
  ${PortfoliosInterchangeableBorderless}

  .cv-container {

    // Layout

    .columns {
      display: flex;
      flex-wrap: wrap;
    }

    .main,
    .sidebar {
      width: 100%;

      ${media.md`
        width: 50%;
      `}
    }

    // Margins

    .main,
    .sidebar {
      padding: ${({ sectionMargins }) => math(`${sectionMargins} * 0.3`)} ${({ horizontalSpacing }) =>
  horizontalSpacing};
    }

    .profile {
      padding: ${({ sectionMargins }) => math(`${sectionMargins} + 1em`)} ${({ horizontalSpacing }) =>
  horizontalSpacing} 21%;

      margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.9`)};

      ${media.md`
        padding-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.7 + 0.5em`)};
        padding-bottom: 3%;
      `}
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};
    }

    .main {
      section {
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .sidebar {
      section {
        &:last-of-type {
          margin-bottom: 0;

          ${media.md`
            margin-bottom: ${({ sectionMargins }) => sectionMargins};
          `}
        }
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }

      &.competency {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
      }
    }

    // Border between columns

    ${media.md`
      .main,
      .sidebar {
        border: 2px solid ${({ secondaryColor }) => secondaryColor};
      }

      .main {
        border-width: 0 0 0 2px;
      }

      .sidebar {
        border-width: 0 2px 0 0;
      }
    `}

    // Spacing

    .placeholder,
    .mce-content-body {
      line-height: ${({ articleSpacing }) => articleSpacing};
    }

    // Text alignment

    ${media.md`
      .sidebar {
        text-align: right;

        h3 {
          margin-right: ${({ headlineChromaOffsetX }) => headlineChromaOffsetX};
        }

        .competency {
          text-align: left;

          &:nth-of-type(odd) {
            margin-right: 0;
          }

          &:nth-of-type(even) {
            margin-left: 6%;
          }
        }

        .row {
          .asset {
            float: right;
          }
        }

        .add-article,
        .add-section {
          margin-left: auto;
        }
      }
    `}

    // Competencies

    .competency {
      .competency-name {
        font-size: 87.5%;
        font-weight: bold;
      }

      .competency-level {
        color: ${({ primaryColor }) => primaryColor};
      }

      .placeholder,
      .mce-content-body {
        font-size: 87.5%;
      }
    }

    // Portfolio

    .portfolio {
      .asset {
        label {
          color: ${({ bodyColor }) => bodyColor};
        }
      }
    }
  }

  .pdf {
    .cv-container {
      section.profile:last-of-type {
        // override 0 padding/margin rule from cv.less
        padding-bottom: 4% !important;
        margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.9`)} !important;
      }

      .sidebar,
      .main {
        // fix wrong 1px border added automagically by wkhtmltopdf
        border-top: 1px solid transparent;
      }

      .sidebar {
        // wkhtmltopdf cannot have non-zero paddings, otherwise there are blank pages
        padding-bottom: 0;
      }
    }
  }
`

export default style
