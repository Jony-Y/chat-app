import express from 'express';
import {getAll, post, get} from "./controller";
let routes = express.Router();

routes.post('',post);
routes.get('/:id',get);
routes.get('',getAll);

export default routes;