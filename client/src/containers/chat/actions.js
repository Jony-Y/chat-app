import * as type from './actionTypes';
import request from "../../utils/request";
import {CHAT} from "../../constants/urlConstants";

function fetchChatsSuccess(chats) {
    return {
        type: type.FETCH_CHAT_SUCCESS,
        chats: chats
    }
}

function fetchChatsError(error) {
    return {
        type: type.FETCH_CHAT_FAILURE,
        error: error
    }
}

function fetchChatsRequest() {
    return {
        type: type.FETCH_CHAT_REQUEST
    }
}

function newMessage(chatID, message) {
    return {
        type: type.CHAT_NEW_MESSAGE,
        chatID: chatID,
        message:message
    }
}

/**
 * Send a new message to chat group
 * @param chatID
 * @param message
 * @returns {Function}
 */
export function addMessage(chatID, message) {
    return function (getState, dispatch) {
        if (getState.chat.chats.has(chatID)) {
            dispatch(newMessage(chatID,message))
        }
    }
}

export function fetchUserChats(){
    return  async dispatch => {
        dispatch(fetchChatsRequest());
        try{
            const chats = await request(CHAT);
            dispatch(fetchChatsSuccess(chats));
        }catch(err){
            dispatch(fetchChatsError(err));
        }

    }
}

