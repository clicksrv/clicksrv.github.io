import { css } from 'styled-components'

const ProfileContactInfo = css`
  .cv-container {
    .vcard {
      .user-contact {
        list-style: none;

        i {
          color: ${({ subtleColor }) => subtleColor};
          text-align: center;

          width: 1.35em;
        }

        li {
          margin-bottom: 0.5em;

          &:before {
            font-family: FontAwesome;
            font-size: 100%;
            opacity: 0.25;
            text-align: center;
            vertical-align: middle;

            display: inline-block;
            margin-right: 0.25em;
            width: 1.5em;
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
          overflow: visible;
          white-space: nowrap;

          display: block;

          i {
            opacity: 0.25;

            margin-right: 0.25em;
            width: 1.5em;
          }
        }
      }
    }
  }
`

export default ProfileContactInfo
