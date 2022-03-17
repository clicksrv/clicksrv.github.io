import axios from 'axios'
import NProgress from 'nprogress'

import conf from '../conf'
import events from './events'
import history from './history'
import notify from './notify'
import store from './store'
import {
    t
} from '../locales'

// publicly exposed API actions

const api = {
    // Cart
    getCart: (plan, coupon) => {
        const basePath = `cart?tier=${plan}`
        const path = coupon ? `${basePath}&code=${coupon}` : basePath

        return request('get', path)
    },

    // User
    login: (data) => request('post', 'token', {
        user: data
    }),
    signup: (data) => request('post', 'account', {
        user: data
    }),

    deleteAccount: (downgradeReason, downgradeFeedback) => {
        const reason = encodeURIComponent(downgradeReason)
        const feedback = encodeURIComponent(downgradeFeedback)

        // DELETE cannot pass params in body, so pass them as query string
        const path = `user?user%5Bdowngrade_reason%5D=${reason}&user%5Bdowngrade_feedback=${feedback}`

        return request('delete', path)
    },

    // Subscriptions
    createSubscription: (data) => request('post', 'subscriptions', {
        subscription: data
    }),
    changeSubscription: (planCode) => request('patch', 'subscriptions', {
        subscription: {
            plan_code: planCode
        }
    }),

    cancelSubscription: (downgradeReason, downgradeFeedback) =>
        request('post', 'subscriptions/cancel', {
            subscription: {
                downgrade_reason: downgradeReason,
                downgrade_feedback: downgradeFeedback
            },
        }),

    reactivateSubscription: () => request('post', 'subscriptions/reactivate'),

    // Billing Information
    getBillingInfo: () => request('get', 'billing_info'),
    updateBillingInfo: (tokenId) => request('patch', 'billing_info', {
        billing_info: {
            token_id: tokenId
        }
    }),

    // Company admin
    inviteCompanyUser: (params) => request('post', 'company/users', {
        user: params
    }),

    // CV Samples
    getSamples: () => request('get', 'samples'),
    getPopularSamples: () => request('get', 'samples/popular'),
    getSample: (slug) => request('get', `samples/${slug}`),

    // CVs
    getCvVersions: (cv) => request('get', `cvs/${cv.id}/versions`),
    getCv: (id) => request('get', `cvs/${id}`).then(setCv),
    getCvs: () => request('get', 'cvs'),
    createCv: (params) => request('post', 'cvs', params),
    deleteCv: (id) => request('delete', `cvs/${id}`),
    restoreCv: (cv, versionId) => request('post', `cvs/${cv.id}/restore/${versionId}`),
    toggleCvPinnedState: (cv) => request('post', `cvs/${cv.id}/toggle_pinned`).then(setCv),
    updateCv: (cv) => request('patch', `cvs/${cv.id}`, cv).then(setCv),

    // Journal
    updateJournal: (data) => request('patch', 'journals', {
        journal: data
    }),

    // Journal Entries
    createJournalEntry: (params) => request('post', 'journal_entries', {
        journal_entry: params
    }),
    deleteJournalEntry: (id) => request('delete', `journal_entries/${id}`),
    getJournalEntry: (id) => request('get', `journal_entries/${id}`).then((data) => data.journal_entry),
    getJournalEntries: () => request('get', 'journal_entries'),
    updateJournalEntry: ({
        id,
        ...params
    }) => request('patch', `journal_entries/${id}`, {
        journal_entry: params
    }),

    // Formatting Service
    confirmFormattingService: (params) => request('post', 'formatting_service/confirm', {
        formatting_service: params
    }),

    // Stats
    getStats: () => request('get', 'stats'),
    getCvStats: (cvId) => request('get', `cvs/${cvId}/stats`),
}

// store helpers

const setCv = (cv) => {
    store.dispatch({
        type: 'CV::INIT',
        data: cv
    })

    return cv
}

// internals

const setDefaults = () => {
    const username = 'token'
    const password = store.getState().session.token

    axios.defaults.auth = {
        username,
        password
    }
    axios.defaults.baseURL = conf.endpoint('')
}

const onSuccess = (response) => {
    NProgress.done()

    return response.data
}

const onError = (error) => {
    const pathname = history.location.pathname

    NProgress.done()

    console.error(error)

    switch (error ? .response ? .status) {
        case 401:
        case 403:
            if (pathname === '/login') {
                throw error
            } else {
                notify.error(t('unauthorized_to_perform'))
                events.emit('SESSION::RESET')
                history.push('/login')

                break
            }
        case 429:
            // override error message; for the moment we're only limiting login attempts
            error.response.data = {
                password: t('too_many_requests'),
            }

            throw error
        case 502:
            notify.error(t('network_error'), {
                autoClose: false
            })
            error.response.data = {} // simulate empty JSON instead of an html response

            throw error
        default:
            throw error
    }
}

const request = (method, url, data) => {
    NProgress.start()

    setDefaults()

    return axios[method](url, data).then(onSuccess).catch(onError)
}

export default api