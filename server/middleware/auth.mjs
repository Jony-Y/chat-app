import {secretKey} from "../config";
import jwt from "jsonwebtoken";
import User from '../user/model';

/**
 * Wrapper checking is user token fits the encoded jwt toke and append the user to the request
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function isAuthenticated(req, res,next) {
    const auth = req.headers['authorization'] || req.headers['Authorization'];
    if(!auth){
        return res.json({status:403, message:'No Token Provided'})
    }
    const token = auth.replace('Bearer ','');
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.json({message: 'Failed to authenticate token.', status: 403});
        }else {
            User.findOne({_id: decoded.id}, (err, user) => {
                if (err)
                    return res.json({message: err, status: 403});
                if (!user)
                    return res.json({message: 'Invalid Token', status: 403});
                req.user = user;
            });
            next();
        }
    });
}