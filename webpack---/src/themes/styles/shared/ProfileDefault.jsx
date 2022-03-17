import { css } from 'styled-components'

const ProfileDefault = css`
  .cv-container {
    .user-contact,
    .user-links {
      list-style: none;
      text-align: center;

      margin: 0;
      padding-top: 0.25em;
      padding-left: 0;

      i {
        color: ${({ subtleColor }) => subtleColor};
        text-align: center;

        width: 1.35em;
      }

      li {
        font-size: 95%;
        overflow: visible;
        white-space: nowrap;

        display: inline-block;
        margin-bottom: 0.25em;
      }
    }

    .user-contact li {
      &:before {
        color: ${({ subtleColor }) => subtleColor};
        content: '\\2022';
        font-size: 150%;
        line-height: 0.5em;
        vertical-align: middle;

        margin: 0 0.25em;
      }

      &:first-child {
        &:before {
          content: initial;
        }
      }
    }

    .user-links {
      li {
        margin-right: 0.5em;
      }

      i {
        margin-right: 0.1em;
      }
    }
  }
`

export default ProfileDefault
