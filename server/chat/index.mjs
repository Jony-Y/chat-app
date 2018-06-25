import express from 'express';
import {getAll, post, get, remove} from "./controller";
import {getAll as getChatMessages}  from '../chatMessage/controller';
let routes = express.Router();

routes.post('',post);
routes.get('/:id',get);
routes.get('', getAll);
routes.delete('/:id', remove);

//chat messages
routes.get('/:id/message',getChatMessages);
export default routes;