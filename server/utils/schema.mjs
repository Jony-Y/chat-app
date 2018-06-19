import mongoose from 'mongoose';
import {uuid} from "../utils/commonUtility";

const Schema = mongoose.Schema;

/**
 *  wrapper for schema
 * @param args
 * @returns {Schema}
 * @constructor
 */

function BaseSchema(...args){
    const schema = new Schema(Object.assign({},...args,{uuid:{type:String, default: uuid()}}), {
            timestamps:true,
            strict: false,
            toJSON:{virtuals:true},
            toObject:{virtuals:true}
        });

    schema.virtual('id').get(function(){
        return this._id;
    });
    return schema;
}

export default BaseSchema;

