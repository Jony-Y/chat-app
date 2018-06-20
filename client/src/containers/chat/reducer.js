import * as types from './actionTypes';
import {NEW_CHAT_SUCCESS} from "./actionTypes";

const initialState = {
    isFetching: false,
    chats: new Map()
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
                chats: new Map(action.chats.map((chat=> [chat.id,chat]))),
                isFetching: false,
                error:null
            });
        case NEW_CHAT_SUCCESS:
            let chats = state.chats;
            chats.set(action.chat.id, action.chat);
            return Object.assign({}, state, {
                chats: new Map(chats),
                isFetching: false,
                error:null
            });
        case types.CHAT_NEW_MESSAGE:
            let chat = state.chats.get(action.chatID);
            chat.messages.push(action.message);
            return {...state};
        default:
            return state;
    }
};
