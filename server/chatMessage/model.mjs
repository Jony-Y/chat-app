import mongoose from 'mongoose';
import BaseSchema from '../utils/schema';
import {updateChatTimestamp} from "../chat/service";
const Schema = mongoose.Schema;
const chatMessage =  BaseSchema({
    body:{
        type:String,
        default:''
    },
    isRead:{
        type:Boolean,
        default:false
    },
    chatId:{
        type:String,
        required:true
    },
    owner:{
        type: Schema.Types.ObjectId, ref: 'User',
        required:true
    }
});

chatMessage.post('save', async function(doc, next){
    try {
        await updateChatTimestamp(doc.chatId);
        next();
    }catch(err){
        next(err);
    }
});

export default mongoose.model('ChatMessage',chatMessage);
