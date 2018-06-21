import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    chatMessages: new Map()
};

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
            let chats = state.chatMessages;
            let messages = chats.get(action.chatId);
            messages.push(action.message);
            return Object.assign({}, state, {
                chats: new Map(chats),
                isFetching: false,
                error:null
            });
        case types.CHAT_MESSAGES_SUCCESS:
            let chatMessages = state.chatMessages;
            chatMessages.set(action.chatId, action.chatMessages);
            return Object.assign({}, state, {
                chatMessages: new Map(chatMessages),
                isFetching: false,
                error:null
            });
        default:
            return state;
    }
};
