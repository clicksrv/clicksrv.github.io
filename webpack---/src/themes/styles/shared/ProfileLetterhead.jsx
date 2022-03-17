import { css } from 'styled-components'

import { breakpointsPx } from '../../../components/styled/Grid'

const { md } = breakpointsPx

const ProfileLetterhead = css`
  .cv-container {
    .user-contact,
    .user-links {
      li {
        font-size: 95%;
        overflow: visible;
        white-space: nowrap;

        display: inline-block;
        margin-bottom: 0.25em;
      }
    }

    .user-links {
      li {
        margin-right: 0.5em;

        i {
          margin-right: 0.2em;
        }
      }
    }

    .user-contact li {
      &:before {
        content: '|';
        color: ${({ subtleColor }) => subtleColor};
        margin: 0px 0.25em;
      }

      &:first-child {
        &:before {
          content: initial;
        }
      }
    }

    @media screen and (max-width: ${md}) {
      .vcard {
        text-align: center;
      }

      .user-contact {
        padding: 0;
      }
    }
  }
`

export default ProfileLetterhead
