// packages
import { store } from "../../models/user";
import { deleteProperty } from "../../utils/transformers";
// types
import type { Request, Response } from "express";
import type { User, UserDetailsRequest } from "../../types";

class UsersController {
  /**
   * @description It gets users from storage and sends back a list of all users data
   *
   * @param _req Express Request
   * @param res Express Response
   */
  public async showAll(_req: Request, res: Response): Promise<void> {
    const users: User[] = await store.getAllUsers();

    res.status(200).json(users);
  }

  /**
   * @description It gets a specific user from storage and sends back it's data
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async show(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;

    const user: User = await store.getUserById(userId);

    deleteProperty<Partial<User>>(user, ["password"]);

    res.status(200).json(user);
  }

  /**
   * @description Updates a specific product from storage and sends back the updated product
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async update(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;
    const newUserValues: UserDetailsRequest = req.body;

    const result: User = await store.updateUser(userId, newUserValues);

    deleteProperty<Partial<User>>(result, ["password"]);

    res.status(200).json(result);
  }
}

export default new UsersController();
