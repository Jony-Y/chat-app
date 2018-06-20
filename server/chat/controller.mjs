import {getAllChats, getChat, removeChat, saveChat} from "./service";

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
        return res.json(await getAllChats(req.user.id));
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

/**
 * Delete a chat between two users
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const remove = async(req, res) => {
    try{
        const chat = await getChat(req.params.id);
        if(req.user.id !== chat.owner){
            return res.status(403).json({message:'Unauthorized Action', status:403});
        }
        await removeChat(res.params.id);
       return res.json({success:true});
    }catch (err) {
        console.log(err);
        return res.status(500).json({success:false, ...err});
    }
};