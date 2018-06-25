import express from 'express';
import {markAsRead, getAll} from "./controller";
let routes = express.Router();
routes.get('',getAll);
routes.get('/mark-as-read',markAsRead);

export default routes;