import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

import conf from '../conf'
import { breakpoints } from '../components/styled/Grid'

const viewportWidth = typeof window !== 'undefined' && (window.innerWidth || document.body.clientWidth)

const initialState = {
  cvs: null,
  cvsLoading: true,
  locationHistory: [],
  journalEntries: null,
  journalEntriesLoading: true,
  journalOnboardingStep: null,
  onboarding: false,
  onboardingLinkedIn: false,
  onboardingStep: null,
  onboardingSteps: [],
  onboardingTemplate: conf.defaults.resume.theme,
  pageBreaksMode: false,
  sidebarOpen: viewportWidth >= breakpoints.xl,
  sidebarItem: null,
  viewportWidth: 0,
}

const ApplicationContext = createContext([initialState, () => {}])

const ApplicationContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  return <ApplicationContext.Provider value={[state, setState]}>{children}</ApplicationContext.Provider>
}

ApplicationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ApplicationContext, ApplicationContextProvider }
