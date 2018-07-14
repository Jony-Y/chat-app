import UserChatNotification from "./model";

export const saveUnreadUserChatNotification = async(chatId, userId) => {
    try {
        const unreadNotification = await UserChatNotification.findOne({chatId: chatId, userId: userId});
        return UserChatNotification.findOneAndUpdate({
            chatId: chatId,
            userId: userId
        }, {count: unreadNotification ? unreadNotification.count + 1 : 1, isRead: false}, {upsert: true});
    }catch (err){
        throw err;
    }
};

export const getUnreadUserChatNotifications = (userId) => {
    return UserChatNotification.find({userId:userId, isRead: false});
};

export const getUnreadUserChatNotification = (userId, chatId) => {
    return UserChatNotification.find({chatId:chatId, userId:userId, isRead: false});
};

export const markUserChatNotificationAsRead = (userId, chatId) => {
    return UserChatNotification.findOneAndUpdate({chatId:chatId, userId:userId}, {isRead:true, count:0});
};

export const deleteChatNotification = (userId, chatId) => {
    return UserChatNotification.remove({chatId:chatId, userId});
};