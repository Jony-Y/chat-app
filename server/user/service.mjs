import User from "./model";

export const saveUser = (payload) => {
    return new User(payload).save();
};

export const getAllUsers = () => {
    return User.find();
};

export const getUser = (payload) => {
    return User.findOne(payload).select('+password');
};
