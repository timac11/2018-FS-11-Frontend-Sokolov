import {updateObject} from './../../../lib/utils/update-object-util'
import * as actionTypes from './../actions/action-types';


const initialState = {
    userName: undefined,
    isAuthorized: false,
    token: undefined
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_AUTHORIZED:
            return updateObject(state, {
                isAuthorized: true,
                userName: action.val.userName,
                token: action.val.token
            });
        case actionTypes.USER_UNAUTHORIZED:
            return updateObject(state, {
                isAuthorized: false,
                userName: undefined,
                token: undefined
            });
    }
    return state;
};

export default reducer;