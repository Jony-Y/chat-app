import app from './containers/app/reducer';
import chat from './containers/chat/reducer';
import auth from './containers/auth/reducer';
import user from './containers/user/reducer';
import {combineReducers} from 'redux';

/**
 * Our app reducers
 */
const rootReducer = combineReducers({
    app,
    auth,
    user,
    chat
});
export default rootReducer;