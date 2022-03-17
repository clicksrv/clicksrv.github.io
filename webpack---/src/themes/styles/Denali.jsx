import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { media } from '../../components/styled/Grid'

import ArticlesDuoColor from './shared/ArticlesDuoColor'
import ArticlesSimple from './shared/ArticlesSimple'
import ArticlesTimeseries from './shared/ArticlesTimeseries'
import ArticlesTimeseriesThicker from './shared/ArticlesTimeseriesThicker'
import CompetenciesColumns12 from './shared/CompetenciesColumns-1-2'
import CompetenciesDashesNumber from './shared/CompetenciesDashesNumber'
import HeaderDuoColor from './shared/HeaderDuoColor'
import HeadlinesSimple from './shared/HeadlinesSimple'
import LayoutColumnsSwapped from './shared/LayoutColumnsSwapped'
import PortfoliosInterchangeable from './shared/PortfoliosInterchangeable'
import PortfoliosInterchangeableBorderless from './shared/PortfoliosInterchangeableBorderless'

const TimeseriesStyle = createGlobalStyle`
  ${ArticlesTimeseries}
`

const ThemeStyle = createGlobalStyle`
  ${ArticlesSimple}
  ${ArticlesDuoColor}
  ${ArticlesTimeseriesThicker}
  ${CompetenciesColumns12}
  ${CompetenciesDashesNumber}
  ${HeaderDuoColor}
  ${HeadlinesSimple}
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
        width: 32%;
      `}
    }

    .main {
      width: 100%;

      ${media.md`
        width: 68%;
      `}
    }

    // Columns swapped override

    .main {
      ${media.md`
        .profile {
          display: block;
        }
      `}
    }


    // Margins

    .main,
    .sidebar {
      padding: 0 ${({ horizontalSpacing }) => horizontalSpacing} ${({ sectionMargins }) => sectionMargins};

      .profile {
        padding-top: ${({ sectionMargins }) => sectionMargins};
      }
    }

    .sidebar {
      padding-bottom: 0;

      ${media.md`
        padding-bottom: ${({ sectionMargins }) => sectionMargins};
      `}

      .profile {
        margin-left: -${({ sectionMargins }) => sectionMargins};
        margin-right: -${({ sectionMargins }) => sectionMargins};
        padding-bottom: ${({ sectionMargins }) => sectionMargins};

        ${media.md`
          margin-left: 0;
          margin-right: 0;
          padding-bottom: 0;
          margin-bottom: 0;
        `}
      }
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};
      padding: 0 ${({ articleHorizontalSpacing }) => math(`${articleHorizontalSpacing} * 1.5`)};

      header {
        margin: 0 -${({ articleHorizontalSpacing }) => math(`${articleHorizontalSpacing} * 1.5`)};
      }
    }

    .sidebar {
      ${media.md`
        padding-right: ${({ horizontalSpacing }) => horizontalSpacing};
      `}

      section {
        padding-left: ${({ articleHorizontalSpacing }) => articleHorizontalSpacing};
        padding-right: ${({ articleHorizontalSpacing }) => articleHorizontalSpacing};

        header {
          margin-left: -${({ articleHorizontalSpacing }) => articleHorizontalSpacing};
          margin-right: -${({ articleHorizontalSpacing }) => articleHorizontalSpacing};
        }

        ${media.md`
          &:last-of-type {
            margin-bottom: 0;
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
        }
      }
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
        // 1px so that wkhtmltopdf does not cut the border around avatar
        padding-top: 1px;
      }

      .sidebar {
        padding-bottom: 0;
      }
    }
  }
`

const Style = (props) => {
  const { articleMargins } = props

  // timeline offset is a derived/calculated attribute (from `articleMargins`)
  // that's why there is an additional `createGlobalStyle` component layer on
  // top so that this value can be calculated
  const timelineOffset = math(`${articleMargins} * 0.1 + 0.1em`)

  return (
    <>
      <TimeseriesStyle
        {...props}
        timelineOffset={timelineOffset}
      />
      <ThemeStyle {...props} />
    </>
  )
}

Style.propTypes = {
  articleMargins: PropTypes.string.isRequired,
}

export default Style
