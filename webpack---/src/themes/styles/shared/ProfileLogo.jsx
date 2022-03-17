import { css } from 'styled-components'

import { breakpointsPx } from '../../../components/styled/Grid'

const { md } = breakpointsPx

const ProfileLogo = css`
  .cv-container {
    .logo {
      display: ${({ logoUrl }) => (logoUrl ? 'block' : 'none')};
      float: right;
      margin-bottom: 10px;
      width: 170px;

      .css-crop {
        background-image: ${({ logoUrl }) => (logoUrl ? `url(${logoUrl})` : 'none')};
        background-position: right;
        background-repeat: no-repeat;
        background-size: contain;

        padding-bottom: 50%;
      }
    }

    @media screen and (max-width: ${md}) {
      .logo {
        float: none;
        margin: 15px auto;
        max-width: 300px;
        width: auto;

        .css-crop {
          background-position: center;
        }
      }
    }
  }
`

export default ProfileLogo
