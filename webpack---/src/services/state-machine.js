// NOTE immutability is useful only in development to prevent accidental
// https://github.com/rtfeldman/seamless-immutable#performance
import deepFreeze from 'deep-freeze-strict'
import conf from '../conf'
import adminState from '../states/admin'
import applicationState from '../states/application'
import editorState from '../states/editor'
import sessionState from '../states/session'
import settingsState from '../states/settings'

function guard(object) {
    if (process.env.NODE_ENV === 'production') {
        return object
    }

    return deepFreeze(object)
}

function delegate(handler, stateComponent, data) {
    if (typeof handler === 'function') {
        return handler(stateComponent, data)
    }

    return stateComponent
}

const stateMachine = (state, action) => {
    if (!state) {
        state = guard(conf.defaults.state)
    }

    const {
        type,
        data
    } = action
    let nextState = Object.assign({}, state)

    nextState = delegate(sessionState[type], nextState, data)

    nextState.admin = delegate(adminState[type], nextState.admin, data)
    nextState.application = delegate(applicationState[type], nextState.application, data)
    nextState.settings = delegate(settingsState[type], nextState.settings, data)
    nextState.editor = delegate(editorState[type], nextState.editor, data)

    return guard(nextState)
}

export default stateMachine