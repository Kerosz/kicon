// packages
import { Router } from "express";
// internals
import usersController from "../controllers/users-controller";
import useAsync from "../middleware/use-async";
import { isAdmin, isOwner } from "../middleware/authorization";

const users = Router();

users.get("/", isAdmin, useAsync(usersController.showAll));
users.get("/:id", useAsync(usersController.show));
users.patch("/:id", isOwner, useAsync(usersController.update));

export default users;
