import {
    applyMiddleware,
    createStore
} from 'redux'
import {
    createLogger
} from 'redux-logger'
import stateMachine from './state-machine'

let createStoreWithMiddleware = createStore

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger()
    createStoreWithMiddleware = applyMiddleware(logger)(createStore)
}

let debugging = null

// only applies to the browser
if (typeof window !== 'undefined') {
    if (window.Cypress) {
        window.__REDUX_DEVTOOLS_EXTENSION__ = window.parent.__REDUX_DEVTOOLS_EXTENSION__
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = window.parent.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }

    debugging = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}

const store = createStoreWithMiddleware(stateMachine, debugging)

export default store