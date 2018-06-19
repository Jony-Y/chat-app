import express from 'express';
import {getAll, post, login, signUp} from "./controller";
import {isAuthenticated} from "../middleware/auth";
let routes = express.Router();

routes.post('/sign-up',signUp);
routes.post('/login',login);
routes.get('',isAuthenticated,getAll);

export default routes;