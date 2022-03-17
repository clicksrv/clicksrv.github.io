import { createGlobalStyle } from 'styled-components'
import { math } from 'polished'

import { flex } from './shared/Mixins'
import { breakpointsPx, media } from '../../components/styled/Grid'

import docThumb from '../../assets/images/icons/doc-thumb.png'
import photoThumb from '../../assets/images/icons/photo-thumb.png'
import videoThumb from '../../assets/images/icons/video-thumb.png'

import ArticlesTimeline from './shared/ArticlesTimeline'

const { md } = breakpointsPx

const style = createGlobalStyle`
  ${ArticlesTimeline}

  .cv-container {
    h1 {
      color: #333;
      font-size: 350%;
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      letter-spacing: -0.5px;
      line-height: 100%;

      margin: 0 0 10px;
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 130%;

      margin: 0 0 0.5em;
    }

    h3,
    h6,
    label {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 100%;
      text-transform: uppercase;
    }

    h3,
    h4,
    h5 {
      font-size: 115%;
      font-weight: bold;
      letter-spacing: 1.5px;

      margin: 0;
    }

    h4 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
    }

    h5 {
      color: #555;
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: normal;
    }

    h6,
    label {
      letter-spacing: 0.5px;

      margin: 0;
    }

    .date-range {
      text-align: left;

      max-width: 175px;
    }

    .user-contact,
    .user-links {
      font-family: ${({ headerFontFamily }) => headerFontFamily};

      a,
      [data-bind=email] span {
        text-decoration: underline;
      }
    }

    #summary {
      font-size: 125%;
      margin: 0;

      article,
      .about-text {
        margin: 0; // causes a white gap if summary = null
      }

      .clearfix {
        height: 1em
      }
    }

    section {
      margin-bottom: ${({ sectionMargins }) => sectionMargins};
      padding: 0 8%;
    }

    article {
      margin-bottom: ${({ articleMargins }) => articleMargins};

      &:last-child {
        margin-bottom: 0;
      }
    }

    header {
      background-color: ${({ secondaryColor }) => secondaryColor};
    }

    .vcard {
      display: flex;

      padding-top: 40px;
      padding-bottom: 25px;

      .user-details {
        ${flex('1 1 auto')}
      }

      .full-name {
        font-weight: bold;
      }

      .given-name,
      .family-name {
        text-transform: capitalize;
      }
    }

    .profile {
      margin: 0;

      .user-thumb {
        border: 1px solid ${({ bodyColor }) => bodyColor};
        border-radius: 50%;

        height: 125px;
        margin: 0 25px 0 0;
        width: 125px;

        .css-crop,
        .image-placeholder {
          border-radius: 50%;
        }
      }

      .user-contact,
      .user-links {
        font-size: 0.9em;
        font-weight: normal;

        li {
          color: #555;
          list-style: none;

          display: inline-block;

          &:before {
            vertical-align: middle;

            margin-left: 1px;
          }

          &.locality:before {
            width: 0.8em;
          }

          &.phone:before {
            width: 0.9em;
          }

          &.email:before {
            width: 1.2em;
          }
        }

        a {
          color: #555;
          line-height: 1.5em;
          white-space: nowrap;
        }
      }

      .user-contact {
        margin-bottom: 0.15em;

        li:not(:last-child) {
          &:after {
            content: '|';
            color: ${({ subtleColor }) => subtleColor};

            margin: 0 0.5em;
          }
        }
      }

      .user-links {
        li {
          margin-right: 0.7em;
        }

        i {
          text-align: left;
        }
      }
    }

    .title {
      color: ${({ primaryColor }) => primaryColor};
      font-weight: normal;
    }

    .article-body {
      h4,
      h5 {
        margin-bottom: 0.25em;
      }
    }

    // Portfolio Section
    .portfolio {
      .asset-thumb {
        border: 1px solid ${({ faintColor }) => faintColor};
        transition: all 0.3s ease;

        display: block;
        position: relative;

        &:hover {
          .overlay {
            opacity: 0;
          }
        }
      }

      a {
        label {
          cursor: pointer;
        }
      }

      .overlay {
        background-color: rgba(255, 255, 255, 0.9);
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.3s ease;
        z-index: 1;

        position: absolute;

        display: block;
        height: 100%;
        width: 100%;
      }

      .image-asset .overlay {
        background-image: url(${photoThumb});
        background-size: 45px;
      }

      .document-asset .overlay {
        background-image: url(${docThumb});
        background-size: 37px;
      }

      .youtube-asset .overlay {
        background-image: url(${videoThumb});
        background-size: 45px;
      }

      label {
        font-size: 70%;

        margin-top: 0.5em;
        margin-bottom: 1em;
      }

      .css-crop {
        padding-bottom: 75%;
        width: 100%;
      }
    }

    .timeline {
      border-top: 1px solid #e5e5e5;

      padding: 0;

      .timeline-left {
        padding-left: 8%;
        z-index: 1;

        header {
          background-color: transparent;
          margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
        }
      }

      .timeline-right {
        padding-right: 8%
      }

      .timeline-start {
        position: absolute;
        top: -1px;
        width: 11px;
        height: 11px;
        left: 30%;

        &:before {
          content: '';
          position: absolute;
          border-left: 11px solid transparent;
          border-right: 11px solid transparent;
          border-top: 11px solid;
          border-top-color: #e5e5e5;
          top: 0;
          right: -1px;
        }

        &:after {
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid ${({ secondaryColor }) => secondaryColor};
          content: '';
          top: -1px;
          right: 0;
          position: absolute;
          z-index: 1;
        }
      }
    }

    section.timeline-row {
      padding: 0;
    }

    .competency {
      .competency-name {
        font-family: ${({ headerFontFamily }) => headerFontFamily};
        font-weight: bold;
        text-transform: uppercase;
        font-size: 85%;
        letter-spacing: 0.75px;
      }

      .competency-bar {
        width: 200px;
      }

      // first element can't clear both
      &:nth-child(2n+3) {
        clear: both;
      }
    }

    // Gallery
    .gallery {
      &.row {
        margin-left: -5px;
        margin-right: -5px;
      }

      .col-sm-4 {
        padding: 0 5px;
      }
    }

    .user-contact {
      list-style: none;

      margin: 0;
      width: auto;

      li {
        word-break: break-all;
        white-space: nowrap;

        display: inline-block;

        &:last-child:after {
          display: none;
        }

        &:after {
          content: '|';
          color: ${({ subtleColor }) => subtleColor};

          margin: 0 0.5em;
        }

        &:before {
          font-family: FontAwesome;
          font-size: 115%;
          opacity: 0.25;

          display: inline-block;
          margin-right: 0.25em;
          width: 1em;
        }

        &.locality:before {
          content: '\\f041';
        }

        &.phone:before {
          content: '\\f095';
        }

        &.email:before {
          content: '\\f003';
        }
      }
    }

    .user-links {
      li {
        white-space: nowrap;

        i {
          color: ${({ bodyColor }) => bodyColor};
          opacity: 0.25;
        }
      }
    }

    .portfolio {
      .asset.col-sm-3 {
        padding-left: 8px;
        padding-right: 8px;
      }
    }

    // --- Editor --- //

    .section-placeholder {
      padding-bottom: 5em;
    }

    .skills {
      form {
        width: 100%;
        float: left;
      }
    }

    [data-bind=add-section-btn] {
      margin-left: 8%;

      ${media.md`
        margin-left: 33%;
      `}
    }

    // --------------------- //
    // --- Media Queries --- //
    // --------------------- //
    @media screen and (max-width: ${md}) {
      .vcard {
        flex-wrap: wrap;
        text-align: center;

        .user-thumb {
          margin: 0 auto 20px;
        }

        .css-crop {
          margin: 0 auto 15px;
        }

        .user-details {
          width: 100%;
        }
      }

      .timeline {
        .timeline-start {
          left: 8.5px;
        }

        .timeline-left,
        .timeline-right  {
          padding: 0% 8%;
        }

        .holder,
        .holder-rhomb {
          display: none;
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

      h1, h3, h4, h5, h6, label, .competency h6 {
        // wkhtmltopdf doesn't work well with non-default letter spacing
        letter-spacing: initial;
      }

      .vcard {
        padding-top: 3px; // so that wkhtmltopdf won't cut the circle around avatar
      }

      .user-contact, .user-links {
        a,
        [data-bind=email] span span {
          text-decoration: none;
        }
      }

      .portfolio {
        .overlay {
          display: none;
        }
      }
    }
  }
`

export default style
