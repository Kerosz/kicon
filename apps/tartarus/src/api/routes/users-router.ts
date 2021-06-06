// packages
import { Router } from "express";
// internals
import usersController from "../controllers/users-controller";
import ordersController from "../controllers/orders-controller";
import useAsync from "../middleware/use-async";
import { isAdmin, isOwner } from "../middleware/authorization";

const users = Router();

users.get("/", isAdmin, useAsync(usersController.showAll));
users.get("/:id", useAsync(usersController.show));
users.get("/:id/addresses", isOwner, useAsync(usersController.showAllAddresses));
users.get("/:id/address/:addressId", isOwner, useAsync(usersController.showAddress));
users.get("/:id/orders", isOwner, useAsync(ordersController.showAllByUser));
users.patch("/:id", isOwner, useAsync(usersController.update));
users.post("/:id/address", isOwner, useAsync(usersController.createAddress));

export default users;
