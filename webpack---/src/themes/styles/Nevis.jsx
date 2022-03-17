import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { media } from '../../components/styled/Grid'

import ArticlesBoxed from './shared/ArticlesBoxed'
import ArticlesSimple from './shared/ArticlesSimple'
import CompetenciesColumns12 from './shared/CompetenciesColumns-1-2'
import CompetenciesStars from './shared/CompetenciesStars'
import HeaderCleanSidebar from './shared/HeaderCleanSidebar'
import HeaderOctagonal from './shared/HeaderOctagonal'
import HeadlinesSimple from './shared/HeadlinesSimple'
import LayoutColumnsSwapped from './shared/LayoutColumnsSwapped'
import PortfoliosInterchangeable from './shared/PortfoliosInterchangeable'
import PortfoliosInterchangeableBorderless from './shared/PortfoliosInterchangeableBorderless'

const style = createGlobalStyle`
  ${ArticlesBoxed}
  ${ArticlesSimple}
  ${CompetenciesColumns12}
  ${CompetenciesStars}
  ${HeaderCleanSidebar}
  ${HeaderOctagonal}
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
        width: 38%;
      `}
    }

    .main {
      width: 100%;

      ${media.md`
        width: 62%;
      `}
    }

    // Margins

    .main {
      ${media.md`
        padding-top: ${({ sectionMargins }) => math(`${sectionMargins} * 0.7`)};
      `}

      section[data-bind="sections"],
      [data-bind="add-section-btn"] {
        padding-right: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 0.8`)};
        padding-left: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 0.8`)};

        ${media.md`
          padding-right: ${({ horizontalSpacing }) => horizontalSpacing};
          padding-left: ${({ horizontalSpacing }) => horizontalSpacing};
        `}
      }
    }

    .sidebar {
      section[data-bind="sidebar_sections"],
      [data-bind="add-sidebar-section-btn"] {
        padding-left: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 0.8`)};
        padding-right: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 0.8`)};
      }
    }

    .profile {
      margin-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.8`)};

      padding-top: ${({ sectionMargins }) => math(`${sectionMargins} + 0.5em`)};
      padding-right: ${({ horizontalSpacing }) => horizontalSpacing};
      padding-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.5`)};
      padding-left: ${({ horizontalSpacing }) => horizontalSpacing};

      ${media.md`
        padding-left: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 0.6`)};
        padding-right: ${({ horizontalSpacing }) => math(`${horizontalSpacing} * 0.6`)};
      `}
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    // Article overrides

    h5 {
      text-align: right;
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
      .main {
        padding-top: 0;
      }

      .sidebar {
        padding-bottom: 0;
      }

      .profile {
        // to not cut the octagonal border around avatar
        padding-top: 11px;
      }
    }
  }
`

export default style
