import http from '../helpers/http'
import notify from '../services/notify'
import store from '../services/store'
import {
    company,
    companyStats,
    companyUsers,
    userCvs
} from '../transforms/admin'

function dispatch(eventType, data) {
    store.dispatch({
        type: eventType,
        data,
    })
}

const getUsers = () => {
    http.get(`company/users`, (err, resp) => {
        if (err) {
            notify.error(err)
        } else {
            dispatch('ADMIN::GET_USERS', companyUsers(resp.body))
        }
    })
}

const getAdminStats = () => {
    http.get(`admin/stats`, (err, resp) => {
        if (err) {
            notify.error(err)
        } else {
            dispatch('ADMIN::GET_STATS', companyStats(resp.body))
        }
    })
}

const getAdminCompany = () => {
    http.get('company', (err, resp) => {
        if (err) {
            notify.error(err)
        } else {
            dispatch('ADMIN::GET_COMPANY', company(resp.body))
        }
    })
}

const getUserCvs = (userId) => {
    http.get(`admin/users/${userId}/cvs`, (err, resp) => {
        if (err) {
            notify.error(err)
        } else {
            dispatch('ADMIN::GET_USER_CVS', userCvs(resp.body))
        }
    })
}

const createUserCv = (userId) => {
    http.post(`admin/users/${userId}/cvs`, {}, (err, resp) => {
        if (err) {
            notify.error(err)
        } else {
            dispatch('ADMIN::CREATE_USER_CV', userCvs([resp.body])[0])
        }
    })
}

const removeUser = (userId) => {
    // TODO: weridly inconsisstent for method to not treat the first slash consistently
    http.post(`admin/users/${userId}/leave`, {}, (err, resp) => {
        if (err) {
            notify.error(err)
        } else {
            dispatch('ADMIN::REMOVE_USER', resp.body.id)
        }
    })
}

const actions = {
    'ADMIN::GET_USERS': getUsers,
    'ADMIN::GET_STATS': getAdminStats,
    'ADMIN::GET_COMPANY': getAdminCompany,
    'ADMIN::GET_USER_CVS': getUserCvs,
    'ADMIN::CREATE_USER_CV': createUserCv,
    'ADMIN::REMOVE_USER': removeUser,
}

export default actions