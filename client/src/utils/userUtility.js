import Cookie from 'js-cookie';
import isEmpty from "lodash/isEmpty";

class User{
    constructor(){
        this._user = {};
        this.getUserData();
    }
    storeUserData(user){
        this._user = user;
        Cookie.set(`${process.env.BASE_PATH}_user`,{id:user.id, token:user.token,email:user.email,firstName:user.firstName, lastName:user.lastName});
    }
    clearUserData(user){
        this._user = {};
        Cookie.remove(`${process.env.BASE_PATH}_user`);
    }
    getUserData(){
        if(isEmpty(this._user)){
            this._user = Cookie.getJSON(`${process.env.BASE_PATH}_user`) || {};
        }
        return this._user;
    }

    get isLoggedIn(){
        return this._user.token && this._user.id;
    }
    get name(){
        return `${this._user.firstName} ${this._user.lastName}`;
    }

    get id(){
        return this._user.id;
    }

    get token(){
        return this._user.token;
    }

    get email(){
        return this._user.email;
    }

    isOwner(owner){
        return owner.id === this._user.id;
    }

}

const user = new User();
export default user;