import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
const getChatMessages = (state, chatID) => state.chatMessage.chatMessages.get(chatID);


/**
 *  get the chat messages according to the chat
 */
export const chatMessages = createSelector(getChatMessages, (chat) => {
    return  !isEmpty(chat)?chat.messages : [];
});

