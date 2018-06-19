import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    users: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_USERS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case types.FETCH_USERS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error:null
            });
        case types.FETCH_USERS_SUCCESS:
            return Object.assign({}, state, {
                users: [...action.users],
                isFetching: false,
                error:null
            });
        default:
            return state;
    }
};
