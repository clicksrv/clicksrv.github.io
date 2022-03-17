import map from 'lodash/map'
import pick from 'lodash/pick'
import {
    camelizeKeys
} from 'humps'

const objectPick = (obj, keys) => pick(camelizeKeys(obj), keys)
const collectionPick = (collection, keys) => map(collection, (o) => objectPick(o, keys))

export const companyUsers = (users) => {
    const keys = [
        'id',
        'firstName',
        'lastName',
        'companyAdmin',
        'createdAt',
        'currentSignInAt',
        'latestCvId',
        'latestCvUrl',
        'email',
    ]

    return collectionPick(users, keys)
}

export const companyStats = (stats) => {
    const keys = ['users', 'createdCvs', 'totalCvViews', 'cvsUpdatedThisWeek', 'userLoginsThisWeek']

    return objectPick(stats, keys)
}

export const company = (comp) => {
    const keys = ['id', 'key']

    return objectPick(comp, keys)
}

export const userCvs = (cvs) => {
    const keys = ['id', 'url', 'name', 'userId', 'createdAt', 'updatedAt']

    return collectionPick(cvs, keys)
}