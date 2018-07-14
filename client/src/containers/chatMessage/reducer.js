import * as types from './actionTypes';
import isEmpty from "lodash/isEmpty";

const initialState = {
    isFetching: false,
    chatMessages: {}
};

/**
 * check if chat is empty
 */
function hasChat(state,chatId) {
    return !isEmpty(state.chatMessages[chatId])
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CHAT_MESSAGES_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case types.CHAT_MESSAGES_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error:null
            });
        case types.CHAT_NEW_MESSAGE_SUCCESS:
            state.chatMessages[action.chatId] = {
                messages:[...(hasChat(state,action.chatId)?state.chatMessages[action.chatId].messages:[]), action.message],
                pages:state.pages};
            return {...state};

        case types.CHAT_MESSAGES_SUCCESS:
            let messages = [];
            if(!action.page){
                messages = (hasChat(state,action.chatId)?state.chatMessages[action.chatId].messages: []).concat(action.messages);
            }else{
                messages = action.messages.concat(hasChat(state,action.chatId)?state.chatMessages[action.chatId].messages: []);
            }
            state.chatMessages[action.chatId] = {
                messages:messages,
                pages: Math.floor(action.count/50)
            };
            state.isFetching = false;
            return {...state};
        default:
            return state;
    }
};
