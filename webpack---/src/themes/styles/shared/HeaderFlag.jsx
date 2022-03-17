import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

// requires theme styles to include `ProfileColumns3` styles separately
const HeaderFlag = css`
  .cv-container {
    // Avatar
    .profile {
      .user-thumb {
        border: 10px solid white;
        border-radius: 50%;

        height: 188px;
        width: 188px;
      }

      .css-crop,
      .image-placeholder {
        border-radius: 50%;
      }
    }

    // Pike nose
    .profile {
      overflow: hidden;

      position: relative;

      &:before,
      &:after {
        background-color: ${({ backgroundColor }) => backgroundColor};
        content: '';

        position: absolute;
        bottom: -50%;

        height: 50%;
        width: 100%;
      }

      &:before {
        transform: rotate(23deg);
        transform-origin: right top;

        left: -50%;

        ${media.md`
          transform: rotate(5deg);
        `}
      }

      &:after {
        transform: rotate(-23deg);
        transform-origin: left top;

        right: -50%;

        ${media.md`
          transform: rotate(-5deg);
        `}
      }
    }

    // Colors / Background
    .profile {
      background-color: ${({ primaryColor }) => primaryColor};
      background-size: cover, cover;
      background-repeat: no-repeat, no-repeat;
      background-position: center, center;
      color: white;

      ${({ bgUrl }) =>
        bgUrl &&
        `
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${bgUrl});
      `}

      a,
      a[data-bind=link_url] span span,
      [data-bind='email'] span span {
        color: white;
      }
    }
  }

  // -webkit prefixed gradient required for wkhtmltopdf
  .pdf {
    .profile {
      ${({ bgUrl }) =>
        bgUrl &&
        `
        background-image: -webkit-linear-gradient(270deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${bgUrl});
      `}
    }
  }

  // Titles
  .cv-container {
    h1 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 250%;
      font-weight: bold;
      line-height: 110%;
      letter-spacing: 1px;

      margin: 0 0 0.1em;

      ${media.md`
        font-size: 300%;
      `}
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 112.5%;
      font-weight: normal;
      line-height: 150%;
      letter-spacing: -0.1px;

      margin: 0;

      ${media.md`
        margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.8`)};
      `}
    }
  }

  .pdf {
    .cv-container {
      h1,
      h2 {
        // wkhtmltopdf doesn't like letter-spacing
        letter-spacing: 0;
      }
    }
  }

  // profile links
  .user-contact,
  .user-links {
    font-size: 100%;
    line-height: 130%;

    li {
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2 + 0.1em`)};

      i {
        display: none;
      }
    }
  }
`

export default HeaderFlag
