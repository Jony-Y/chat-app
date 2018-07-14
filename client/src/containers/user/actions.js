import {go} from "../../utils/navigationUtility";
import {LOGIN, SIGN_UP, USER, USER_CHAT_NOTIFICATION} from "../../constants/urlConstants";
import userUtility from "../../utils/userUtility";
import request from "../../utils/request";
import {FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS} from "./actionTypes";
import {incrementUnread} from "../chat/actions";

function fetchUsersSuccess(users){
    return {
        type: FETCH_USERS_SUCCESS,
        users:users
    }
}

function fetchUsersRequest(){
    return {type:FETCH_USERS_REQUEST}
}

function fetchUsersFailure(err){
    return{
        type:FETCH_USERS_FAILURE,
        error:err
    }
}


/**
 * Fetch all users
 * @returns {Function}
 */
export function fetchUsers(){
    return async dispatch => {
        dispatch(fetchUsersRequest());
        try{
            const users = await request(USER);
            dispatch(fetchUsersSuccess(users));
        }catch (err) {
            dispatch(fetchUsersFailure(err))
        }
    }
}

/**
 * Perform user login
 * @param email {String}    user selected email
 * @param password  {String}    user selected password
 * @returns {Function}
 */
export async function login(email, password){
    try {
        const user = await request(LOGIN, {method:'POST', body:{email: email, password: password}});
        userUtility.storeUserData(user);
        go('/');
        return user;
    } catch (err){
        logout();
        throw err;
    }
}

/**
 * Perform user sign up
 * @param payload {Object}    user data to save
 * @returns {Function}
 */
export async function signUp(payload){
    try {
        const user = await request(SIGN_UP, {method:'POST', body:payload});
        userUtility.storeUserData(user);
        go('/');
        return user;
    } catch (err){
        logout();
        throw err;
    }
}

/**
 * Fetch all user unread chat notifications
 * @returns {Function}
 */
export function fetchUnreadChatNotifications(){
    return async dispatch => {
        try {
            const unreadNotifications = await request(USER_CHAT_NOTIFICATION);
            unreadNotifications.forEach(notification => dispatch(incrementUnread(notification.chatId, notification.count)))
        } catch (err) {}
    }
}

/**
 * Perform logout functionality
 */
export function logout(){
    userUtility.clearUserData();
    go('/auth');
}