import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
const getChat = (state, chatID) => state.chat.chats.get(chatID);


/**
 *  get the chat messages according to the chat
 */
export const chatMessages = createSelector(getChat, (chat) => {
    return  !isEmpty(chat)?chat.messages : [];
});
