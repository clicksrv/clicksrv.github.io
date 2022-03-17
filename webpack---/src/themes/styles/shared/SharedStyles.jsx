import { createGlobalStyle } from 'styled-components'
import { ellipsis } from 'polished'

import { breakpointsPx } from '../../../components/styled/Grid'

import play from '../../../assets/images/icons/play.png'

const { xs, lg } = breakpointsPx

// --- Shared CV styles --- //
const SharedStyles = createGlobalStyle`
  html {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    a {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }

  body, input, textarea {
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  // wkhtmltopdf does not support numbered weights, so it’s best to just use normal/bold weights
  // a side effect is that for google fonts we can/will download only two weights
  b, strong {
    font-weight: bold;
  }

  .full-width {
    width: 100%;
  }

  .half-width {
    width: 50%;
  }

  .clickable {
    cursor: pointer;
  }

  .inline {
    display: inline;
  }

  .inline-block {
    display: inline-block !important;
  }

  .nomargin {
    margin: 0px !important;
  }

  .nowrap {
    white-space: nowrap;
  }

  .centered {
    text-align: center;

    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .first {
    margin-top: 0px !important;
  }

  .last {
    margin-bottom: 0px !important;
  }

  .mejs-overlay-button {
    display: none;
  }

  .portfolio {
    .css-crop {
      background-repeat: no-repeat;

      height: 0;
      padding-bottom: 50%;
      width: 100%;

      &.bg-cover {
        background-position: center;
        background-size: cover;
      }
    }
  }

  // --- Shared Components --- //

  .cv-viewer {
    p {
      min-height: 1em; // Important: allows blank newlines to take up space on the PDF, this causes issues in IE for the editor though...
    }

    .vcv-header {
      margin: 0 auto;
      max-width: ${({ cvWidth }) => cvWidth};
      position: relative;
      padding: 30px 0;

      .col-md-6:last-child {
        padding-right: 0;

        @media screen and (max-width: ${lg}) {
          padding-right: 15px;
        }
      }
    }

    .vcv-logo {
      display: block;
      height: 40px;
      padding: 5px 0;
    }

    // hides rendering of empty elements
    article .empty {
      display: none !important;
    }

    footer {
      &.vcv-footer {
        margin-top: 100px;
        padding-bottom: 15px;
        text-align: center;

        p {
          margin: 0;
        }
      }

      .updated-at {
        color: #333;
        opacity: 0.5;
      }
    }
  }

  // websites are 'fullscreen'
  .cv-fullscreen {
    position: relative;

    .vcv-header {
      display: none;
    }

    .vcv-footer {
      width: 100%;
      position: absolute;
      bottom: 0px;
      color: white;
      margin-top: 50px;

      .updated-at {
        display: block;
        margin-bottom: 1em;
        opacity: 0.75;
      }
    }
  }

  // --- CV in Edit Mode --- //

  .portfolio {
    .asset {
      label {
        text-align: center;

        // display even empty labels to force spacing
        // define min-height in theme style to customize spacing
        display: block !important;

        > span {
          display: block;
          width: 100%;

          > span {
            // Ellipsis for asset item description
            ${ellipsis('100%')}
          }
        }
      }
    }
  }

  // --- Global CV Styles --- //

  body {
    // background color behind a CV in web view; when rendering PDF this is overriden
    background-color: #eee;
  }

  .cv-container,
  .cv-content {
    opacity: 1 !important; // Simulate ng-cloak
  }

  .cv-container {
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 1px;
    color: ${({ bodyColor }) => bodyColor};
    font-family: ${({ bodyFontFamily }) => bodyFontFamily};
    font-size: ${({ bodyFontSize }) => bodyFontSize};

    display: block;
    margin: 0 auto 10px;
    min-height: 500px;
    max-width: ${({ cvWidth }) => cvWidth};

    section {
      position: relative;
      word-wrap: break-word;

      .date-range {
        [data-bind=start_date] span,
        [data-bind=end_date] span {
          // prevents dates wrapping in Gallant/Corporate
          white-space: nowrap;
        }

        [data-bind=end_date]:before {
          content: ' - ';
        }
      }
    }

    article {
      // NOTE: could cause certain themes with dual columns block one of the
      // columns if you use floats for columns
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }

    #references {
      .date-range {
        display: none !important;
      }

      .article-body {
        width: 100%;
      }
    }

    svg {
      overflow: visible;
    }

    table {
      width: 100%;
    }

    input[type='month'] {
      position: relative;
      border: none;
      max-width: 100%;
      content: attr(placeholder);
      display: inline-block;

      &:before {
        content: attr(placeholder);
        position: absolute;
      }
    }

    .gallery {
      .asset-thumb {
        display: block;
      }
    }

    .btn {
      margin-bottom: 15px;

      i.subtle {
        opacity: 0.2;
      }

      i {
        opacity: 0.5;
      }

      &.btn-glass {
        background-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 3px 0 rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.7);
      }
    }

    a,
    [data-bind=email] span span,
    a[data-bind=organization_url] span span,
    a[data-bind=link_url] span span {
      color: ${({ linkColor }) => linkColor};
    }

    [data-bind=organization_url] {
      display: block;
    }

    .cv-content {
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }

    // Only show user-thumb container if user uploads an image
    .user-thumb {
      display: none;

      &.visible {
        display: inherit;
      }
    }

    .competency {
      h6 {
        color: black;
        font-family: ${({ bodyFontFamily }) => bodyFontFamily};
        font-size: 100%;
        font-weight: normal;

        margin: 0;
      }

      p {
        margin-bottom: 0;
      }
    }

    .asset-thumb {
      cursor: pointer;

      display: block;
      position: relative;

      .asset-overlay {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 15%;
        opacity: 0.5;
        transition: opacity 0.3s;
        z-index: 1;

        position: absolute;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;

        &:hover {
          opacity: 0.75;
        }

        &.youtube {
          background-image: url(${play});
        }

        img {
          page-break-inside: avoid;
        }
      }
    }

    // match non-editor wrapping in editor
    [contenteditable] {
      overflow-wrap: anywhere;
    }

    .contact_me {
      .description {
        margin-bottom: 20px;
      }

      .input-group {
        font-family: ${({ bodyFontFamily }) => bodyFontFamily};
        font-size: ${({ bodyFontSize }) => bodyFontSize};

        margin-bottom: 20px;

        &.cv_slug-field {
          margin-bottom: 0;
        }
      }

      label,
      input,
      button,
      textarea {
        font-weight: normal;
        line-height: normal;
      }

      label {
        display: block;
        margin-bottom: 4px;
        text-transform: none;
      }

      input[type='text'],
      input[type='email'],
      textarea {
        width: 400px;
        max-width: 100%;
      }

      input[type='text'],
      input[type='email'],
      textarea,
      button[type='submit'] {
        border-radius: 0;
        text-transform: none;

        transition: 0.2s;
      }

      .subject-field input {
        width: 500px;
      }

      textarea {
        width: 500px;
        height: 200px !important;
        margin-bottom: 0;
      }

      .success-message {
        display: none;
      }
    }

    .branding {
      background-color: #0397e7;
      color: white;
      font-size: 13px;
      text-align: center;

      margin-bottom: 0 !important;
      margin-top: 30px !important;
      padding: 12px 0 8px;

      > span {
        margin-left: 11px;
      }

      span {
        opacity: 0.9;
      }

      img {
        margin: 0 10px 4px;
        width: 100px;
      }

      a {
        color: white !important;
        text-decoration: underline;
      }
    }
  }

  // Layout overrides
  @media screen and (max-width: ${xs}) {
    .col-xs-4,
    .col-xs-6 {
      width: 100%;
    }
  }

  // --------------------- //
  // --- Media Queries --- //
  // --------------------- //

  @media screen and (max-width: ${lg}) {
    #social-share {
      display: none;
    }

    .vcv-header {
      .col-md-6:last-child {
        padding-right: inherit;
      }

      a {
        display: block;
        margin-bottom: 15px;
      }

      .vcv-logo {
        display: inline;
      }

      .btn {
        width: 100%;
      }
    }
  }

  // ------------- //
  // --- Print --- //
  // ------------- //

  .pdf {
    body {
      background-color: ${({ backgroundColor }) => backgroundColor};
    }

    .cv-container {
      box-shadow: none;
      border: none;

      margin-bottom: 0;
      max-width: 100%;
      padding: 0;

      a {
        text-decoration: none;
        transition: none;
      }

      // Make sure that we don't have extra padding at the bottom to cause extra page overflows
      // mce-content-body is from react-tinymce
      .main,
      section:last-of-type,
      section:last-of-type article:last-of-type,
      section:last-of-type article:last-of-type > *:last-child,
      section:last-of-type article:last-of-type .mce-content-body > *:last-child,
      section:last-of-type article:last-of-type .mce-content-body li:last-child > *:last-child,
      .content-container,
      .cv-content {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
      }

      // 'page-break-after: always' CSS rule makes the page container (or
      // main/sidebar in case of 2-column layouts) expand to the bottom of the
      // page, even if there is no content
      .cv-content,
      .main > *:last-child,
      .sidebar > *:last-child {
        page-break-after: always;
      }
    }

    // if CV has a branding bar (free account + free template), add page break
    // *AFTER* the branding bar as it is/should be the last element in a CV
    &.branded {
      .cv-container {
        .cv-content,
        .main > *:last-child,
        .sidebar > *:last-child {
          page-break-after: auto;
        }

        .branding {
          page-break-after: always;
        }
      }
    }

    .vcv-header,
    .vcv-footer {
      display: none;
    }

    // --- From H5bp default print reset --- //
    // https://developer.mozilla.org/en-US/docs/Web/CSS/paged_media
    // TODO email dev: can't seem to get any of the page media css working for wkhtmltopdf, only images seem to work.
    header,
    .header-text {
      page-break-after: avoid;
      page-break-inside: avoid;
    }

    .no-page-break,
    .css-crop,
    pre,
    blockquote,
    img,
    svg,
    .asset {
      page-break-inside: avoid;
    }

    .no-page-break {
      p {
        page-break-inside: avoid;
      }
    }

    .page-break {
      page-break-before: always;
    }

    thead {
      display: table-header-group;
    }

    p {
      orphans: 4;
      widows: 4;
    }

    .cv-container {
      .portfolio {
        .asset-thumb {
          // wkhtmltopdf fix for half-transparent first image in a portfolio
          // (both position/z-index declarations are requried)
          position: relative;
          z-index: 1;
        }

        // hide overlays
        .asset-overlay {
          display: none;
        }

        .css-crop {
          // wkhtmltopdf renders ugly shadows
          box-shadow: none;

          // wkhtmltopdf fix for half-transparent first image in a portfolio
          // (both position/z-index declarations are requried)
          position: relative;
          z-index: 1;
        }
      }

      .branding {
        span {
          opacity: 1;
        }
      }
    }

    .menu {
      display: none;
    }
  }

  // wkhtmltopdf does not support @page CSS3 rules
  // https://stackoverflow.com/questions/30165208/does-wkhtmltopdf-support-page-rules
  @page {
    size: A4 portrait;
  }
`

export default SharedStyles
