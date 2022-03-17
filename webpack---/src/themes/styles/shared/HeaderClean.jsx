import { css } from 'styled-components'
import { math, transparentize } from 'polished'

import { media } from '../../../components/styled/Grid'

const HeaderClean = css`
  .banner {
    background-color: ${({ secondaryColor }) => secondaryColor};
    background-image: ${({ bgUrl }) => (bgUrl ? `url(${bgUrl})` : 'none')};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    height: 144px;
  }

  .pdf {
    .banner {
      height: ${({ bgUrl }) => (bgUrl ? '144px' : '54px')};
    }
  }

  .profile {
    margin-top: 30px;
  }

  .user-thumb {
    border: 10px solid white;
    box-shadow: 0 15px 30px 5px ${({ linkColor }) => transparentize(0.85, linkColor)},
      0 5px 10px -5px ${({ linkColor }) => transparentize(0.85, linkColor)};

    height: 148px;
    margin: -80px auto ${({ articleMargins }) => math(`${articleMargins} * 0.7`)};
    width: 148px;
  }

  // wkhtmltopdf hacks to eliminate black borders around avatar image
  .pdf {
    .user-photo {
      margin: 0 auto;
      width: 146px;
    }

    .user-thumb {
      border-width: 11.33px;
    }
  }

  .cv-container {
    h1 {
      color: black;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 230%;
      font-weight: bold;
      line-height: 100%;
      text-align: center;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.05em`)};

      ${media.md`
        font-size: 250%;
      `}
    }

    h2 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      font-weight: bold;
      line-height: 133%;
      text-align: center;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};

      ${media.md`
        font-size: 112.5%;
      `}
    }
  }

  .contact-links {
    font-size: 87.5%;
    text-align: center;

    padding-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.6`)};
  }

  .pdf {
    #profile {
      .contact-links {
        padding-bottom: ${({ sectionMargins }) => math(`${sectionMargins} * 0.6`)} !important;
      }
    }
  }

  .user-contact,
  .user-links {
    color: ${({ bodyColor }) => bodyColor};
    line-height: 100%;
    vertical-align: bottom;

    display: inline-block;

    li {
      line-height: 200%;

      display: inline-block;
      margin: 0 15px;

      &:before {
        color: ${({ primaryColor }) => primaryColor};
        font-family: Icons;
        vertical-align: middle;

        display: inline-block;
        margin-bottom: 1px;
        margin-right: 0.5em;
      }

      &.phone:before {
        content: '\\e91a';
      }

      &.locality:before {
        content: '\\e919';
      }

      &.email:before {
        content: '\\e91b';
      }

      &.website:before {
        content: '\\e904';
      }
    }
  }

  .user-links {
    li {
      i {
        display: none;
      }
    }
  }
`

export default HeaderClean
