import {
    createBrowserHistory,
    createHashHistory,
    createMemoryHistory
} from 'history'

const opts = {
    basename: '/app',
}

// Due to a crazy dependency chain, this gets imported via http.js in the NodeJS server.
// NodeJS doesn't have a DOM, so the router explodes with an error. To avoid this,
// we load everything normally when window is present, and stub history for NodeJS as it
// shouldn't ever call it anyway. (It's only used by specific error redirects in http.js).
const createHistory = () => {
    if (typeof window === 'undefined') {
        return createMemoryHistory(opts)
    }

    if (process.env.CORDOVA) {
        return createHashHistory(opts)
    }

    return createBrowserHistory(opts)
}

const history = createHistory()

export default history