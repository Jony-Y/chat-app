import {getAllChats, getChat, saveChat} from "./service";

/**
 * Create chat
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const post = async(req, res) => {
    try {
        return res.json(await saveChat({...req.body, owner:req.user.id}));
    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
};

/**
 * Fetch all user chats
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const getAll = async(req, res) => {
    try{
        return res.json(await getAllChats());
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

/** Fetch user chat
* @param req
* @param res
* @returns {Promise<*>}
*/
export const get = async(req, res) => {
    try{
        return res.json(await getChat(req.params.id));
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};
