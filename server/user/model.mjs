import mongoose from 'mongoose';
import BaseSchema from '../utils/schema';
import bcrypt from 'bcrypt';

const userSchema = BaseSchema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:String,
    lastName:String
});
userSchema.virtual('name').get(function(){
    return `${this.firstName} ${this.lastName}`;
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});
const User = mongoose.model('User', userSchema);
export default User;
