import * as actionTypes from './action-types'
import axios from "axios";
import {BASE_ENDPOINT} from "../../utils/app-config";

export const chatSet = (chat) => {
    return {
        type: actionTypes.CHAT_SET,
        val: chat
    }
};

export const chatAddMessage = (message) => {
    return {
        type: actionTypes.CHAT_ADD_MESSAGE,
        val: message
    }
};

export const fetchChat = (chatId) => {
    return (dispatch) => {
        axios.get(BASE_ENDPOINT + '/chats/' + chatId)
            .then((response) => {
                dispatch(chatSet(response.data))
            });
    }
};

export const fetchMessage = (message) => {
    return (dispatch) => {
        let formData = new FormData();
        if (message.type !== 'text') {
            formData.set('file', message.file)
        } else {
            formData.set('text', message.text)
        }
        //TODO
        message.id = Math.random();
        axios.post(BASE_ENDPOINT + '/message', formData)
            .then(
                dispatch(chatAddMessage(message))
            )
    }
}
