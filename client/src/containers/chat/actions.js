import * as type from './actionTypes';
import request from "../../utils/request";
import {CHAT} from "../../constants/urlConstants";

function fetchChatsSuccess(chats) {
    return {
        type: type.FETCH_CHAT_SUCCESS,
        chats: chats
    }
}

function newChatSuccess(chat) {
    return {
        type: type.NEW_CHAT_SUCCESS,
        chat: chat
    }
}

function chatsRequestError(error) {
    return {
        type: type.FETCH_CHAT_FAILURE,
        error: error
    }
}

function ChatRequest() {
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

/**
 * Send a new message to chat group
 * @param payload {Object}  The payload to create new chat
 * @returns {Function}
 */
export function createChat(payload) {
    return async dispatch => {
        dispatch(ChatRequest());
        try {
            const newChat = await request(CHAT, {method:'POST', body:payload});
            dispatch(newChatSuccess(newChat));
            return newChat;
        }catch (err) {
            dispatch(chatsRequestError())
        }
    }
}

/**
 * Fetch all user chats
 * @returns {Function}
 */
export function fetchUserChats(){
    return  async dispatch => {
        dispatch(ChatRequest());
        try{
            const chats = await request(CHAT);
            dispatch(fetchChatsSuccess(chats));
        }catch(err){
            dispatch(chatsRequestError(err));
        }

    }
}

