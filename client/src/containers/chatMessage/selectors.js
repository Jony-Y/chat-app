import { createSelector } from 'reselect';
const getChatMessages = (state, chatID) => state.chatMessage.chatMessages[chatID];
const getChatMessage = (state) => state.chatMessage;


/**
 *  get the chat messages according to the chat
 */
export const chatMessages = createSelector(getChatMessages, (chat ={}) => {
    return  chat.messages || [];
});

/**
 *  get the chat messages count according to the chat
 */
export const chatMessagesPageCount = createSelector(getChatMessages, (chat ={}) => {
    return  chat.pages;
});

/**
 *  get the chat messages according to the chat
 */
export const isFetchingChatMessages = createSelector(getChatMessage, (state = []) => {
    return  state.isFetching;
});
