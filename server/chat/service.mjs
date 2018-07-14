import Chat from "./model";
import isEmpty from "lodash/isEmpty";

export const saveChat = (payload) => {
    return Chat(payload).save().then(chat => chat.populate('participants').execPopulate());
};

export const getAllChats = (userId) => {
    return Chat.find({participants:`${userId}`}).sort('-updatedAt').populate('participants');
};


export const updateChatTimestamp = (chatId) => {
    return Chat.findByIdAndUpdate(chatId);
};

export const getChat = (id) => {
    return Chat.findOne({_id:id}).populate('participants');
};

export const getChatParticipants = async(id) => {
    const chatParticipants =  await Chat.findOne({_id:id}, 'participants');
    return !isEmpty(chatParticipants)?chatParticipants.participants:[];
};

export const removeChat = (id) => {
    return Chat.remove({_id:id});
};