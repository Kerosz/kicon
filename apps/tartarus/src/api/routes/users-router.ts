// packages
import { Router } from "express";
// internals
import usersController from "../controllers/users-controller";

const users = Router();

users.get("/", usersController.hello);

export default users;
