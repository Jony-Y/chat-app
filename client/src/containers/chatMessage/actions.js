import * as type from './actionTypes';
import request from "../../utils/request";
import {CHAT, MESSAGE} from "../../constants/urlConstants";
import isEmpty from "lodash/isEmpty";

function newMessageRequest() {
    return {
        type: type.CHAT_NEW_MESSAGE_REQUEST
    }
}

export function newMessageSuccess(chatID, message) {
    return {
        type: type.CHAT_NEW_MESSAGE_SUCCESS,
        chatId: chatID,
        message:message
    }
}

function chatMessagesFailure(err) {
    return {
        type: type.CHAT_MESSAGES_FAILURE,
        error: err,
    }
}

function chatMessagesRequest() {
    return {
        type: type.CHAT_MESSAGES_REQUEST
    }
}

function chatMessagesSuccess(chatID, data = {}) {
    return {
        type: type.CHAT_MESSAGES_SUCCESS,
        chatId: chatID,
        messages:data.messages || [],
        count: data.count
    }
}

function newMessageFailure(err) {
    return {
        type: type.CHAT_NEW_MESSAGE_FAILURE,
        error: err,
    }
}

/**
 * Send a new message to chat group
 * @param chatID {String}   The chat id to save to
 * @param message   {String}    THe message body to save
 * @returns {Function}
 */
export function sendChatMessage(chatID, message) {
    return async dispatch => {
        dispatch(newMessageRequest());
        try{
            await request(MESSAGE, {method:'POST', body: {chatId:chatID, body:message}});
        }catch (err) {
            dispatch(newMessageFailure(err));
        }
    }
}

/**
 * Fetch all user chats
 * @returns {Function}
 */
export function fetchChatMessages(chatId, page = 0){
        return async dispatch => {
            if(!isEmpty(chatId)) {
                dispatch(chatMessagesRequest());
            try {
                const data = await request(`${CHAT}/${chatId}/${MESSAGE}`, {page: page});
                dispatch(chatMessagesSuccess(chatId, data));
            } catch (err) {
                dispatch(chatMessagesFailure(err));
            }

        }
    }
}