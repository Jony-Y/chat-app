import UserChatNotification from "./model";

export const saveUnreadUserChatNotification = (chatId, userId) => {
     const unreadNotification = UserChatNotification.find({chatId:chatId, userId:userId});
         UserChatNotification.findOneAndUpdate({chatId:chatId, userId:userId},{count:unreadNotification?unreadNotification.count+1:1, isRead:false},{upsert: true});
};

export const getUnreadUserChatNotificaions = (userId, chatId) => {
    return UserChatNotification.find({chatId:chatId, userId:userId, isRead: false});
};

export const markUserChatNotificationAsRead = (userId, chatId) => {
    return UserChatNotification.findOneAndUpdate({chatId:chatId, userId}, {isRead:true, count:0});
};

export const deleteChatNotification = (userId, chatId) => {
    return UserChatNotification.remove({chatId:chatId, userId});
};