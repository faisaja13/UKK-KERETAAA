import express from "express";
import { addUser } from "../controllers/User.js"

const userRoutes = express.Router();

userRoutes.post('/user/add', addUser );

export default userRoutes;