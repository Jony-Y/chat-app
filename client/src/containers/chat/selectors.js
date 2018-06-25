import { createSelector } from 'reselect';
import isEmpty from "lodash/isEmpty";
const getChats = (state) => state.chats;
const getChat = (state, id) => state.chat.chats.get(id);

/**
 *  get the user chats
 */
export const chats = createSelector(getChats, (chats) => {
    return  chats.size > 0?Array.from(chats.values()): [];
});

export const hasUnreadMessages = createSelector(getChat, (chat) => {
    return  !isEmpty(chat) && chat.unreadCount;
});
