import express from 'express';
import user from "./user";
import chat from "./chat";
import chatMessage from './chatMessage';
import {isAuthenticated} from "./middleware/auth";
let routes = express.Router();

routes.get('/',(req, res)=> {res.status(200).json({message:'works'})});
routes.use('/user',user);

// authenticated router here
routes.use('/chat',isAuthenticated, chat);
routes.use('/message',isAuthenticated, chatMessage);

export default routes;