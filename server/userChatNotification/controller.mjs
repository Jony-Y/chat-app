import {getUnreadUserChatNotifications, markUserChatNotificationAsRead, saveUnreadUserChatNotification} from "./service";
import {CHAT, SOCKET_GENERAL_ROOM} from "../utils/constants";
import io from '../utils/Socket';
import {getChatParticipants} from "../chat/service";
import {arrayDiff} from "../utils/commonUtility";

/**
 * Create chat message
 * @param message {Object}  the new messsage to notify
 * @returns {Promise<*>}
 */
export const notifyChatParticipants = async(message) => {
    try {
        const chatId = message.chatId;
        const chatParticipants = await getChatParticipants(chatId);
        io.emitRoom(`${CHAT}:${chatId}`, message);
        const roomParticipants = io.getRoomMembers(`${CHAT}:${chatId}`);
        const outOfRoomParticipants = arrayDiff(chatParticipants, roomParticipants);
        outOfRoomParticipants.forEach(async(participant) => {
            if(!io.hasRoom(`${SOCKET_GENERAL_ROOM}:${participant}`)){
                console.log(`saving unread notification count chat: ${chatId} participant: ${participant}`);
                const resp = await saveUnreadUserChatNotification(chatId, participant);
                console.log(resp);
            }else{
                io.emitRoom(`${SOCKET_GENERAL_ROOM}:${participant}`, message);
            }
        });
    }catch (err){
        console.log(err);
        throw err;
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
        console.log(`fetching unread notifications for user ${req.user.id}`);
        let unreadUserChatNotifications = await getUnreadUserChatNotifications(req.user.id);
        return res.json(unreadUserChatNotifications);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

/**
 * Mark unread notification as read
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const markAsRead = async(req, res) => {
    try{
        await markUserChatNotificationAsRead(req.user.id, req.body.chatId);
        console.log(`mark unread notifications as read for chat ${req.body.chatId}`);
        return res.json({success:true});
    }catch (err) {
        console.log(err);
        return res.status(500).json({success:false, ...err});
    }
};