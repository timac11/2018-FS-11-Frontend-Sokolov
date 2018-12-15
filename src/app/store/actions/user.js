import * as actionTypes from './action-types'
import {BASE_ENDPOINT} from "../../utils/app-config";
import axios from "axios";

export const userAuthorized = (user) => {
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', user.userName);
    return {
        type: actionTypes.USER_AUTHORIZED,
        val: user
    }
};

export const userUnauthorized = () => {
    localStorage.clear();
    return {
        type: actionTypes.USER_UNAUTHORIZED
    }
};

export const userStartAuthorization = () => {
    return {
        type: actionTypes.USER_IN_AUTHORIATION
    }
};

export const userAuthorize = (formData) => {
    return (dispatch) => {
        axios.post(BASE_ENDPOINT + '/authorize', formData)
            .then((response) => {
                dispatch(userAuthorized(response.data));
            });
    }
};

export const userAutoLogin = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');
        if (token) {
            dispatch(userAuthorized({token, userName}));
        }
    }
};