import { createGlobalStyle } from 'styled-components'
import { darken, math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'

import certifications from '../../assets/images/icons/brooklyn-certifications.png'
import competencies from '../../assets/images/icons/brooklyn-competencies.png'
import degrees from '../../assets/images/icons/brooklyn-degrees.png'
import portfolios from '../../assets/images/icons/brooklyn-portfolios.png'
import positions from '../../assets/images/icons/brooklyn-positions.png'
import quote from '../../assets/images/icons/brooklyn-quote.png'
import references from '../../assets/images/icons/brooklyn-references.png'
import summary from '../../assets/images/icons/brooklyn-summary.png'

import PortfoliosOverlay from './shared/PortfoliosOverlay'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${PortfoliosOverlay}

  .cv-container {
    padding: 0 0 75px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    label {
      margin-top: 0;
      margin-bottom: 0.1em;
    }

    h1,
    h3,
    h4,
    h6
    .user-contact,
    .user-links {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
    }

    h1 {
      font-size: 350%;
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
    }

    h3 {
      font-weight: bold;
      font-size: 100%;
    }

    h3,
    h4 {
      color: ${({ primaryColor }) => primaryColor};
    }

    h4,
    h5,
    h6,
    label,
    .user-contact,
    .user-links {
      font-size: 100%;
      font-weight: bold;
      text-transform: uppercase;
    }

    h5 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      color: ${({ secondaryColor }) => secondaryColor};
    }

    h6 {
      font-weight: normal;
    }

    .quote {
      background-image: url(${quote}) center no-repeat;
      background-size: contain;

      float: left;
      height: 14px;
      margin-right: 15px;
      width: 17px;
    }

    // Contact Section
    .vcard {
      // !important to override styles in Editor.jsx
      background-color: ${({ primaryColor }) => primaryColor} !important;
      color: white;
      overflow-wrap: anywhere;

      display: flex;

      height: 300px;
      margin: 0;
      padding-left: 40px;

      .user-photo {
        height: 100%;
        min-width: 6%;
        position: relative;

        ${flex('0 0 auto')}

        &:hover {
          .user-thumb,
          .user-thumb.visible {
            opacity: 1;

            ${media.md`
              opacity: ${({ inEditor }) => (inEditor ? 0.95 : 0.6)};
            `}
          }

          .gradient-overlay {
            z-index: 0;
          }
        }

        .user-thumb {
          transition: opacity 0.2s;
          z-index: 1;

          height: 300px;
          width: 300px;

          &.visible {
            opacity: 1;

            ${media.md`
              opacity: 0.6;
            `}
          }

          &.visible + .gradient-overlay {
            display: block;
          }
        }

        .gradient-overlay {
          // -webkit prefixed gradient required for wkhtmltopdf
          background-image: -webkit-linear-gradient(left, ${({ primaryColor }) =>
            primaryColor} 0%, transparent 30%, transparent 70%, ${({ primaryColor }) =>
  primaryColor} 100%); // for htmltopdf
          background-image: linear-gradient(90deg, ${({ primaryColor }) =>
            primaryColor} 0%, transparent 30%, transparent 70%, ${({ primaryColor }) => primaryColor} 100%);
          z-index: 1;

          display: none;
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        .image-placeholder {
          background-color: transparent;
        }
      }

      .full-name {
        font-weight: bold;
        line-height: 0.9em;
        text-transform: uppercase;

        margin: 0;
      }

      .user-contact {
        margin-top: 2.75em;
        margin-left: 4px;
        padding: 0;
      }

      .user-links  {
        margin-left: 2px;
      }

      a,
      [data-bind=email] span span {
        color: white;
        font-size: 90%;
      }

      .title {
        font-weight: normal;
        font-size: 150%;
        letter-spacing: 1px;
      }

      .user-contact,
      .user-links {
        li {
          color: white;
          letter-spacing: 1px;
          list-style: none;

          display: inline-block;
          margin-bottom: 0.25em;
          margin-right: 0.7em;

          &:after {
            // wkhtmltopdf fix for unnecessary line breaks
            content: '\\00a0';
          }

          i {
            text-align: left;
          }
        }
      }

      .user-contact-wrap {
        // -webkit prefixed gradient required for wkhtmltopdf
        background-image: -webkit-linear-gradient(left, ${({ primaryColor }) => primaryColor} 0%, ${({
  primaryColor,
}) => darken(0.1, primaryColor)} 100%); // for htmltopdf
        background-image: linear-gradient(90deg, ${({ primaryColor }) => primaryColor} 0%, ${({ primaryColor }) =>
  darken(0.1, primaryColor)} 100%);
        ${flex('1 1 auto')}

        padding-right: 1em;
        padding-top: 70px;

        .user-contact {
          li {
            &:before {
              font-family: FontAwesome;

              display: inline-block;
              margin-right: 0.25em;
              width: 1em;
            }

            &.locality:before {
              content: '\\f041';

              width: 0.8em;
            }

            &.phone:before {
              content: '\\f095';

              width: 0.9em;
            }

            &.email:before {
              content: '\\f003';

              width: 1.2em;
            }
          }
        }

        p {
          margin-bottom: 2px;
        }

        .separator-h {
          margin: auto 1em;

          &:after {
            content: '|';
            color: ${({ subtleColor }) => subtleColor};
          }
        }
      }
    }

    [data-bind=add-section-btn] {
      margin-left: 6%;
    }

    section {
      margin: 0 6% ${({ sectionMargins }) => sectionMargins};

      &.profile {
        margin-right: 0;
        margin-left: 0;
      }

      .article-headings {
        float: left;
        width: 38%;
      }

      .article-body {
        padding-left: 40%;
      }

      header {
        text-align: center;
        text-transform: uppercase;

        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
        width: 100%;

        .header-text {
          background-color: ${({ backgroundColor }) => backgroundColor};
          text-align: center;
          vertical-align: middle;

          display: inline-block;
          margin: 0;
          padding: 10px 15px;
          position: relative;
          z-index: 1;

          span {
            margin: 2px;
          }
        }

        &:after {
          content: '';
          display: block;
          top: 1.5em;
          border-bottom: 1px solid ${({ faintColor }) => faintColor};
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 0;
        }
      }
    }

    // --- Section Icons --- //

    .header-text {
      span {
        span {
          vertical-align: middle;
        }
      }

      &:before {
        content: '';
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin-right: 0.5em;
        display: inline-block;
        background-image: url(${references});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    #summary .header-text:before {
      background-image: url(${summary});
    }

    .dated_story .header-text:before {
      background-image: url(${positions});
    }

    #degrees .header-text:before {
      background-image: url(${degrees});
    }

    .portfolio .header-text:before {
      background-image: url(${portfolios});
    }

    #strengths .header-text:before {
      background-image: url(${competencies});
    }

    #certifications .header-text:before {
      background-image: url(${certifications});
    }

    #references .header-text:before {
      background-image: url(${references});
    }

    #summary article {
      font-size: 115%;
      text-align: center;
      padding-left: 5%;
      padding-right: 5%;
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    .competency {
      &:nth-child(2n + 1) {
        clear: both;
      }

      .article-headings,
      .article-body {
        float: none;
        padding-left: 0;
        width: initial;
      }

      .competency-bar {
        border-radius: 3px;

        display: inline-block;
        margin-bottom: 0.2em;
        width: 180px;
      }

      .competency-level {
        border-radius: 3px;
      }
    }

    .portfolio {
      label {
        color: white;
      }

      a {
        label {
          color: white;
          font-size: 90%;

          margin: 0;
        }
      }

      .asset-thumb {
        border-width: 5px;

        position: relative;

        &:hover {
          .css-crop {
            filter: none;
          }
        }

        .css-crop {
          filter: none;
        }
      }
    }

    section[data-table='text_stories'],
    section[data-table='graph_stories'] {
      header h3 {
        padding: 15px;
        font-weight: bold;
      }
    }

    .skills {
      form {
        width: 100%;
        float: left;
      }
    }

    .competency {
      .meta-editor {
        display: inline-block;
      }
    }

    section[data-table='competencies'] {
      article:nth-child(2n + 1) {
        clear: both;
      }
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      h1 {
        font-size: 250%;
      }

      article {
        .article-headings,
        .article-body {
          float: none;
          padding-left: 0;
          width: 100% !important;
        }
      }

      .vcard {
        flex-wrap: wrap;

        height: auto;
        padding-left: 0;

        .user-contact {
          margin-top: 1em;
        }

        .user-contact-wrap {
          background-color: transparent;
          text-align: center;

          height: auto;
          padding: 25px 0;
          position: relative;
        }

        .user-photo {
          height: 160px;
          margin: 20px auto 0;
          width: 240px;

          .user-thumb {
            border: 2px solid ${({ subtleColor }) => subtleColor};
            border-radius: 2px;

            height: 100%;
            width: 100%;

            &.visible + .gradient-overlay {
              display: none;
            }
          }
        }
      }

      .competency {
        .competency-bar {
          width: 100%;
        }
      }
    }
  }

  .pdf {
    .cv-container {
      margin: 0;

      h1,
      h3,
      h4,
      h5,
      label {
        // wkhtml cannot deal with non-default letter spacing
        letter-spacing: initial !important;
      }

      .vcard {
        .user-photo {
          // force wkhtmltopdf edge match
          margin-left: -1px;
          margin-bottom: 1px;
        }

        .title,
        .user-contact li,
        .user-links li {
          letter-spacing: initial;
        }

        &:after {
          display: none;
          content: '';
        }
      }

      .header-text:after {
        // wkhtmltopdf fix for unnecessary line breaks
        content: '\\00a0';

        padding-right: 0;
      }

      .portfolio {
        .overlay {
          opacity: 1 !important;
        }
      }
    }
  }

  @page {
    margin: 1.2cm;
  }
`

export default style
