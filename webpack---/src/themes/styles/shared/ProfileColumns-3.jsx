import { css } from 'styled-components'
import { math } from 'polished'

import { flex } from '../shared/Mixins'
import { media } from '../../../components/styled/Grid'

const ProfileColumns3 = css`
  .vcard {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    width: 100%;

    .user-title,
    .contact-links {
      width: 100%;
    }

    .user-title,
    .user-thumb.visible,
    .contact-links {
      display: block;
    }

    .user-title {
      margin: ${({ articleMargins }) => math(`${articleMargins} + 0.5em`)} 0 1em;

      ${media.md`
        margin-top: 0.8em;
        margin-bottom: 1.3em;
      `}
    }

    .contact-links {
      margin: 1.4em 0 1.3em;
    }

    ${media.md`
      text-align: center;

      .user-title,
      .contact-links {
        ${flex('1')}

        width: 35%;
      }

      .user-title {
        text-align: right;

        // wkhtmltopdf required prefix
        -webkit-box-ordinal-group: 1;
        order: 1;

        padding-right: ${({ horizontalSpacing }) => horizontalSpacing};
      }

      // having user-photo container (which has 'width: auto') is necessary for wkhtmltopdf
      // as 'user-thumb' has fixed width
      .user-photo {
        flex: none;

        // wkhtmltopdf required prefix
        -webkit-box-ordinal-group: 2;
        order: 2;

        margin: 0 auto;
      }

      .contact-links {
        text-align: left;

        // wkhtmltopdf required prefix
        -webkit-box-ordinal-group: 3;
        order: 3;

        margin-top: 1.4em;
        padding-left: ${({ horizontalSpacing }) => horizontalSpacing};
      }
    `}
  }

  .pdf {
    .cv-container {
      section.profile {
        div.contact-links:last-of-type:last-child {
          // override 0 padding/margin rule from cv.less
          margin-bottom: 1.3em !important;
        }
      }
    }
  }
`

export default ProfileColumns3
