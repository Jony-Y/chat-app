import socket from "socket.io";
import {SOCKET_GENERAL_ROOM} from "./constants";

class Socket{
    constructor(server){
        this.io = socket(server);
        this.connect();
    }

    connect(){
        this.io.on('connection',(socket) => {
            socket.on(SOCKET_GENERAL_ROOM, (data) => {
                this.io.emit(SOCKET_GENERAL_ROOM, data);
            })
        });
    }

    join(room){

    }

    leave(room){

    }
}

export default Socket;


