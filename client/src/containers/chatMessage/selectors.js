import { createSelector } from 'reselect';
const getChatMessages = (state, chatID) => state.chatMessage.chatMessages[chatID];


/**
 *  get the chat messages according to the chat
 */
export const chatMessages = createSelector(getChatMessages, (messages = []) => {
    return  messages;
});

