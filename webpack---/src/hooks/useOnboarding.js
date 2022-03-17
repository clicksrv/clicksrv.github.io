import {
    useContext
} from 'react'

import conf from '../conf'
import history from '../services/history'
import {
    ApplicationContext
} from '../contexts/ApplicationContext'
import {
    createCv
} from '../helpers/cv'
import {
    trackEvent
} from '../helpers/analytics'

const stepPath = {
    select_template: '/template',
    create_resume: '/create-resume',
    review_and_upgrade: '/checkout',
    upload_resume: '/upload',
    thank_you: '/uploaded',
}

const defaultSteps = ['select_template', 'create_resume', 'customize_resume']
const checkoutSteps = ['review_and_upgrade', 'select_template', 'upload_resume', 'thank_you']

const useOnboarding = () => {
    const [state, setState] = useContext(ApplicationContext)

    const {
        onboarding,
        onboardingLinkedIn,
        onboardingStep,
        onboardingSteps,
        onboardingTemplate
    } = state

    const onboardingStepIndex = onboardingSteps.indexOf(onboardingStep)
    const nextStep = onboardingSteps[onboardingStepIndex + 1]

    const updateState = (stateParticle) =>
        setState((state) => ({
            ...state,
            ...stateParticle,
        }))

    const setOnboarding = (value) => updateState({
        onboarding: value
    })
    const setOnboardingLinkedIn = () => updateState({
        onboardingLinkedIn: true
    })
    const setOnboardingStep = (value) => updateState({
        onboardingStep: value
    })
    const setOnboardingSteps = (value) => updateState({
        onboardingSteps: value
    })
    const setOnboardingTemplate = (value) => updateState({
        onboardingTemplate: value
    })

    const startOnboarding = () => {
        const step = 'select_template'

        setOnboarding(true)
        setOnboardingSteps(defaultSteps)
        setOnboardingStep(step)

        // `replace` to make sure user cannot go "back" and trigger signed-up event again
        history.replace(stepPath[step])
    }

    // special sign-up funnel, where user first visited the checkout page
    const startCheckoutOnboarding = () => {
        const step = 'review_and_upgrade'

        setOnboarding(true)
        setOnboardingSteps(checkoutSteps)
        setOnboardingStep(step)

        // `replace` to make sure user cannot go "back" and trigger signed-up event again
        history.replace(stepPath[step])
    }

    const stopOnboarding = () => {
        setOnboarding(false)
        setOnboardingStep(null)
        setOnboardingSteps([])
        setOnboardingTemplate(conf.defaults.resume.theme)

        trackEvent('finished-onboarding', 'interaction')
    }

    const finishOnboarding = () => {
        const params = {
            type: 'resume',
            theme: onboardingTemplate,
        }

        const method = onboardingLinkedIn ? 'linkedin' : 'onboarding'

        createCv(method, params).then(stopOnboarding).catch(stopOnboarding)
    }

    const finishCheckoutOnboarding = () => {
        stopOnboarding()

        history.push('/cvs')
    }

    const nextOnboardingStep = () => {
        if (nextStep && nextStep === 'create_resume' && onboardingLinkedIn) {
            // if LinkedIn OmniAuth is used, skip 'Create Resume' step
            finishOnboarding()
        } else if (nextStep && nextStep !== 'customize_resume') {
            setOnboardingStep(nextStep)

            history.push(stepPath[nextStep])
        } else {
            finishOnboarding()
        }
    }

    // to support 'Back' button browser functionality
    const synchronizeOnboardingStep = (pathname) => {
        if (!pathname.startsWith(stepPath[onboardingStep])) {
            const correctStep = Object.keys(stepPath).find((step) => pathname.startsWith(stepPath[step]))

            if (correctStep) {
                setOnboardingStep(correctStep)
            }
        }
    }

    return {
        finishOnboarding,
        finishCheckoutOnboarding,
        nextOnboardingStep,
        onboarding,
        onboardingLinkedIn,
        onboardingStep,
        onboardingSteps,
        onboardingTemplate,
        setOnboardingLinkedIn,
        setOnboardingTemplate,
        startOnboarding,
        startCheckoutOnboarding,
        stopOnboarding,
        synchronizeOnboardingStep,
    }
}

export default useOnboarding