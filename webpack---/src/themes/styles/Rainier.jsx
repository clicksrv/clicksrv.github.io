import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { media } from '../../components/styled/Grid'

import ArticlesBoxed from './shared/ArticlesBoxed'
import ArticlesPikeNose from './shared/ArticlesPikeNose'
import CompetenciesColumns12 from './shared/CompetenciesColumns-1-2'
import CompetenciesDotsNumber from './shared/CompetenciesDotsNumber'
import HeaderOctagonal from './shared/HeaderOctagonal'
import LayoutColumnsSwapped from './shared/LayoutColumnsSwapped'
import PortfoliosInterchangeable from './shared/PortfoliosInterchangeable'
import PortfoliosInterchangeableBorderless from './shared/PortfoliosInterchangeableBorderless'
import ProfileColumns3 from './shared/ProfileColumns-3'

const PikeNoseStyle = createGlobalStyle`
  ${ArticlesPikeNose}
`

const ThemeStyle = createGlobalStyle`
  ${ArticlesBoxed}
  ${CompetenciesColumns12}
  ${CompetenciesDotsNumber}
  ${HeaderOctagonal}
  ${LayoutColumnsSwapped}
  ${PortfoliosInterchangeable}
  ${PortfoliosInterchangeableBorderless}
  ${ProfileColumns3}

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
        width: 33%;
      `}
    }

    .main {
      width: 100%;

      ${media.md`
        width: 67%;
      `}
    }

    // Margins

    .main,
    .sidebar {
      padding: ${({ sectionMargins }) => math(`${sectionMargins} * 0.8`)}
        ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 0.6`)}
        ${({ sectionMargins }) => sectionMargins};

      ${media.md`
        padding-right: ${({ horizontalSpacing }) => horizontalSpacing};
        padding-left: ${({ horizontalSpacing }) => horizontalSpacing};
      `}
    }

    .sidebar {
      ${media.md`
        padding-bottom: ${({ sectionMargins }) => sectionMargins};
        padding-right: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 0.6`)};
      `}
    }

    .main {
      padding-bottom: 0;

      ${media.md`
        padding-left: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 0.6`)};
        padding-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.8`)};
      `}
    }

    .profile {
      padding: ${({ sectionMargins }) => math(`${sectionMargins} + 0.5em`)}
        ${({ horizontalSpacing }) => horizontalSpacing}
        ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)};

      .user-photo {
        ${media.md`
          margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5 + 0.5em`)};
        `}
      }
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      &:last-of-type {
        margin-bottom: 0;

        ${media.md`
          margin-bottom: ${({ sectionMargins }) => sectionMargins};

          &.profile {
            margin-bottom: 0;
          }
        `}
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    // Header overrides

    .vcard {
      ${media.md`
        .user-title {
          padding-right: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 1.5`)};
        }

        .contact-links {
          margin-top: 1em;
          padding-left: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 1.5`)};
        }
      `}
    }

    // Article overrides

    .cv-content {
      h3 {
        font-size: 112.5%;
        font-weight: normal;
        letter-spacing: 0;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.8`)};
      }

      h4 {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2`)};
      }

      h5 {
        font-size: 87.5%;

        ${media.md`
          text-align: right;
        `}
      }

      h6 {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2`)};
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
      section[data-bind=profile] {
        // override 0 padding/margin rule from shared styles
        padding-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)} !important;
      }

      .sidebar {
        padding-bottom: 0;
      }
    }
  }
`

const Style = (props) => {
  const { primaryColor } = props

  // articlePikeNoseColor is a derivied/calculated attribute
  // that's why there is an additional `createGlobalStyle` component layer on
  // top so that this value can be set dynamically
  const articlePikeNoseColor = primaryColor

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
  primaryColor: PropTypes.string.isRequired,
}

export default Style
