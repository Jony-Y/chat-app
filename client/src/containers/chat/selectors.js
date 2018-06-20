import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
const getChat = (state, chatID) => state.chat.chats.get(chatID);
const getChats = (state) => state.chats;


/**
 *  get the chat messages according to the chat
 */
export const chatMessages = createSelector(getChat, (chat) => {
    return  !isEmpty(chat)?chat.messages : [];
});


/**
 *  get the user chats
 */
export const chats = createSelector(getChats, (chats) => {
    return  chats.size > 0?Array.from(chats.values()): [];
});
