import express from 'express';
import {markAsRead, getAll} from "./controller";
let routes = express.Router();
routes.get('',getAll);
routes.post('/mark-as-read',markAsRead);

export default routes;