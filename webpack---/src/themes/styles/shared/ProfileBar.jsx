import { css } from 'styled-components'

import { flex } from '../shared/Mixins'
import { breakpointsPx } from '../../../components/styled/Grid'

const { md } = breakpointsPx

const ProfileBar = css`
  .cv-container {
    .vcard {
      display: flex;

      margin-bottom: 0;
      margin-top: 0;
      padding-bottom: 1em;
    }

    .user-title {
      ${flex('1 1 auto')}// required for wkhtmltopdf
    }

    .user-contact {
      border-left: 1px solid ${({ faintColor }) => faintColor};
      list-style: none;

      padding-left: 10px;
      padding-top: 0.25em;
      margin: 0 0 0 10px;

      i {
        color: ${({ subtleColor }) => subtleColor};
        text-align: center;

        width: 1.35em;
      }

      li {
        font-size: 90%;
        margin-bottom: 0.25em;
        white-space: nowrap;

        &:before {
          font-family: FontAwesome;
          font-size: 100%;
          opacity: 0.25;
          text-align: center;
          vertical-align: middle;

          display: inline-block;
          margin-bottom: 1px;
          margin-right: 0.25em;
          width: 1.35em;
        }

        &.locality:before {
          content: '\\f041';
        }

        &.phone:before {
          content: '\\f095';
        }

        &.email:before {
          content: '\\f003';
        }

        & > span {
          display: inline;
        }
      }
    }

    .user-links {
      li {
        white-space: nowrap;

        display: block;

        i {
          margin-right: 0.25em;
        }
      }
    }

    @media screen and (max-width: ${md}) {
      .vcard {
        text-align: center;

        display: block;
      }

      .user-contact {
        border-left: none;

        width: 100%;

        li {
          display: inline-block;
          margin: 0 5px;
        }
      }
    }
  }
`

export default ProfileBar
