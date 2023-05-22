import express from "express";

import { addUser } from "../controllers/UserController.js";



 
const UserRouter = express.Router();

UserRouter.post('/users/add',addUser)



export default UserRouter;