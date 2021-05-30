// packages
import express from "express";
import cors from "cors";
// internals
import router from "../api";
import config from "../config";
// types
import type { Response, Request, NextFunction, Application } from "express";

export interface IExpressLoaderParams {
  app: Application;
}

export default function expressLoader({ app }: IExpressLoaderParams): void {
  // Express configuration
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // API routes
  app.use(config.api.prefix, router);

  // 404 forwarding to error handler
  app.all("*", (req: Request, _res: Response, next: NextFunction): void => {
    const error = new Error(`Path: ${req.path} was not found!`);

    next(error);
  });
}
