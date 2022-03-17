import {
    useContext
} from 'react'

import publicPaths from '../helpers/publicPaths'
import {
    ApplicationContext
} from '../contexts/ApplicationContext'

// prettier-ignore
const takeoversRegExp = new RegExp('^' +
    '(/checkout' +
    '|/account/delete' +
    '|/account/downgrade' +
    '|/create-resume' +
    '|/template' +
    '|/thank-you' +
    '|/update-billing' +
    '|/upload' +
    '|/uploaded' +
    '|/resumes/new' +
    '|/websites/new' +
    '|/cover-letters/new' +
    '|/.+?modal=.+' +
    ')')

const useLocationHistory = () => {
    const [state, setState] = useContext(ApplicationContext)

    const defaultLocation = '/cvs'

    const {
        locationHistory
    } = state

    const previousLocation = (locationHistory && locationHistory.slice(-1)[0]) || defaultLocation

    const pushLocation = (pathname, search) => {
        const path = `${pathname}${search}`

        // only add regular pages to location history (no takeovers/public paths)
        if (path.match(takeoversRegExp) || publicPaths.includes(pathname)) {
            return
        }

        // strip `event` query param so that events aren't executed twice
        const params = new URLSearchParams(search)
        params.delete('event')

        const location = params.toString().length > 0 ? `${pathname}?${params}` : pathname

        // don't store duplicated entries
        if (location === previousLocation) {
            return
        }

        setState((state) => ({
            ...state,
            locationHistory: [...state.locationHistory, location],
        }))
    }

    return {
        locationHistory,
        previousLocation,
        pushLocation,
    }
}

export default useLocationHistory