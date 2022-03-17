import styled from 'styled-components'

import conf from '../conf'
import { openUrl } from '../helpers/cordova'
import { t } from '../locales'
import { grey } from '../colors'

const Container = styled.div`
  color: ${grey};
  text-align: center;
`

const Agreement = styled.p`
  font-size: 14px;
  line-height: 20px;

  margin-top: 16px;
`

const Links = styled.p`
  font-size: 14px;
  line-height: 20px;

  margin-bottom: 0px;
`

const AuthenticationFooter = () => {
  const privacyUrl = `${conf.host}/privacy-policy/`
  const tosUrl = `${conf.host}/terms-of-service/`

  return (
    <Container>
      <Agreement>{t('tos_prompt')}</Agreement>

      <Links>
        <a
          href={privacyUrl}
          onClick={openUrl(privacyUrl)}
          rel="noopener noreferrer"
          target="_blank">
          {t('privacy')}
        </a>

        {' | '}

        <a
          href={tosUrl}
          onClick={openUrl(tosUrl)}
          rel="noopener noreferrer"
          target="_blank">
          {t('tos')}
        </a>
      </Links>
    </Container>
  )
}

export default AuthenticationFooter
