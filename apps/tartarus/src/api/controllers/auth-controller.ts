// internals
import AuthService from "../../services/auth";
// types
import type { Request, Response } from "express";
import type { AuthReturn } from "../../services/auth";
import type { AdminDataRequest, CustomerDataRequest, UserAuthRequest } from "../../types";

// TODO: Inject AuthService into the Auth controller so that you do not have to call it every time.
class AuthController {
  /**
   * @description It process the newly created user, stores it in storage and sends back the user token
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async create(req: Request, res: Response): Promise<void> {
    const userData: CustomerDataRequest = req.body;
    const authInstance = new AuthService();

    const { user, token }: AuthReturn = await authInstance.signUp(userData);

    res.status(201).json({ user, token });
  }

  /**
   * @description It processes the auth request and sends back a token containing user data
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async authenticate(req: Request, res: Response): Promise<void> {
    const userData: UserAuthRequest = req.body;
    const authInstance = new AuthService();

    const { user, token }: AuthReturn = await authInstance.signIn(userData);

    res.status(200).json({ user, token });
  }

  /**
   * @description It process the newly created admin account, stores it in storage and sends back the user token
   *
   * @param req Express Request
   * @param res Express Response
   */
  public async createAdmin(req: Request, res: Response): Promise<void> {
    const adminData: AdminDataRequest = req.body;
    const authInstance = new AuthService();

    const { user, token }: AuthReturn = await authInstance.signUpAsAdmin(adminData);

    res.status(201).json({ user, token });
  }
}

export default new AuthController();
