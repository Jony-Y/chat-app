import User from "./model";

export const saveUser = (payload) => {
    return User(payload).save();
};

export const getAllUsers = () => {
    return User.find();
};

export const getUser = (payload) => {
    return User.findOne(payload).select('+password');
};


export const getUserById = (id) => {
    return User.findOne({_id:id});
};
