import styled from 'styled-components'
import { useEffect } from 'react'

import history from '../services/history'
import useOnboarding from '../hooks/useOnboarding'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import uploadCompletedImage from '../assets/images/upload-completed.png'

import OnboardingFunnelProgress from './OnboardingFunnelProgress.jsx'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'
import { Btn } from './styled/Button'

const Container = styled.div`
  margin-top: 20px;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 750px;
`

const Actions = styled.div`
  margin: 35px auto 25px;
`

const Image = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 320px;
  width: 90%;
`

const Uploaded = () => {
  const { finishCheckoutOnboarding, onboarding } = useOnboarding()

  useEffect(() => {
    trackEvent('viewed-uploaded-thank-you-page', 'pageview')
  }, [])

  const viewDashboard = () => {
    if (onboarding) {
      finishCheckoutOnboarding()
    } else {
      history.push('/cvs')
    }
  }

  return (
    <Container>
      <OnboardingFunnelProgress />

      <Content>
        <PageTitle>{t('new_resume_in_progress')}</PageTitle>
        <PageParagraph as="h2">{t('successful_resume_upload')}</PageParagraph>

        <Actions>
          <Btn
            big
            onClick={viewDashboard}>
            {t('view_dashboard')}
          </Btn>
        </Actions>

        <Image
          src={uploadCompletedImage}
          alt={t('new_resume_in_progress')}
        />
      </Content>
    </Container>
  )
}

export default Uploaded
