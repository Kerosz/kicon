// types
import type { Request, Response } from "express";

class UsersController {
  hello(_req: Request, res: Response): void {
    res.send("hello");
  }
}

export default new UsersController();
