import { createSelector } from 'reselect';
const getChatMessages = (state, chatID) => state.chatMessage.chatMessages[chatID];
const getChatMessage = (state) => state.chatMessage;


/**
 *  get the chat messages according to the chat
 */
export const chatMessages = createSelector(getChatMessages, (messages = []) => {
    return  messages;
});


/**
 *  get the chat messages according to the chat
 */
export const isFetchingChatMessages = createSelector(getChatMessage, (state = []) => {
    return  state.isFetching;
});

