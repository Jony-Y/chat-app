import ChatMessage from "./model";

export const saveChatMessage = (payload) => {
    return new ChatMessage(payload).save();
};

export const getChatMessages = (id, offset = 0) => {
    return ChatMessage.find({chatId:id}).populate('owner').sort('createdAt').skip(20*offset).limit(20);
};


export const deleteChatMessages = (chatId) => {
    return ChatMessage.remove({chatId:chatId});
};

export const deleteChatMessage = (id) => {
    return ChatMessage.remove({_id:id});
};

export const getChatMessage = (id) => {
    return ChatMessage.findOne({_id:id});
};
