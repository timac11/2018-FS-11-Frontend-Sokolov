import * as actionTypes from './action-types';
import axios from "axios";
import {BASE_ENDPOINT} from "../../utils/app-config";

export const chatsSet = (chats) => {
    return {
        type: actionTypes.CHATS_SET,
        val: chats
    }
};


export const  chatsAddChat = (chat) => {
    return {
        type: actionTypes.CHATS_ADD_CHAT,
        val: chat
    }
};


export const fetchChats = () => {
    return (dispatch) => {
        axios.get(BASE_ENDPOINT + '/chats')
            .then((response) => {
                dispatch(chatsSet(response.data))
            });
    }
};