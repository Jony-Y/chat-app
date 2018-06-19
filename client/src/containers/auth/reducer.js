import * as types from './actionTypes';
const initialState = {
    isAuthenticating: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_FAILURE:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'error': action.error
            });
        case types.AUTH_REQUEST:
            return Object.assign({}, state, {
                'isAuthenticating': true
            });
        case types.AUTH_SUCCESS:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'error':null
            });
        default:
            return state;
    }
};
