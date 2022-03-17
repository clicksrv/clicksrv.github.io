import { createGlobalStyle, css } from 'styled-components'

import { greyLightest } from '../colors'
import { media } from './styled/Grid'

const sidebarSpacingStyle = css`
  ${media.md`
    .tox.tox-tinymce {
      left: var(--editor-sidebar-${({ sidebarState }) => sidebarState}-width) !important;
    }

    .tox.tox-tinymce-aux {
      left: var(--editor-sidebar-${({ sidebarState }) => sidebarState}-width);
    }
  `}
`

const TinyMCEStyles = createGlobalStyle`
  // main editor
  .tox.tox-tinymce {
    background-color: white;
    border: 1px solid ${greyLightest} !important;
    border-width: 0 0 1px !important;
    transition: all 0.3s !important;
    z-index: 4;

    // always flex; animate via visibility/top
    display: flex !important;

    position: fixed !important;
    left: 0 !important;
    right: 0 !important;
    top: 0px !important;

    height: var(--nav-bar-height) !important;
    padding-top: 10px;

    ${media.md`
      padding-top: 14px;
    `}

    &.tox-visible {
      top: var(--nav-bar-height) !important;
    }

    .tox-editor-container {
      margin-left: auto;
      margin-right: auto;
    }

    .tox-editor-header {
      border: none;
    }

    .tox-toolbar,
    .tox-toolbar__primary {
      background: none;
    }
  }

  // table formatting controls
  .tox.tox-tinymce-aux {
    transition: all 0.3s !important;
    z-index: 4;

    position: fixed !important;
    left: 0;
    right: 0;
    top: calc(var(--nav-bar-height) + var(--nav-bar-height));

    display: block !important;
    max-width: 100%;

    .tox-pop {
      background: white;
      border-bottom: 1px solid ${greyLightest};

      height: 50px;
      max-width: 100% !important;

      left: 0 !important;
      right: 0 !important;
      top: 0 !important;

      &::before,
      &::after {
        display: none;
      }

      .tox-pop__dialog {
        background: transparent;
        border: none;
        box-shadow: none;

        margin: 0 auto;
        width: 300px;
      }

      .tox-toolbar {
        background: transparent;

        padding-top: 5px;
      }
    }
  }

  ${({ inEditor }) => inEditor && sidebarSpacingStyle};
`

export default TinyMCEStyles
