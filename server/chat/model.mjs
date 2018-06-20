import mongoose from 'mongoose';
import BaseSchema from '../utils/schema';
import {deleteChatMessages} from "../chatMessage/service";
const Schema = mongoose.Schema;

const chatSchema = BaseSchema({
    name:{type:String, required:true},
    participants:[{
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    }],
    owner:{
        type: Schema.Types.ObjectId, ref: 'User',
        required:true
    }
});

chatSchema.pre('remove', async function(next){
    try {
        await deleteChatMessages(this._id);
        next();
    }catch(err){
        next(err);
    }
});

export default mongoose.model('Chat', chatSchema);
