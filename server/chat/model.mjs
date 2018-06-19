import mongoose from 'mongoose';
import BaseSchema from '../utils/schema';
const Schema = mongoose.Schema;
const chat = mongoose.model('Chat', BaseSchema({
    name:String,
    participants:[{
            type: Schema.Types.ObjectId, ref: 'User',
            required: true
        }],
    owner:{
        type: Schema.Types.ObjectId, ref: 'User',
        required:true
    }
}));


export default chat;
