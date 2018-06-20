import express from 'express';
import {getAll, post, remove} from "./controller";
let routes = express.Router();

routes.post('',post);
routes.get('',getAll);
routes.delete('/:id',remove);

export default routes;