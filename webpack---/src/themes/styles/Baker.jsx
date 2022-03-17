import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import { lighten, math } from 'polished'

import { media } from '../../components/styled/Grid'

import ArticlesPikeNose from './shared/ArticlesPikeNose'
import ArticlesTimeseries from './shared/ArticlesTimeseries'
import ArticlesTimeseriesSpaced from './shared/ArticlesTimeseriesSpaced'
import CompetenciesColumns12 from './shared/CompetenciesColumns-1-2'
import CompetenciesBarNumber from './shared/CompetenciesBarNumber'
import HeaderPikeNose from './shared/HeaderPikeNose'
import LayoutColumnsSwapped from './shared/LayoutColumnsSwapped'
import PortfoliosInterchangeable from './shared/PortfoliosInterchangeable'
import PortfoliosInterchangeableBorderless from './shared/PortfoliosInterchangeableBorderless'

const PikeNoseStyle = createGlobalStyle`
  ${ArticlesPikeNose}
`

const ThemeStyle = createGlobalStyle`
  ${ArticlesTimeseries}
  ${ArticlesTimeseriesSpaced}
  ${CompetenciesColumns12}
  ${CompetenciesBarNumber}
  ${HeaderPikeNose}
  ${LayoutColumnsSwapped}
  ${PortfoliosInterchangeable}
  ${PortfoliosInterchangeableBorderless}

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
        width: 33.3%;
      `}
    }

    .main {
      width: 100%;

      ${media.md`
        width: 66.7%;
      `}
    }

    // Margins

    .main {
      padding: 0 ${({ horizontalSpacing }) => horizontalSpacing} ${({ sectionMargins }) => sectionMargins};

      ${media.md`
        padding-top: 3em;
      `}
    }

    .sidebar {
      padding: 0 ${({ horizontalSpacing }) => horizontalSpacing};

      ${media.md`
        padding-bottom: ${({ sectionMargins }) => sectionMargins};
      `}
    }

    .profile {
      margin: 0 -${({ horizontalSpacing }) => horizontalSpacing} ${({ sectionMargins }) => sectionMargins};

      .article-body {
        padding: 3em ${({ horizontalSpacing }) => horizontalSpacing} 28%;
      }
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

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }

      &.competency {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
      }
    }

    // Border between dated stories

    .dated_story {
      .article-headings {
        position: relative;

        &:before {
          background-color: ${({ secondaryColor }) => lighten(0.02, secondaryColor)};
          content: '';

          position: absolute;
          top: -${({ articleMargins }) => math(`${articleMargins} * 0.5 - 0.3em`)};
          left: 0;
          right: 0;

          height: 1px;
        }
      }

      article:first-of-type {
        .article-headings {
          &:before {
            display: none;
          }
        }
      }
    }

    // Spacing

    .placeholder,
    .mce-content-body {
      line-height: ${({ articleSpacing }) => articleSpacing};
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
          color: ${({ bodyColor }) => bodyColor};
        }
      }
    }
  }

  .pdf {
    .cv-container {
      .profile {
        .article-body {
          // 1px so that wkhtmltopdf does not cut the round border around avatar
          padding-top: 1px;
        }
      }

      .main {
        // 1px for wkhtmltopdf just in case
        padding-top: 1px;
      }

      .sidebar {
        padding-bottom: 0;
      }
    }
  }
`

const Style = (props) => {
  const { secondaryColor } = props

  // articlePikeNoseColor is a derivied/calculated attribute
  // that's why there is an additional `createGlobalStyle` component layer on
  // top so that this value can be set dynamically
  const articlePikeNoseColor = secondaryColor

  return (
    <>
      <PikeNoseStyle
        {...props}
        articlePikeNoseColor={articlePikeNoseColor}
      />
      <ThemeStyle {...props} />
    </>
  )
}

Style.propTypes = {
  secondaryColor: PropTypes.string.isRequired,
}

export default Style
