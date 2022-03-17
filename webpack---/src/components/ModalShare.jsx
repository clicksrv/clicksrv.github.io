import CopyToClipboard from 'react-copy-to-clipboard'
import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

import conf from '../conf'
import history from '../services/history'
import useCvs from '../hooks/useCvs'
import useQuery from '../hooks/useQuery'
import { green } from '../colors'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import Icon from './styled/Icon'
import Input from './forms/input'
import Modal from './Modal'
import SectionTitle from './SectionTitle'
import ShareIconLink from './styled/ShareIconLink'
import { IconButton } from './styled/Button'

const SocialLinks = styled.div`
  display: flex;
  justify-content: space-between;
`

const SuccessMessage = styled.div`
  color: ${green};

  display: flex;
  align-items: center;

  .icon_check {
    margin-right: 6px;
  }
`

const Info = styled.p`
  font-size: 16px;
  font-weight: 300;

  margin: 10px 0 25px 0;
`

const ModalShare = ({ isOpen }) => {
  const { cvId } = useQuery()
  const { cvs } = useCvs()
  const { pathname } = useLocation()
  const [copied, setCopied] = useState(false)

  const { publicCvsHost } = conf

  const cv = cvs?.find((c) => c.id.toString() === cvId)

  if (!cv) {
    return null
  }

  if (!cv.publishable) {
    history.push('/checkout')

    return null
  }

  const cvUrl = `${publicCvsHost}/${cv.url}/`

  const openCv = () => window.open(cvUrl, '_blank')

  const onCopy = () => {
    setCopied(true)
  }

  const trackSharing = (service) => trackEvent('shared-cv', 'interaction', 0, { service })

  const shareUrls = {
    facebook: `https://www.facebook.com/dialog/feed?app_id=819813384706537&display=popup&link=${cvUrl}&redirect_uri=${cvUrl}`,
    twitter: `https://twitter.com/share?url=${cvUrl}&text=Check out my new resume design!&via=visualcv`,
    linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${cvUrl}`,
  }

  const share = (service) => {
    trackSharing(service)

    window.open(encodeURI(shareUrls[service]), 'mywindow', 'width=500, height=300')
  }

  return (
    <Modal
      closeUrl={pathname}
      isOpen={isOpen}
      maxWidth={680}>
      <SectionTitle>{t('share_heading')}</SectionTitle>

      <div style={{ display: 'flex' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Formsy>
            <Input
              name="url"
              disabled
              value={cvUrl}
            />
          </Formsy>
          <div style={{ position: 'absolute', right: 10, top: 10 }}>
            <CopyToClipboard
              text={cvUrl}
              onCopy={onCopy}>
              <IconButton style={{ marginRight: 5 }}>
                <Icon icon="clipboard" />
              </IconButton>
            </CopyToClipboard>

            <IconButton onClick={openCv}>
              <Icon arrow="right" />
            </IconButton>
          </div>
        </div>
      </div>

      {copied && (
        <SuccessMessage>
          <Icon icon="check" /> {t('copied_url')}
        </SuccessMessage>
      )}

      <Info>{t('share_prompt')}</Info>

      <SocialLinks>
        <ShareIconLink
          social="facebook"
          onClick={() => share('facebook')}
        />

        <ShareIconLink
          social="twitter"
          onClick={() => share('twitter')}
        />

        <ShareIconLink
          social="linkedin"
          onClick={() => share('linkedin')}
        />

        <ShareIconLink
          icon="mail_alt"
          onClick={() => trackSharing('email')}
          href={`mailto:?subject=My%20Resume&body=${publicCvsHost}/${cv.url}/`}
          rel="noopener noreferrer"
          target="_blank"
        />
      </SocialLinks>
    </Modal>
  )
}

ModalShare.propTypes = {
  isOpen: PropTypes.bool,
}

export default ModalShare
