import classNames from 'classnames/dedupe'
import ReactDOM from 'react-dom'
import smoothscroll from 'smoothscroll-polyfill'
import { Provider } from 'react-redux'

// Headings font
import '@fontsource/crimson-pro/500.css'
import '@fontsource/crimson-pro/600.css'
import '@fontsource/crimson-pro/700.css'
import '@fontsource/crimson-pro/variable.css'

// Content font
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/variable.css'

import '../css/visualcv.scss'
import Styles from '../styles'

import { initializeGoogleAnalyticsForApps, initializeGTM } from '../helpers/analytics'
import { initializeErrorTracking } from '../helpers/error-tracking'
import { updateLocale } from '../locales'
import '../services/dispatcher'
import { initApp } from '../services/localstorage'
import store from '../services/store'

import Router from './router'
import Notifications from './Notifications'
import { ApplicationContextProvider } from '../contexts/ApplicationContext'

initializeGTM()
initializeErrorTracking()
initApp()
updateLocale()
smoothscroll.polyfill()

const appElement = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <ApplicationContextProvider>
      <Styles />
      <Notifications />

      <Router />
    </ApplicationContextProvider>
  </Provider>,
  appElement
)

if (process.env.CORDOVA) {
  document.body.className = classNames(document.body.className, 'cordova-app', process.env.CORDOVA)

  const handleDeviceReady = () => {
    initializeGoogleAnalyticsForApps()

    if (navigator.splashscreen) {
      navigator.splashscreen.hide()
    }
  }

  // device is not defined before the deviceready event has fired and it only fires once.
  if (typeof device === 'undefined') {
    document.addEventListener('deviceready', handleDeviceReady, false)
  } else {
    handleDeviceReady()
  }
}

// Hide loading overlay
const overlay = document.getElementById('loading-overlay')
overlay.style.opacity = 0

setTimeout(() => {
  overlay.style.display = 'none'
}, 100)
