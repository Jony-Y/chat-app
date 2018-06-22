import {deleteChatMessage, getChatMessage, getChatMessages, saveChatMessage} from "./service";
import {SOCKET_MESSAGE_ROOM, CHAT} from "../utils/constants";
import io from '../utils/socket';

/**
 * Create chat message
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const post = async(req, res) => {
    try {
        const message = await saveChatMessage({...req.body, owner:req.user.id});
        io.emitRoom(`${CHAT}:${message.chatId}`, message);
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
        messages.sort((a,b) => a.createdAt - b.createdAt);
        return res.json(messages);
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