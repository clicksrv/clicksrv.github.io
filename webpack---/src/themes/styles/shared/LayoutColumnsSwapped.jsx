import { css } from 'styled-components'

import { media } from '../../../components/styled/Grid'

const LayoutColumnsSwapped = css`
  // main with sidebar swap for mobile view so that the main column is displayed
  // first on mobile devices
  .cv-container {
    .sidebar {
      order: 1;

      .profile {
        display: none;
      }

      ${media.md`
        order: 0;

        .profile {
          display: block;
        }
      `}
    }

    .main {
      order: 0;

      .profile {
        display: block;
      }

      ${media.md`
        order: 1;

        .profile {
          display: none;
        }
      `}
    }
  }
`

export default LayoutColumnsSwapped
