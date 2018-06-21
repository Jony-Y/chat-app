import * as type from './actionTypes';
import request from "../../utils/request";
import {CHAT, MESSAGE} from "../../constants/urlConstants";
import isEmpty from "lodash/isEmpty";

function newMessageRequest() {
    return {
        type: type.CHAT_NEW_MESSAGE_REQUEST
    }
}

function newMessageSuccess(chatID, message) {
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

function chatMessagesSuccess(chatID, message) {
    return {
        type: type.CHAT_MESSAGES_SUCCESS,
        chatId: chatID,
        message:message
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
 * @param chatID
 * @param message
 * @returns {Function}
 */
export function sendChatMessage(chatID, message) {
    return async dispatch => {
        dispatch(newMessageRequest());
        try{
            const newMessage = await request(MESSAGE, {method:'POST', body: {chatId:chatID, body:message}});
            dispatch(newMessageSuccess(newMessage, chatID));
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
                const chatMessages = await request(`${CHAT}/${chatId}/${MESSAGE}`, {page: page});
                dispatch(chatMessagesSuccess(chatId, chatMessages));
            } catch (err) {
                dispatch(chatMessagesFailure(err));
            }

        }
    }
}