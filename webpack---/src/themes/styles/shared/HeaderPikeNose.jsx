import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

const HeaderPikeNose = css`
  // Avatar
  .profile {
    .user-thumb {
      border: 10px solid white;
      border-radius: 50%;

      height: 108px;
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.5 + 0.5em`)};
      width: 108px;

      .css-crop,
      .image-placeholder {
        border-radius: 50%;
      }
    }
  }

  // Pike nose
  .cv-container {
    .profile {
      .article-body {
        overflow: hidden;

        padding-bottom: 28%;
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
          transform: rotate(26deg);
          transform-origin: right top;

          left: -50%;
        }

        &:after {
          transform: rotate(-26deg);
          transform-origin: left top;

          right: -50%;
        }
      }
    }
  }

  // Colors
  .cv-container {
    .profile {
      background-color: ${({ primaryColor }) => primaryColor};
      color: white;

      a {
        color: white;
      }

      [data-bind='email'] span span {
        color: white;
      }
    }
  }

  // Titles
  .cv-container {
    h1 {
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 250%;
      font-weight: bold;
      line-height: 100%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.1em`)};

      ${media.md`
        font-size: 300%;
      `}
    }

    h2 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 112.5%;
      font-weight: normal;
      line-height: 150%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.8`)};
    }
  }

  // profile links
  .user-contact,
  .user-links {
    font-size: 100%;
    font-weight: bold;
    line-height: 130%;

    li {
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2 + 0.1em`)};
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
        margin-right: 0.5em;
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

export default HeaderPikeNose
