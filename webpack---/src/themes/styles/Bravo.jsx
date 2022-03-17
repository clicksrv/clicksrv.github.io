import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import { math, transparentize } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx } from '../../components/styled/Grid'

import ArticlesTimeseries from './shared/ArticlesTimeseries'
import CompetenciesBarPercentage from './shared/CompetenciesBarPercentage'
import PortfoliosInterchangeable from './shared/PortfoliosInterchangeable'

const { md, lg } = breakpointsPx

const TimeseriesStyle = createGlobalStyle`
  ${ArticlesTimeseries}
  ${CompetenciesBarPercentage}
  ${PortfoliosInterchangeable}
`

const ThemeStyle = createGlobalStyle`
  .cv-container {
    .cv-content {
      padding: ${({ headerSpacing }) => math(`${headerSpacing} * 0.8`)} ${({ headerSpacing }) => headerSpacing};
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0;
    }

    h2 {
      border-bottom: 1px solid ${({ subtleColor }) => subtleColor};
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 300%;
      font-weight: normal;
      line-height: 110%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
      padding-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3`)};
    }

    h3 {
      border-bottom: 1px solid ${({ subtleColor }) => subtleColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 200%;
      font-weight: normal;
      line-height: 100%;

      margin-bottom: 0.35em;
      padding-bottom: 6px;
    }

    h4 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 150%;
      font-weight: normal;

      margin-bottom: 0.3em;
    }

    h5 {
      color: ${({ secondaryColor }) => secondaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      font-weight: bold;
      line-height: 150%;

      margin-bottom: 0.4em;
    }

    h6 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 81.25%;
      font-weight: normal;

      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.15em`)};
    }

    a,
    [data-bind=email] span span,
    a[data-bind=organization_url] span span,
    a[data-bind=link_url] span span {
      text-decoration: underline;
    }

    p {
      margin-bottom: 0.5em;
    }

    p, ol, ul {
      color: ${({ bodyColor }) => transparentize(0.5, bodyColor)};
    }

    .cv-header {
      display: flex;
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      section:first-child {
        article {
          display: flex;
        }
      }
    }

    .user-thumb {
      box-shadow: 0 10px 30px 0 ${({ bodyColor }) => transparentize(0.8, bodyColor)};

      margin-right: ${({ headerSpacing }) => math(`${headerSpacing} * 0.8`)};
      height: 240px;
      width: 240px;
    }

    .vcard {
      margin-right: ${({ headerSpacing }) => math(`${headerSpacing} * 0.4`)};
      min-width: 230px;

      .user-contact,
      .user-links {
        color: ${({ bodyColor }) => transparentize(0.15, bodyColor)};
        line-height: 130%;

        li {
          margin-bottom: 0.6em;
          margin-top: 0.2em;

          a,
          &[data-bind=email] span span {
            color: ${({ bodyColor }) => transparentize(0.15, bodyColor)};
            text-decoration: none;
          }

          i {
            display: none;
          }

          &:before {
            color: ${({ secondaryColor }) => secondaryColor};
            font-family: 'Icons';
            text-align: center;
            vertical-align: middle;

            display: inline-block;
            margin-bottom: 1px;
            margin-right: 0.5em;
            width: 1.35em;
          }

          &.full-name:before {
            content: '\\e902';
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
    }

    .columns {
      width: 100%;

      display: flex;
      flex-wrap: wrap;
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};

      header {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3 + 1em`)};
      }

      .date-range {
        color: ${({ bodyColor }) => transparentize(0.55, bodyColor)};
      }
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    .sidebar {
      padding-left: 3em;
      width: 45%;
    }

    .main {
      width: 55%;
    }

    .mce-content-body {
      line-height: 150%;
    }

    .competency {
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.8`)};

      header {
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2 + 0.1em`)};
      }

      .placeholder,
      .mce-content-body {
        font-size: 81.25%;
      }
    }

    // Portfolio overrides
    .portfolio {
      .asset {
        label {
          min-height: 0.2em;
        }
      }
    }

    @media screen and (max-width: ${lg}) {
      .cv-content {
        padding: ${({ headerSpacing }) => math(`${headerSpacing} * 0.6`)} ${({ headerSpacing }) =>
  math(`${headerSpacing} * 0.8`)};
      }

      .user-thumb {
        margin-right: ${({ headerSpacing }) => math(`${headerSpacing} * 0.5`)};
        height: 230px;
        width: 230px;
      }

      .vcard {
        margin-right: ${({ headerSpacing }) => math(`${headerSpacing} * 0.2`)};
        min-width: 210px;
      }
    }

    @media screen and (max-width: ${md}) {
      h2 {
        font-size: 250%;
      }

      .cv-content {
        padding: ${({ headerSpacing }) => math(`${headerSpacing} * 0.3`)} ${({ headerSpacing }) =>
  math(`${headerSpacing} * 0.4`)};
      }

      .cv-header {
        flex-wrap: wrap;

        section {
          width: 100%;
        }

        section:first-child {
          article {
            flex-wrap: wrap;

            .user-thumb {
              margin-bottom: ${({ sectionMargins }) => sectionMargins};
            }
          }
        }
      }

      .vcard {
        min-width: 230px;
      }

      .sidebar {
        padding-left: 0;
        width: 100%;
      }

      .main {
        width: 100%;
      }
    }
  }

  .pdf {
    .cv-container {
      // headline
      section:first-of-type {
        margin-bottom: ${({ sectionMargins }) => sectionMargins} !important;
      }

      .cv-content {
        padding-top: 0;
        padding-bottom: 0;

        // override overrides from cv.less
        section:last-of-type {
          article:last-of-type {
            h2 {
              margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.5`)} !important;
              padding-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3`)} !important;
            }
          }
        }
      }

      a,
      [data-bind=email] span span,
      a[data-bind=organization_url] span span,
      a[data-bind=link_url] span span {
        text-decoration: none;
      }

      h2,
      h3 {
        // border with background color is required to fix issue with wkhtmltopdf
        border: 1px solid ${({ backgroundColor }) => backgroundColor};
        border-bottom-color: ${({ subtleColor }) => subtleColor};
      }

      .cv-header {
        // summary
        section:last-child {
          ${flex('1')}
        }
      }

      .user-thumb {
        margin-right: ${({ headerSpacing }) => math(`${headerSpacing} * 0.5`)};
      }

      .asset-thumb {
        .asset-overlay {
          display: none;
        }
      }
    }
  }
`

const Style = (props) => {
  const { articleMargins } = props

  // timeline offset is a derived/calculated attribute (from `articleMargins`)
  // that's why there is an additional `createGlobalStyle` component layer on
  // top so that this value can be calculated
  const timelineOffset = math(`${articleMargins} * 0.1 + 1.8em`)

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
