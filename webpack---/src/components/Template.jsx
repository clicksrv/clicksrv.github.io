import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import useOnboarding from '../hooks/useOnboarding'
import { isFreeTheme } from '../helpers/theme'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import CvTemplates from './CvTemplates'
import OnboardingFunnelProgress from './OnboardingFunnelProgress'

const Container = styled.section`
  margin: 20px auto 0;
  max-width: 1280px;
  padding: 20px;
`

const Template = () => {
  const [selected, setSelected] = useState(false)
  const { nextOnboardingStep, onboardingTemplate, setOnboardingTemplate } = useOnboarding()
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    trackEvent('viewed-select-template-page', 'pageview')
  }, [])

  // we don't have a real CV at this point; use a substitute
  const cv = { theme: onboardingTemplate }

  const onClick = (template) => {
    trackEvent('selected-onboarding-theme', 'interaction', 0, { theme: template, free: isFreeTheme(template, user) })

    setOnboardingTemplate(template)
    setSelected(true)
  }

  // separate useEffect is necessary so that the selected template 'settles in'
  useEffect(() => {
    if (selected) {
      nextOnboardingStep()
    }
  }, [selected])

  return (
    <Container>
      <OnboardingFunnelProgress />

      <CvTemplates
        cv={cv}
        onClick={onClick}
        title={t('select_template')}
      />
    </Container>
  )
}

export default Template
