import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    chatMessages: {}
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
            state.chatMessages[action.chatId] = [
                ...state.chatMessages[action.chatId],
                action.message
            ];
            return {...state};

        case types.CHAT_MESSAGES_SUCCESS:
            state.chatMessages[action.chatId] = action.messages.concat(state.chatMessages[action.chatId] || []);
            return {...state};
        default:
            return state;
    }
};
