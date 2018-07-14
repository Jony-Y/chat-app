import jwt from 'jsonwebtoken';
import {secretKey} from "../config";
/**
 * Generate a GUID
 * @returns {string}
 */
export function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export function generateToken(userID){
    return jwt.sign({id:userID}, secretKey);
}

export function decodeToken(token){
    jwt.verify(token, secretKey, (err, decoded)=> {
        if (err)
            return {auth: false, message: 'Failed to authenticate token.', status: 403};
        else
            return decoded.id
    });

}

/**
 * Compare diff between two flat arrays
 * @param arr1  {Array} Lead array - check unique on it
 * @param arr2  {Array} Comparable Array
 */
export function arrayDiff(arr1=[], arr2=[]) {
    let set = new Set(arr2);
    return arr1.filter((item) => !set.has(typeof item === 'object'?`${item}`:item));
}