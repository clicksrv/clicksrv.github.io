import PropTypes from 'prop-types'

import useOnboarding from '../hooks/useOnboarding'

import FunnelProgress from './FunnelProgress'

const OnboardingFunnelProgress = ({ className }) => {
  const { onboarding, onboardingStep, onboardingSteps } = useOnboarding()

  if (!onboarding) {
    return null
  }

  return (
    <FunnelProgress
      className={className}
      step={onboardingStep}
      steps={onboardingSteps}
    />
  )
}

OnboardingFunnelProgress.propTypes = {
  className: PropTypes.string,
}

export default OnboardingFunnelProgress
