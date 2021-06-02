// packages
import jwt from "jsonwebtoken";
// internals
import config from "../../config/index";
import { store } from "../../models/user";
// types
import type { Request, Response, NextFunction } from "express";
import type { JwtUserToken, User } from "../../types";

/**
 * @description Function used to verify the authorization header, looking for the token
 *
 * @param authHeader Authorization header of the request
 * @param next Express NextFunction
 * @returns The token or forwards the error to the error handler
 * @internal
 */
function verifyAuthorizationHeader(
  authHeader: string | undefined,
  next: NextFunction
): string | void {
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    return authHeader.split(" ")[1];
  }

  const error = new Error("You authorization header must include 'Bearer' and the token");
  next(error);
}

/**
 * @description Middleware used to authorize normal customer requests
 *
 * @param req Express Request
 * @param _res Express Response
 * @param next Express NextFunction
 */
export async function isAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const authorizationHeader: string | undefined = req.headers.authorization;

  const token = verifyAuthorizationHeader(authorizationHeader, next) as string;
  const decodedToken = jwt.verify(token, config.jwt.secret) as JwtUserToken;

  const userResult: User = await store.getUserById(decodedToken.id);

  if (!userResult) {
    const error = new Error("Token is invalid!");
    next(error);
  }

  next();
}

/**
 * @description Middleware used to authorize seller requests
 *
 * @param req Express Request
 * @param _res Express Response
 * @param next Express NextFunction
 */
export async function isSeller(req: Request, _res: Response, next: NextFunction) {
  const authorizationHeader: string | undefined = req.headers.authorization;

  const token = verifyAuthorizationHeader(authorizationHeader, next) as string;
  const { role } = jwt.verify(token, config.jwt.secret) as JwtUserToken;

  if (role !== "seller" && role !== "admin") {
    const error = new Error("You must be a seller to perform this action!");
    next(error);
  }

  next();
}

/**
 * @description Middleware used to authorize admin requests
 *
 * @param req Express Request
 * @param _res Express Response
 * @param next Express NextFunction
 */
export async function isAdmin(req: Request, _res: Response, next: NextFunction) {
  const authorizationHeader: string | undefined = req.headers.authorization;

  const token = verifyAuthorizationHeader(authorizationHeader, next) as string;
  /**
   * Alternatively we could take the id from the token, make a call to the DB to get the userById
   * Check it's role to be an admin
   */
  const { role } = jwt.verify(token, config.jwt.secret) as JwtUserToken;

  if (role !== "admin") {
    const error = new Error("This action is restricted!");
    next(error);
  }

  next();
}