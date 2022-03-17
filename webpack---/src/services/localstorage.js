import cookies from 'js-cookie'
import events from './events'

/**
 * Shim localstorage to fallback to in memory storage when storage is disabled
 */
export const createMemoryStorage = () => {
    const memoryStorage = {}
    return {
        getItem: (key) => {
            if (key === undefined) {
                return memoryStorage
            }
            return memoryStorage[key]
        },
        setItem: (key, value) => {
            memoryStorage[key] = value
        },
        removeItem: (key) => {
            delete memoryStorage[key]
        },
    }
}

let storage = {}
if (!isLocalStorageAvailable()) {
    storage = createMemoryStorage()
} else {
    storage = localStorage
}

function isLocalStorageAvailable() {
    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
    const test = 'test'
    try {
        localStorage.setItem(test, test)
        localStorage.removeItem(test)
        return true
    } catch (e) {
        return false
    }
}

export const initApp = () => {
    // Initialize app with user's access token fetched from cookie
    const token = cookies.get('vcv_session')

    events.emit('APP::INIT', {
        session: {
            token
        }
    })
}

export {
    storage as localStorage
}