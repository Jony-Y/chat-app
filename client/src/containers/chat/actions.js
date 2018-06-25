import * as type from './actionTypes';
import request from "../../utils/request";
import {CHAT} from "../../constants/urlConstants";
import isEmpty from "lodash/isEmpty";
import userUtility from "../../utils/userUtility";

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

/**
 * Set the chat name in case there is none;
 * @param chat
 * @private
 */
function _setChatName(chat){
    if(chat.participants.length === 2 && isEmpty(chat.name)){
        chat.name = userUtility.isOwner(chat.participants[0])?chat.participants[1].name:chat.participants[0].name;
    }
}

/**
 * Process the server chat data
 * @param chats {Array} chat list
 * @returns {Array}
 * @private
 */
function _processUserChats(chats) {
    return chats.map(chat=>{
        _setChatName(chat);
        return chat;
    })

}

export function incrementUnread(chatId) {
    return {
        type: type.CHAT_INCREMENT_UNREAD,
        chatId: chatId
    }
}

export function clearUnread(chatId) {
    return {
        type: type.CHAT_CLEAR_UNREAD,
        chatId: chatId
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
            let newChat = await request(CHAT, {method:'POST', body:payload});
            _setChatName(newChat);
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
            const chats = _processUserChats(await request(CHAT));
            dispatch(fetchChatsSuccess(chats));
        }catch(err){
            dispatch(chatsRequestError(err));
        }
    }
}

