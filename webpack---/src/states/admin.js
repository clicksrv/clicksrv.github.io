export default {
    'ADMIN::GET_USERS': (state, users) => ({ ...state,
        users
    }),
    'ADMIN::GET_STATS': (state, stats) => ({ ...state,
        stats
    }),
    'ADMIN::INVITE_USER': (state, user) => ({ ...state,
        users: [user, ...state.users]
    }),
    'ADMIN::GET_COMPANY': (state, company) => ({ ...state,
        company
    }),
    'ADMIN::GET_USER_CVS': (state, cvs) => ({ ...state,
        cvs
    }),
    'ADMIN::CREATE_USER_CV': (state, cv) => ({ ...state,
        cvs: [cv, ...state.cvs]
    }),
    'ADMIN::REMOVE_USER': (state, userId) => ({ ...state,
        users: state.users.filter((user) => user.id !== userId)
    }),
}