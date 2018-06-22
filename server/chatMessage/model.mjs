import mongoose from 'mongoose';
import BaseSchema from '../utils/schema';
const Schema = mongoose.Schema;
const chatMessage = mongoose.model('ChatMessage', BaseSchema({
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
}));


export default chatMessage;
