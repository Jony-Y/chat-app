import mongoose from 'mongoose';
import BaseSchema from '../utils/schema';
const userChatNotificationSchema = BaseSchema({
    isRead:{
        type:Boolean,
        default:false
    },
    chatId:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:1
    },
    userId:{
        type: String,
        required:true
    }
});

userChatNotificationSchema.index({userId:1, chatId:1},{unique: true});



export default mongoose.model('UserChatNotification', userChatNotificationSchema);
