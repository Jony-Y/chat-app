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