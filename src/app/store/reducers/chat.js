import {updateObject} from './../../../lib/utils/update-object-util';
import * as actionTypes from './../actions/action-types';

const initialState = {
    chatId: '',
    messages: [],
    users: []
};

const reducer = (state = initialState, action) => {
    const val = action.val;
    switch (action.type) {
        case actionTypes.CHAT_SET:
            return updateObject(state, {
                chatId: val.chatId,
                messages: val.messages,
                users: val.users
            });
        case actionTypes.CHAT_ADD_MESSAGE:
            return updateObject(state, {
                messages: state.messages.concat(val)
            });
    }
    return state;
};

export default reducer;