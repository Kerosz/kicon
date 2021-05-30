// packages
import { Router } from "express";
// internals
import usersRouter from "./routes/users-router";
// types
import type { Response, Request } from "express";

const api = Router();

api.get("/", (_req: Request, res: Response): void => {
  res.send("api");
});

api.use("/users", usersRouter);

export default api;
