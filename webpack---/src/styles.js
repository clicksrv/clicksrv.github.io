// styles mixins for styled-components
import {
    createGlobalStyle,
    css
} from 'styled-components'

import {
    media
} from './components/styled/Grid'
import {
    primary,
    primaryDarker,
    primaryDarkFaded,
    primaryFaded
} from './colors'

export const shadowBigPrimary = css `
  background-color: ${primary};
  box-shadow: 0 5px 30px -12px ${primary}, 0 5px 10px -5px ${primaryFaded}, 0 15px 30px 5px ${primaryFaded};
  transition: all 0.3s;

  &:hover {
    background-color: ${primaryDarker};
    box-shadow: 0 5px 30px -12px ${primaryDarker}, 0 5px 15px -5px ${primaryDarkFaded},
      0 15px 30px 5px ${primaryDarkFaded};
  }
`

// Global CSS styles
export default createGlobalStyle `
  :root {
    --editor-sidebar-open-width: 240px;
    --editor-sidebar-closed-width: 60px;

    --editor-side-pane-width: 500px;

    --nav-bar-height: 60px;

    --cv-card-normal-height: 320px;
    --cv-card-small-height: 275px;
    --cv-card-half-height: 160px;
    --cv-card-minimum-width: 210px;
    --cv-card-width: 310px;
    --cv-card-content-compact-height: 70px;
    --cv-card-content-full-height: 120px;

    --cv-poster-content-compact-height: 50px;
    --cv-poster-content-full-height: 110px;

    --dashboard-spacing: 16px;

    --preview-bar-height: 52px;

    ${media.sm`
      --dashboard-spacing: 22px;
    `}

    ${media.md`
      --nav-bar-height: 70px;
    `}

    ${media.lg`
      --preview-bar-height: 0px;
    `}
  }

  html {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    a {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }

  body {
    overscroll-behavior: none;
  }

  body,
  input,
  textarea {
    font-family: 'Inter', sans-serif;

    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: grayscale;

    @supports (font-variation-settings: normal) {
      font-family: 'InterVariable', sans-serif;
      font-synthesis: none;
    }
  }

  i,
  em {
    font-variation-settings: 'slnt' -10;
  }

  b,
  strong {
    font-weight: 600;
  }
`