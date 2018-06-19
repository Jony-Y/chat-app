import {AUTH_SUCCESS, AUTH_REQUEST, AUTH_FAILURE} from './actionTypes';
import {login} from '../user/actions';

function authSuccess(){
    return {type:AUTH_SUCCESS}
}

function authRequest(){
    return {type:AUTH_REQUEST}
}

function authFailure(err){
    return {
        type:AUTH_FAILURE,
        error:err
    }
}

/**
 * Perform user login
 * @param email {String}    user selected email
 * @param password  {String}    user selected password
 * @returns {Function}
 */
export function loginUser(email, password){
    return async dispatch => {
        if(email && password){
            dispatch(authRequest());
            try{
                await login(email, password);
                dispatch(authSuccess())
            }catch (e) {
                dispatch(authFailure(e))
            }

        }
    }
}
