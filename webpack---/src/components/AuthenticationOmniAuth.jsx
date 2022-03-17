import PropTypes from 'prop-types'
import styled from 'styled-components'

import events from '../services/events'
import conf from '../conf'
import history from '../services/history'
import { media } from './styled/Grid'
import { openUrl } from '../helpers/cordova'
import { t } from '../locales'

import Icon from './styled/Icon'
import { GoogleAuthButton, LinkedinAuthButton } from './ButtonOmniAuth'

const AuthButtons = styled.div`
  display: block;

  ${media.md`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `}
`

const GoogleIcon = styled(Icon)`
  background: white;
  border-radius: 4px;

  padding: 8px;
`

const LinkedinIcon = styled(Icon)`
  font-size: ${({ iconSize }) => `${iconSize}px` || 'inherit'};
`

const AuthenticationOmniAuth = ({ action }) => {
  const googleOmniAuthUrl = `${conf.host}/users/auth/google_oauth2`
  const linkedInOmniAuthUrl = `${conf.host}/users/auth/linkedin`

  // This is not being used; OmniAuth is currently disabled on Cordova
  const initOmniAuth = (provider) => (event) => {
    // NOTE: Open a child browser to do the linkedin auth, it'll return a token to our server to.
    // - We'll close the child browser on return and read the server generated auth token from the url
    // - The server will redirect the user back to the welcome page with a token param

    // const request_endpoint = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&state=" +
    //  (new Date).getTime() +
    //  "&client_id=7jeuu9ygh3yf&redirect_uri=" +
    //  encodeURIComponent(conf.apiHost+"/user/auth/linkedin/callback");

    const url = provider === 'google' ? googleOmniAuthUrl : linkedInOmniAuthUrl
    const ref = openUrl(url)(event)

    ref?.addEventListener('loadstop', (event) => {
      // redirect our current app to the same page and close the child browser.
      if (event.url.indexOf(conf.host) === 0) {
        if (/token=/.test(event.url)) {
          const token = (/token=(.+)/.exec(event.url) || [])[1]
          events.emit('SESSION::AUTH', token)

          setTimeout(() => {
            history.push('/') // TODO: this needs to have `?event=X`
          }, 100)
        }

        ref.close()
      }
    })
  }

  const googleLabel = action === 'signin' ? t('log_in_with_google') : t('sign_up_with_google')
  const linkedInLabel = action === 'signin' ? t('log_in_with_linkedin') : t('sign_up_with_linkedin')

  return (
    <AuthButtons>
      <GoogleAuthButton
        href={googleOmniAuthUrl}
        onClick={initOmniAuth('google')}>
        <GoogleIcon
          custom="google"
          width={23}
          height={23}
          viewBox="0 0 512 512"
        />

        {googleLabel}
      </GoogleAuthButton>

      <LinkedinAuthButton
        href={linkedInOmniAuthUrl}
        onClick={initOmniAuth('linkedin')}>
        <LinkedinIcon
          social="linkedin"
          iconSize={24}
        />

        {linkedInLabel}
      </LinkedinAuthButton>
    </AuthButtons>
  )
}

AuthenticationOmniAuth.propTypes = {
  action: PropTypes.string.isRequired,
}

export default AuthenticationOmniAuth
