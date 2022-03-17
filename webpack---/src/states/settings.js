export default {
    'SETTINGS::ERROR': (state = {}, errors = {}) => {
        return { ...state,
            errors
        }
    },

    'SETTINGS::GET': (state = {}, user = {}) => {
        return { ...state,
            user: { ...state.user,
                ...user
            }
        }
    },

    'SETTINGS::PATCH': (state = {}, user = {}) => {
        // NOTE: should this even be an app state? maybe is should just be encapsulated by the component
        return { ...state,
            user: { ...state.user,
                ...user
            }
        }
    },

    'PASSWORD::PATCH': (state = {}) => {
        return state
    },

    'PASSWORD::ERROR': (state = {}) => {
        return state
    },
}