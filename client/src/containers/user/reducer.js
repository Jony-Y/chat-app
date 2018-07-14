import * as types from './actionTypes';

const initialState = {
    isFetching: false,
    users: new Map()
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
                users: new Map(action.users.map(user => [user.id, user])),
                isFetching: false,
                error:null
            });
        default:
            return state;
    }
};
