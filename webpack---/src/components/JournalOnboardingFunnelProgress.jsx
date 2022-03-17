import { useLocation } from 'react-router-dom'

import useJournalOnboarding from '../hooks/useJournalOnboarding'

import FunnelProgress from './FunnelProgress'

const JournalOnboardingFunnelProgress = () => {
  const { onboarding, onboardingStep, onboardingSteps, lastOnboardingStepPath } = useJournalOnboarding()
  const { pathname } = useLocation()

  if (!onboardingStep) {
    return null
  }

  // final step finishes onboarding, but we still want to display progress there
  if (!onboarding) {
    const isLastOnboardingStep = onboardingStep === onboardingSteps.slice(-1)[0]
    const isLastOnboardingStepPath = pathname === lastOnboardingStepPath

    if (!isLastOnboardingStep || !isLastOnboardingStepPath) {
      return null
    }
  }

  return (
    <FunnelProgress
      step={onboardingStep}
      steps={onboardingSteps}
    />
  )
}

export default JournalOnboardingFunnelProgress
