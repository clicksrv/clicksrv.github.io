import _ from 'lodash'
import conf from '../conf'

export default {
    'APP::INIT': (_state, cachedState = {}) => {
        // NOTE: _.merge has a different behaviour, it might prioritize the non-null default value
        return _.defaultsDeep({}, cachedState, conf.defaults.state)
    },

    'CV::INIT': (state, cv) => {
        // Add default sections to newly created CVs
        const type = conf.themes[cv.theme].type
        const updated = _.defaultsDeep(cv, conf.defaults[type])

        return {
            ...state,
            editor: {
                ...state.editor,
                cv: updated,
            },
        }
    },

    'SESSION::INIT': (state, user) => {
        const {
            id,
            token
        } = user

        return {
            ...state,
            session: {
                ...state.session,
                id,
                token,
                user,
            },
        }
    },

    'SESSION::AUTH': (state, token) => {
        if (!token) return state
        const updates = {
            session: {
                token
            }
        }
        return _.merge({}, state, updates)
    },

    'SESSION::RESET': (state) => {
        return {
            ...conf.defaults.state,
            application: {
                ...conf.defaults.state.application,
                locale: state.application.locale,
            },
        }
    },

    'USER::DISMISS_JOURNAL_ONBOARDING': (state) => {
        return {
            ...state,
            session: {
                ...state.session,
                user: {
                    ...state.session.user,
                    show_journal_onboarding: false,
                },
            },
        }
    },

    'USER::SET_JOURNAL_REMINDERS': (state, {
        journal: {
            reminders
        }
    }) => {
        return {
            ...state,
            session: {
                ...state.session,
                user: {
                    ...state.session.user,
                    journal_reminders: reminders,
                },
            },
        }
    },

    'USER::NEW_JOURNAL_ENTRY': (state, journalEntry) => {
        return {
            ...state,
            session: {
                ...state.session,
                user: {
                    ...state.session.user,
                    journal_entries_count: state.session.user.journal_entries_count + 1,
                    latest_journal_entry_created_at: journalEntry.created_at,
                },
            },
        }
    },

    'SETTINGS::PATCH': (state = {}, user = {}) => {
        return {
            ...state,
            session: {
                ...state.session,
                user: {
                    ...state.session.user,
                    ...user,
                },
            },
        }
    },
}