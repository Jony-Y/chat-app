import socket from "socket.io";
import {SOCKET_GENERAL_ROOM, SOCKET_JOIN_ROOM, SOCKET_LEAVE_ROOM, SOCKET_MESSAGE_ROOM} from "./constants";

class Socket{
    constructor(){
        this.io = {};
    }
    /**
     * Connect method to connect the socket and add the event listeners
     * @param server
     */
    connect(server){
        this.io = socket(server);
        this.io.on('connection',(socket) => {
            socket.on(SOCKET_GENERAL_ROOM, (data) => {
                this.io.emit(`${SOCKET_GENERAL_ROOM}:${data.userId}`, data.payload);
            });

            socket.on(SOCKET_JOIN_ROOM, (room) => {
                this.joinRoom(socket, room);
                console.log('request to join room')
            });

            socket.on(SOCKET_LEAVE_ROOM, (data) => {
                this.leaveRoom(socket, data);
            });
        });
    }

    /**
     * Join chat room
     * @param socket    {Object}    The socket connection
     * @param room  {String}    The room to join
     */
    joinRoom(socket, room){
        socket.join(room);
        console.log(`joining room ${room}`)

    }

    /**
     * Exit chat room
     * @param socket    {Object} The socket connection
     * @param room  {String}    The room to leave
     */
    leaveRoom(socket, room){
        socket.leave(room);
        console.log(`leaving room ${room}`)
    }

    /**
     * Emit message to a room
     * @param room    {Object}   The connection socket
     * @param data  {Object}    room: the room name, payload: the data to send
     */
    emitRoom(room, data = {}){
        this.io.sockets.to(room).emit(`${room}:message`, data);
        console.log(`message sent to room ${room}`)
    }

    /**
     * Get the members of a room
     * @param room  {String}    Room name
     * @returns {Array}
     */
    getRoomMembers(room){
        return this.io.sockets.adapter.rooms[room]
    }

    get socket(){
        return this.io;
    }
}
const socketIO = new Socket();
export default socketIO;


