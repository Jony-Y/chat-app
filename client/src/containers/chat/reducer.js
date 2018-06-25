import * as types from './actionTypes';
import {NEW_CHAT_SUCCESS} from "./actionTypes";
import {CHAT_CLEAR_UNREAD} from "./actionTypes";
import {CHAT_INCREMENT_UNREAD} from "./actionTypes";
import { Map } from 'immutable'

const initialState = {
    isFetching: false,
    chats: Map()
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_CHAT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case types.FETCH_CHAT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error:null
            });
        case types.FETCH_CHAT_SUCCESS:
            return Object.assign({}, state, {
                chats: Map(action.chats.map((chat=> [chat.id,chat]))),
                isFetching: false,
                error:null
            });
        case NEW_CHAT_SUCCESS:
            return {...state, chats:state.chats.set(action.chat.id, action.chat)};
        case CHAT_INCREMENT_UNREAD:
            let unreadCount = state.chats.get(action.chatId).unreadCount || 0;
            let updatedChats = state.chats.set(action.chatId, {...state.chats.get(action.chatId), unreadCount: unreadCount+1});
            return {...state, chats:updatedChats};

        case CHAT_CLEAR_UNREAD:
            state.chats.set(action.chatId, Object.assign({},state.chats.get(action.chatId), {unreadCount: 0}));
            return {...state};
        default:
            return state;
    }
};
