import styled from 'styled-components'
import { useEffect } from 'react'

import { grey } from '../colors'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import CvNewActions from './CvNewActions'
import PageSubtitle from './PageSubtitle'
import OnboardingFunnelProgress from './OnboardingFunnelProgress'

const Container = styled.section`
  margin: 20px auto 0;
  max-width: 1280px;
  padding: 20px;
  width: 100%;
`

const Title = styled(PageSubtitle)`
  margin-bottom: 5px;
`

const Subtitle = styled.p`
  color: ${grey};

  margin-bottom: 25px;
`

const CreateResume = () => {
  useEffect(() => {
    trackEvent('viewed-create-resume-page', 'pageview')
  }, [])

  return (
    <Container>
      <OnboardingFunnelProgress />

      <Title>{t('great_choice')}</Title>
      <Subtitle>{t('how_would_you_create_resume')}</Subtitle>

      <CvNewActions type="resume" />
    </Container>
  )
}

export default CreateResume
