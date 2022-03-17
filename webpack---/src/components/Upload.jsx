import styled from 'styled-components'
import { useEffect, useState } from 'react'

import api from '../services/api'
import history from '../services/history'
import notify from '../services/notify'
import useOnboarding from '../hooks/useOnboarding'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import OnboardingFunnelProgress from './OnboardingFunnelProgress'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'
import Uploader from './Uploader'
import UploadLinkedIn from './UploadLinkedIn'
import UseLinkedIn from './UseLinkedIn'
import { Btn } from './styled/Button'

const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 700px;
`

const ContainerForm = styled.section`
  margin: 35px 20px 40px;
`

const FileUploader = styled(Uploader)`
  margin: 0 auto;
  max-width: 430px;
`

const Actions = styled.p`
  margin: 25px auto 40px;
`

const Upload = () => {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const { finishOnboarding, onboarding, onboardingLinkedIn, onboardingTemplate, nextOnboardingStep } = useOnboarding()

  useEffect(() => {
    trackEvent('viewed-upload-resume-page', 'pageview')
  }, [])

  const onSuccess = ({ data }) => {
    const { status, message } = data

    if (status === 'OK') {
      trackEvent('uploaded-cv', 'interaction')

      setUploaded(true)
    } else {
      notify.error(message)
    }
  }

  const onCancel = () => setUploaded(false)

  const onConfirmationSuccess = () => {
    setUploading(false)

    if (onboarding) {
      nextOnboardingStep()
    } else {
      history.push('/uploaded')
    }
  }

  const onError = () => {
    setUploading(false)

    notify.error(t('formatting_service_error'))
  }

  const onConfirm = () => {
    setUploading(true)

    api.confirmFormattingService({ template: onboardingTemplate }).then(onConfirmationSuccess).catch(onError)
  }

  const cancelUpload = () => {
    if (onboarding) {
      finishOnboarding()
    } else {
      history.push('/cvs')
    }
  }

  const url = '/api/v2/formatting_service'

  const linkedInProps = {
    onCancel,
    onConfirm,
    onError,
    onSuccess,
    uploading,
    uploaded,
    url,
  }

  return (
    <Container>
      <OnboardingFunnelProgress />

      <Content>
        <PageTitle>{t('welcome_to_vcv_pro')}</PageTitle>
        <PageParagraph as="h2">{t('upload_current_resume')}</PageParagraph>

        {!onboardingLinkedIn && (
          <>
            <ContainerForm>
              <FileUploader
                destination={{ url }}
                multiple={false}
                onCancel={onCancel}
                onError={onError}
                onSuccess={onSuccess}
                restrictContentTypes={['document']}
              />

              {uploaded && (
                <Actions>
                  <Btn
                    big
                    disabled={uploading || !uploaded}
                    onClick={onConfirm}>
                    {uploading ? t('submitting') : t('submit_resume')}
                  </Btn>
                </Actions>
              )}
            </ContainerForm>

            <UseLinkedIn {...linkedInProps} />
          </>
        )}

        {onboardingLinkedIn && <UploadLinkedIn {...linkedInProps} />}

        {!uploaded && (
          <Actions>
            <Btn
              big
              hollow
              onClick={cancelUpload}>
              {t('cancel')}
            </Btn>
          </Actions>
        )}
      </Content>
    </Container>
  )
}

export default Upload
