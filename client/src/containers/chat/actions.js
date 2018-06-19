import * as type from './actionTypes';

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

export function fetchChats(){
    return  function(dispatch){
        dispatch(fetchChatsRequest());
        try{
            dispatch(fetchChatsSuccess());
        }catch(err){
            dispatch(fetchChatsError(err));
        }

    }
}
