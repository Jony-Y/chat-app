import {getAllUsers, getUser, saveUser} from "./service";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/commonUtility";

/**
 * Create user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const post = async(req, res) => {
    try {
        return res.json(await saveUser(req.body));
    }catch (err){
        console.log(err);
    }
};

/**
 * Fetch all users
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const getAll = async(req, res) => {
    try{
        return res.json(await getAllUsers());
    }catch(err){
        console.log(err);
    }
};

/**
 * Preform login
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(401).json({message:'Invalid userUtility', status:401});
        }
        const user = await getUser({email:email});
        if(!user){
            return res.status(401).json({message:'Invalid Email or Password',status:401});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid Email or Password',status:401});
        }
        user.set('password',undefined);
        user.set('token',generateToken(user.id));
        return res.json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
};

/**
 * Preform signup
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const signUp = async(req, res) => {
    try {
        let data = req.body;
        if(!data.email || !data.password) {
            return res.status(500).json({message:'Invalid fields', status:500});
        }
        bcrypt.hash(data.password, 10).then(hash => {
            data.password = hash;
        });
        if(await getUser({email:data.email})){
            return res.status(401).json({message:'userUtility already exists', status:401});
        }
        const user = await saveUser(data);
        user.set('token',generateToken(user.id));
        return res.json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
};