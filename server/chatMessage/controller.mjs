import {deleteChatMessage, getChatMessage, getChatMessages, getCount, saveChatMessage} from "./service";
import {notifyChatParticipants} from "../userChatNotification/controller";

/**
 * Create chat message
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const post = async(req, res) => {
    try {
        const message = await saveChatMessage({...req.body, owner:req.user.id});
        await notifyChatParticipants(message);
        console.log('message created');
        return res.json(message);
    }catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
};

/**
 * Fetch all user chat messages
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const getAll = async(req, res) => {
    try{
        let messages = await getChatMessages(req.params.id, req.query.page);
        messages.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        let count = await getCount(req.params.id);
        return res.json({messages:messages, count:count});
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

/**
 * Delete a chat message
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const remove = async(req, res) => {
    try{
        const message = await getChatMessage(req.params.id);
        if(req.user.id !== message.owner){
            return res.status(403).json({message:'Unauthorized Action', status:403});
        }
        await deleteChatMessage(res.params.id);
        return res.json({success:true});
    }catch (err) {
        console.log(err);
        return res.status(500).json({success:false, ...err});
    }
};