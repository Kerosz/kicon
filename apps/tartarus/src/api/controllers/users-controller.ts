// packages
import { store as userStore } from "../../models/user";
import { store as addressStore } from "../../models/address";
import { deleteProperty } from "../../utils/transformers";
// types
import type { Request, Response } from "express";
import type { Address, AddressRequest, User, UserDetailsRequest } from "../../types";

class UsersController {
  /**
   * @description It gets users from storage and sends back a list of all users data
   *
   * @param _req Express Request
   * @param res Express Response
   */
  public async showAll(_req: Request, res: Response): Promise<void> {
    const users: User[] = await userStore.getAllUsers();

    res.status(200).json(users);
  }

  /**
   * @description It gets user addresses from storage and sends back a list of all it's addresses data
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async showAddress(req: Request, res: Response): Promise<void> {
    const addressId: string = req.params.addressId;
    const userId: string = req.params.id;

    const address: Address = await addressStore.getUserAddressById(addressId, userId);

    if (!address) {
      throw new Error("No address found!");
    }

    res.status(200).json(address);
  }

  /**
   * @description It gets user addresses from storage and sends back a list of all it's addresses data
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async showAllAddresses(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;

    const addresses: Address[] = await addressStore.getAddressByUserId(userId);

    res.status(200).json(addresses);
  }

  /**
   * @description It gets a specific user from storage and sends back it's data
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async show(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;

    const user: User = await userStore.getUserById(userId);

    if (!user) {
      throw new Error("No user found!");
    }

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

    const result: User = await userStore.updateUser(userId, newUserValues);

    if (!result) {
      throw new Error("No user found to update!");
    }

    deleteProperty<Partial<User>>(result, ["password"]);

    res.status(200).json(result);
  }

  /**
   * @description It stores the newly created address in storage and sends back the address data
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async createAddress(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;
    const newUserValues: AddressRequest = req.body;

    const address: Address = await addressStore.saveAddress(userId, newUserValues);

    res.status(200).json(address);
  }
}

export default new UsersController();
