import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
const getUsers = state => state.users;


/**
 *  get user list
 */
export const users = createSelector(getUsers, (userList) => {
    return  !isEmpty(userList)? userList : [];
});
