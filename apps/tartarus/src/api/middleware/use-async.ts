// types
import type { NextFunction, Request, Response } from "express";

export type FnSignature = {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
};

/**
 * @description Middleware used to catch async errors and call global error handler
 * @param fn Controller async function
 */
const useAsync =
  (fn: FnSignature) =>
  (req: Request, res: Response, next: NextFunction): void => {
    void Promise.resolve(fn(req, res, next).catch(next));
  };

export default useAsync;
