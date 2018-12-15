import {updateObject} from './../../../lib/utils/update-object-util'
import * as actionTypes from './../actions/action-types';


const initialState = {
    userName: undefined,
    isAuthorized: false,
    token: undefined,
    inAuthorize: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_AUTHORIZED:
            return updateObject(state, {
                isAuthorized: true,
                userName: action.val.userName,
                token: action.val.token,
                inAuthorize: false
            });
        case actionTypes.USER_UNAUTHORIZED:
            return updateObject(state, {
                isAuthorized: false,
                userName: undefined,
                token: undefined,
                inAuthorize: false
            });
        case actionTypes.USER_IN_AUTHORIATION:
            return updateObject(state, {
                isAuthorized: false,
                userName: undefined,
                token: undefined,
                inAuthorize: true
            })
    }
    return state;
};

export default reducer;