import { css } from 'styled-components'
import { math, transparentize } from 'polished'

import { media } from '../../../components/styled/Grid'

const HeaderDuoColor = css`
  // Avatar
  .profile {
    .user-photo {
      ${media.md`
        min-height: ${({ headerHeight }) => headerHeight};
      `}
    }

    .user-thumb {
      border: 10px solid ${({ secondaryColor }) => secondaryColor};
      border-radius: 50%;

      height: 184px;
      margin: 0 auto ${({ articleMargins }) => articleMargins};
      width: 184px;

      ${media.md`
        @media screen and (max-width: 850px) {
          height: 140px;
          width: 140px;
        }
      `}
    }

    .css-crop,
    .image-placeholder {
      border-radius: 50%;
    }
  }

  // Equal columns
  .main {
    .profile {
      min-height: ${({ sectionMargins, headerHeight }) => math(`${sectionMargins} + ${headerHeight}`)};
    }
  }

  .pdf {
    .main {
      .profile {
        min-height: ${({ headerHeight }) => headerHeight};
      }
    }
  }

  // Colors / padding
  .sidebar {
    background-color: ${({ backgroundColor }) => backgroundColor};

    ${media.md`
      background-color: ${({ primaryColor }) => primaryColor};
    `}

    .profile {
      background-color: ${({ primaryColor }) => primaryColor};
      text-align: center;
    }

    .vcard {
      padding: 0 1.5em;

      ${media.md`
        padding: 0;
      `}

      .contact-links {
        margin-top: 2em;
      }
    }

    .add-page-break {
      color: white !important;
    }
  }

  .main {
    background-color: ${({ backgroundColor }) => backgroundColor};

    .profile {
      background-color: ${({ primaryColor }) => primaryColor};

      margin-right: -${({ horizontalSpacing }) => horizontalSpacing};
      margin-left: -${({ horizontalSpacing }) => horizontalSpacing};

      ${media.md`
        background-color: ${({ backgroundColor }) => backgroundColor};

        margin-bottom: 0;

        margin-right: 0;
        margin-left: 0;
      `}
    }

    .vcard {
      display: flex;
      flex-wrap: wrap;

      ${media.md`
        flex-wrap: none;
        margin-top: 1.3em;
      `}

      .user-photo {
        width: 100%;

        ${media.md`
          display: none;
        `}
      }

      .user-title {
        width: 100%;

        ${media.md`
          width: 50%;
        `}
      }

      .contact-links {
        margin-bottom: ${({ sectionMargins }) => sectionMargins};
        margin-top: 0.4em;
        width: 100%;

        ${media.md`
          width: 50%;
        `}
      }
    }
  }

  // We render two profiles and just hide one depending on screen size
  .main {
    .profile {
      display: block;
    }
  }

  .sidebar {
    .user-title,
    .contact-links {
      display: block;

      ${media.md`
        display: none;
      `}
    }
  }

  .cv-container {
    h1 {
      color: white;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 200%;
      font-weight: bold;
      line-height: 100%;
      text-align: center;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.05em`)};

      ${media.md`
        color: black;
        font-size: 300%;
        text-align: left;
      `}
    }

    h2 {
      color: ${transparentize(0.4, 'white')};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 112.5%;
      font-weight: normal;
      line-height: 133%;
      text-align: center;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};

      ${media.md`
        color: ${({ bodyColor }) => bodyColor};
        font-size: 100%;
        text-align: left;
      `}
    }
  }

  .user-contact,
  .user-links {
    color: white;
    font-size: 100%;
    line-height: 130%;
    text-align: center;

    li {
      margin-bottom: ${({ articleMargins }) => math(`${articleMargins} * 0.2 + 0.3em`)};

      i {
        display: none;
      }
    }

    ${media.md`
      color: ${({ bodyColor }) => bodyColor};
      text-align: right;
    `}
  }
`

export default HeaderDuoColor
