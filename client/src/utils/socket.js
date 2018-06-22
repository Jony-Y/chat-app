import io from 'socket.io-client';
import userUtility from './userUtility';
import {SOCKET_GENERAL_ROOM, SOCKET_JOIN_ROOM, SOCKET_LEAVE_ROOM} from "../constants/constants";

class Socket {
    constructor() {
        this.io = io.connect(process.env.REACT_APP_SOCKET_URL);
    }

    subscribeGeneral(cb){
        this.io.on(`${SOCKET_GENERAL_ROOM}:${userUtility.id}`, (payload)=>{cb(payload)});
    }

    subscribeRoom(room){
        this.io.emit(SOCKET_JOIN_ROOM, room);
    }

    unsubscribeRoom(channel){
        this.io.emit(`${SOCKET_LEAVE_ROOM}`, channel);
    }

    listen(channel, cb){
        this.io.on(channel,(payload)=> {
            cb(payload)
        })
    }

    get socket(){
        return this.io;
    }
}
const socketIO = new Socket();
export default socketIO;


