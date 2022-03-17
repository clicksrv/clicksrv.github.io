import {
    useContext
} from 'react'
import {
    useDispatch,
    useSelector
} from 'react-redux'

import api from '../services/api'
import history from '../services/history'

import {
    ApplicationContext
} from '../contexts/ApplicationContext'

const useJournalOnboarding = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [state, setState] = useContext(ApplicationContext)
    const {
        journalOnboardingStep: onboardingStep
    } = state

    const {
        show_journal_onboarding: onboarding
    } = user

    const {
        free_tier: freeTier
    } = user

    const onboardingSteps = freeTier ?
        ['welcome', 'new_entry', 'publish'] :
        ['welcome', 'email_settings', 'new_entry', 'publish']

    const paths = {
        welcome: '/journal/onboarding',
        email_settings: '/journal/email-settings',
        new_entry: '/journal/entries/new',
        publish: '/journal/congratulations',
    }

    const firstStepPath = paths.welcome
    const newEntryPath = paths.new_entry

    const nextOnboardingStepPath = paths[onboardingSteps[onboardingSteps.indexOf(onboardingStep) + 1]]
    const lastOnboardingStepPath = paths[onboardingSteps.slice(-1)[0]]

    const updateState = (stateParticle) =>
        setState((state) => ({
            ...state,
            ...stateParticle,
        }))

    const setOnboardingStep = (value) => updateState({
        journalOnboardingStep: value
    })

    const finishOnboarding = () => {
        const onJournalUpdated = () => dispatch({
            type: 'USER::DISMISS_JOURNAL_ONBOARDING'
        })

        api
            .updateJournal({
                show_onboarding: false
            })
            .then(onJournalUpdated)
            .catch(() => {})

        history.push(lastOnboardingStepPath)
    }

    return {
        firstStepPath,
        finishOnboarding,
        lastOnboardingStepPath,
        newEntryPath,
        nextOnboardingStepPath,
        onboarding,
        onboardingStep,
        onboardingSteps,
        setOnboardingStep,
    }
}

export default useJournalOnboarding