import cookies from 'js-cookie'

import adminActions from '../actions/admin'
import conf from '../conf'
import {
    stopTrackingUser,
    trackUser
} from '../helpers/analytics'
import {
    setUserForErrorTracking
} from '../helpers/error-tracking'
import http from '../helpers/http'
import {
    t,
    updateLocale
} from '../locales'
import events from './events'
import history from './history'
import notify from '../services/notify'
import store from './store'
import {
    localStorage
} from '../services/localstorage'

/**
 * The role of dispatcher is to translate user actions into dispatch events as input to store state machine
 * - Most of the times it could be direct translations however async calls needs to be re-wired
 * - To make it more concise we are not using action creators as per Redux, and actions CAN have side effects.
 */

// TODO handle and warn about unhandled user actions
const dispatchers = {
    'APPLICATION::TOGGLE_MENU': forward,
    'APPLICATION::SET_LOCALE': forward,
    'APP::INIT': forward,
    'SETTINGS::GET': request('user'), // TODO Deprecate
    'SETTINGS::PATCH': updateSettings, // TODO Deprecate
    'PASSWORD::PATCH': updatePassword, // TODO Deprecate
    'SESSION::INIT': initSession,
    'SESSION::LOGOUT': logout,
    'SESSION::RESET': resetSession,
    'USER::GET': getUser,
    'CV::INIT': forward,
    'CV::GET': getCV,
    'CV::UPDATE': saveCV,
    'CV::SORT': saveCV,
    'CV::SORT_ARTICLES': saveCV,
    'CV::TOGGLE_PAGE_BREAK': saveCV,
    'CV::UPDATE_THEME': saveCVTheme,
    'CV::APPEND_SECTION': saveCV,
    'CV::PREPEND_ARTICLE': saveCV,
    'CV::REMOVE_ARTICLE': saveCV,
    'CV::REMOVE_SECTION': saveCV,
    'CV::RESET': resetCv,
    ...adminActions,
}

for (const event in dispatchers) {
    const handler = listen(event)
    events.on(event, handler)
}

function listen(_event) {
    const event = _event

    return function() {
        const dispatcher = dispatchers[event]

        if (!dispatcher) {
            console.warn('Unmatched Action-Dispatcher', event)
        } else {
            dispatcher.apply({
                event
            }, arguments)
        }
    }
}

function dispatch(eventType, data) {
    store.dispatch({
        type: eventType,
        data,
    })
}

function forward(data) {
    dispatch(this.event, data)
}

/**
 * Handles a standard http request
 * - emits the current event when request is successful
 * - emits an '::ERROR' event if there's an error
 */
function request(endpoint, options = {}) {
    return function(body) {
        const eventType = this.event
        const eventDomain = eventType.split('::')[0]
        const requestType = options.requestType ? options.requestType : this.event.split('::').pop()

        http.request(requestType, endpoint, body, onEnd)

        function onEnd(err, resp = {}) {
            if (err) {
                dispatch(`${eventDomain}::ERROR`, resp.body)
            } else {
                dispatch(options.respEvent || eventType, resp.body)
            }
        }
    }
}

function initSession(user) {
    dispatch('SESSION::INIT', user)

    // with setting this cookie here we could stop setting the cookie in the server app
    // setting expiry so that Cordova persists this cookie and user is not logged out
    cookies.set('vcv_session', user.token, {
        expires: 365
    })

    setUserForErrorTracking(user)
    trackUser(user)

    updateLocale()
}

function updateSettings(data) {
    http.request('PATCH', 'user', {
        user: data
    }, (err, res = {}) => {
        if (err) {
            dispatch('SETTINGS::PATCH::ERROR', res.body)
        } else {
            dispatch('SETTINGS::PATCH', res.body)

            updateLocale()

            notify.success(t('your_settings_have_been_saved'))
        }
    })
}

function updatePassword(data) {
    http.request('PATCH', 'password', {
        user: data
    }, (err, res = {}) => {
        if (err) {
            dispatch('PASSWORD::ERROR', res.body)

            notify.error(t('password_change_error'))
        } else {
            dispatch('PASSWORD::PATCH', res.body)

            notify.success(t('password_has_been_reset'))
        }
    })
}

function getCV(id) {
    if (Number.isNaN(id)) {
        id = 'latest'
    }

    // If id is not available, it'll query for the last modified CV
    http.get(`cvs/${id}`, (err, resp) => {
        if (err) {
            notify.error(err.message)
            return
        }

        if (resp.body) {
            dispatch('CV::INIT', resp.body)
        }
    })
}

function getUser() {
    http.get('user', (err, res = {}) => {
        if (err) {
            notify.error(err.message)
            history.push('/login')
            return
        }

        initSession(res.body.user)
    })
}

function persistCV() {
    const {
        cv
    } = store.getState().editor

    const id = cv && cv.id

    const method = id && !isNaN(id) ? 'PATCH' : 'POST' // NOTE id 0 is not allowed

    http.request(method, `cvs/${id || ''}`, cv, (err, resp) => {
        if (err) {
            http.errHandler(err)
        } else if (isNaN(cv.id)) {
            // new cv
            dispatch('CV::INIT', resp.body)
        }
    })
}

function saveCVTheme(theme) {
    const pathname = history.location.pathname

    history.push(pathname)

    saveCV.call(this, theme)
}

function resetCv() {
    dispatch('CV::RESET', null)
}

function saveCV(data) {
    dispatch(this.event, data)
    persistCV()
}

function resetSession() {
    cookies.remove('vcv_session')

    dispatch('SESSION::RESET')
}

function logout() {
    http.destroy(conf.endpoint('token'))

    resetSession()
    stopTrackingUser()

    localStorage.removeItem('vcv_return_to')
    localStorage.removeItem('vcv_sample')

    history.push('/login')
}