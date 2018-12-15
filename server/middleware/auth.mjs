import {secretKey} from "../config";
import jwt from "jsonwebtoken";

/**
 * Wrapper checking is user token fits the encoded jwt toke and append the user to the request
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function isAuthenticated(req, res, next) {
    const auth = req.headers['authorization'] || req.headers['Authorization'];
    if(!auth){
        return res.json({status:403, message:'No Token Provided'})
    }
    const token = auth.replace('Bearer ','');
    jwt.verify(token, secretKey, async(err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Failed to authenticate token.', status: 403});
        }else {
            req.user =  {id: decoded.id};
            next();
        }
    });
}