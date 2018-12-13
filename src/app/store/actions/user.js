import * as actionTypes from './action-types'

export const userAuthorized = (user) => {
    return {
        type: actionTypes.USER_AUTHORIZED,
        val: user
    }
};

export const userUnauthorized = () => {
    return {
        type: actionTypes.USER_UNAUTHORIZED
    }
};