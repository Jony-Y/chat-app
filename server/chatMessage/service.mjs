import ChatMessage from "./model";

export const saveChatMessage = (payload) => {
    return ChatMessage(payload).save().then(message => message.populate('owner').execPopulate());
};

export const getChatMessages = (id, offset = 0) => {
    return ChatMessage.find({chatId:id}).populate('owner').sort({createdAt:-1}).skip(50*offset).limit(50);
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
