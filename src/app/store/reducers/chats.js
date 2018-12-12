import {updateObject} from './../../../lib/utils/update-object-util';
import * as actionTypes from './../actions/action-types';

/**
 *
 * @type {{chats: Array}}
 * chats is Array that contains objects :
 * {
 *      id: '', (string uuid)
 *      chatName: '', (string)
 *      lastMessage: '', (string)
 *      messagesCount: '' (int)
 * }
 */
const initialState = {
    chats: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHATS_SET:
            return updateObject(state, {chats: action.val});
        case actionTypes.CHATS_ADD_CHAT:
            return updateObject(state, state.chats.concat(action.val));
    }
    return state;
};

export default reducer;