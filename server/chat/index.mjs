import express from 'express';
import {getAll, post, get, remove} from "./controller";
import {getAll as getChatMessages}  from '../chatMessage/controller';
let routes = express.Router();

routes.post('',post);
routes.get('/:id',get);
routes.get('/:id/message',getChatMessages);
routes.get('',getAll);
routes.delete('/:id', remove);

export default routes;