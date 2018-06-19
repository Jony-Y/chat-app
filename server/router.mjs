import express from 'express';
import user from "./user/index";
import chat from "./chat/index";
import {isAuthenticated} from "./middleware/auth";
let routes = express.Router();

routes.get('/',(req, res)=> {res.status(200).json({message:'works'})});
routes.use('/user',user);
routes.use('/chat',isAuthenticated,chat);

export default routes;