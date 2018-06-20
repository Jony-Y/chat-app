import Chat from "./model";

export const saveChat = (payload) => {
    return new Chat(payload).save();
};

export const getAllChats = () => {
    return Chat.find().populate('participants');
};

export const getChat = (id) => {
    return Chat.findOne({_id:id}).populate('participants');
};

export const removeChat = (id) => {
    return Chat.remove({_id:id});
};