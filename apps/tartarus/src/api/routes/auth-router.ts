// packages
import { Router } from "express";
// internals
import authController from "../controllers/auth-controller";
import useAsync from "../middleware/use-async";

const users = Router();

users.post("/signup", useAsync(authController.create));
users.post("/signin", useAsync(authController.authenticate));
users.post("/create-admin-account", useAsync(authController.createAdmin));

export default users;
