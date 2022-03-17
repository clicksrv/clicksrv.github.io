import {
    useContext
} from 'react'
import {
    useDispatch
} from 'react-redux'

import api from '../services/api'
import conf from '../conf'
import notify from '../services/notify'
import themes from '../constants/themes'
import {
    ApplicationContext
} from '../contexts/ApplicationContext'
import {
    t
} from '../locales'
import {
    trackEvent
} from '../helpers/analytics'

const useCvs = () => {
    const dispatch = useDispatch()
    const [state, setState] = useContext(ApplicationContext)

    const {
        cvs,
        cvsLoading
    } = state

    // sorting function (most recently updated first)
    const compareCvs = (entryA, entryB) => {
        if (entryA.updated_at > entryB.updated_at) {
            return -1
        } else if (entryA.updated_at < entryB.updated_at) {
            return 1
        }

        return 0
    }

    const cvsLoaded = () =>
        setState((state) => ({
            ...state,
            cvsLoading: false,
        }))

    const setCvs = (newCvs) =>
        setState((state) => ({
            ...state,
            cvs: newCvs,
        }))

    const deleteCv = (id) => {
        const {
            theme
        } = cvs.find((cv) => cv.id === id)
        const {
            type
        } = conf.themes[theme]

        const onDeleted = () => {
            trackEvent('deleted-cv', 'interaction')

            notify.success(t(`${type}_deleted`))

            const newCvs = cvs.filter((cv) => cv.id !== id)

            return setCvs(newCvs)
        }

        return api.deleteCv(id).then(onDeleted)
    }

    const getCvs = () => {
        // this Redux logic could be removed once all CV operations are placed in this hook
        // it is here to reset 'current' CV
        dispatch({
            type: 'CV::INIT',
            data: conf.defaults.resume
        })

        return api.getCvs().then(setCvs).finally(cvsLoaded)
    }

    const onCvUpdated = (updatedCv) => {
        const newCvs = cvs.map((existingCv) => {
            if (existingCv.id === updatedCv.id) {
                return updatedCv
            }

            return existingCv
        })

        return setCvs(newCvs.sort(compareCvs))
    }

    const togglePinned = (cv) => {
        const {
            pinned
        } = cv
        const {
            type
        } = themes[cv.theme]

        const onPinnedUnpinned = (updatedCv) => {
            const eventName = pinned ? `unpinned-${type}` : `pinned-${type}`

            trackEvent(eventName, 'interaction')

            return updatedCv
        }

        return api.toggleCvPinnedState(cv).then(onPinnedUnpinned).then(onCvUpdated)
    }

    const updateCv = (cv) => api.updateCv(cv).then(onCvUpdated)

    return {
        cvs,
        cvsLoading,
        deleteCv,
        getCvs,
        togglePinned,
        updateCv,
    }
}

export default useCvs