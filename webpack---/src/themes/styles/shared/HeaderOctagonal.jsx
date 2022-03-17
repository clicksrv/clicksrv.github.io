import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

const HeaderOctagonal = css`
  // Avatar
  .profile {
    .user-thumb {
      border-radius: 50%;

      margin-right: auto;
      height: 164px;
      width: 164px;

      .css-crop,
      .image-placeholder {
        border-radius: 50%;
      }

      ${media.md`
        margin-right: initial;
      `}
    }
  }

  // Avatar octagonal borders
  .profile {
    .user-thumb {
      outline-offset: 14px;

      position: relative;

      // top + bottom
      &:before,
      &:after {
        border-bottom: 10px solid white;
        border-top: 10px solid white;
        content: '';
        transform: rotate(-22.5deg);
        z-index: 1;

        position: absolute;
        left: 47px;
        top: -3px;

        height: 150.5px;
        width: 70.5px;
      }

      &:after {
        transform: rotate(22.5deg);
      }

      .overlay {
        display: block;

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      .overlay,
      .image-placeholder {
        // left + right
        &:before,
        &:after {
          border-left: 10px solid white;
          border-right: 10px solid white;
          content: '';
          transform: rotate(-22.5deg);

          position: absolute;
          left: -3px;
          top: 47px;

          height: 70.5px;
          width: 150.5px;
        }

        &:after {
          transform: rotate(22.5deg);
        }
      }
    }
  }

  // Colors / Background
  .cv-container {
    .profile {
      background-color: ${({ secondaryColor }) => secondaryColor};
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
      [data-bind='email'] span span,
      a[data-bind=link_url] span span {
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
      font-weight: normal;
      line-height: 105%;

      margin: 0 0 0.5em;

      ${media.md`
        font-size: 300%;
      `}
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 112.5%;
      font-weight: normal;
      line-height: 150%;

      margin: 0;
    }
  }

  // profile links
  .user-contact,
  .user-links {
    font-size: 100%;
    line-height: 130%;

    li {
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.3 + 0.1em`)};
    }
  }

  // profile icons
  .user-contact,
  .user-links {
    li {
      i {
        display: none;
      }

      &:before {
        font-family: 'Icons';
        font-weight: normal;
        text-align: center;
        vertical-align: middle;

        display: inline-block;
        margin-bottom: 1px;
        margin-right: 0.7em;
        width: 1.4em;
      }

      &.phone:before {
        content: '\\e91a';
      }

      &.locality:before {
        content: '\\e903';
      }

      &.email:before {
        content: '\\e91d';
      }

      &.website:before {
        content: '\\e91b';
      }
    }
  }
`

export default HeaderOctagonal
