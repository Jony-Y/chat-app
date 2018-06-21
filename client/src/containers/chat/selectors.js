import { createSelector } from 'reselect';
const getChats = (state) => state.chats;

/**
 *  get the user chats
 */
export const chats = createSelector(getChats, (chats) => {
    return  chats.size > 0?Array.from(chats.values()): [];
});
