import { css } from 'styled-components'
import { math } from 'polished'

import { media } from '../../../components/styled/Grid'

// square root of "2 x articlePikeNoseHeight" divided by articlePikeNoseHeight
const pikeNoseScaleFactor = 0.7071067812

const ArticlesPikeNose = css`
  .cv-container {
    h3 {
      color: black;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-size: 133%;
      font-weight: bold;
      line-height: 130%;
      letter-spacing: -0.5px;
      overflow: hidden;
      z-index: 1;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.5`)};
      padding: 0.38em 1.15em 0.47em;
      position: relative;

      ${media.md`
        font-size: 150%;
      `}

      &:before,
      &:after {
        background-color: ${({ articlePikeNoseColor }) => articlePikeNoseColor};
        content: '';
        z-index: -1;

        position: absolute;
        top: 0;
      }

      // box
      &:before {
        left: 0;

        height: ${({ articlePikeNoseHeight }) => articlePikeNoseHeight};
        width: ${({ articlePikeNoseWidth }) => articlePikeNoseWidth};
      }

      // pike nose
      &:after {
        transform: scaleX(0.75) rotate(45deg);
        transform-origin: top left;

        left: ${({ articlePikeNoseWidth }) => articlePikeNoseWidth};

        height: ${({ articlePikeNoseHeight }) => math(`${articlePikeNoseHeight} * ${pikeNoseScaleFactor}`)};
        width: ${({ articlePikeNoseHeight }) => math(`${articlePikeNoseHeight} * ${pikeNoseScaleFactor}`)};
      }
    }

    h4 {
      color: black;
      font-size: 140%;
      font-family: ${({ headerFontFamily }) => headerFontFamily};
      font-weight: normal;
      line-height: 120%;
      letter-spacing: -0.5px;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.4`)};

      ${media.md`
        font-size: 150%;
      `}
    }

    h5 {
      color: ${({ primaryColor }) => primaryColor};
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 100%;
      font-weight: bold;
      line-height: 133%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.1 + 0.15em`)};

      ${media.md`
        font-size: 112.5%;
      `}
    }

    h6 {
      font-size: 87.5%;
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-weight: normal;
      line-height: 133%;

      margin: 0 0 ${({ articleMargins }) => math(`${articleMargins} * 0.5 + 0.3em`)};
    }
  }

  .pdf {
    .cv-container {
      h3,
      h4 {
        // wkhtmltopdf doesn't like letter spacing
        letter-spacing: 0;
      }
    }
  }
`

export default ArticlesPikeNose
