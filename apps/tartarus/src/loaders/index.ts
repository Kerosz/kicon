// packages
import chalk from "chalk";
// internals
import expressLoader from "./express";
// types
import type { Application } from "express";

export interface ILoaderParams {
  expressApp: Application;
}

export default function ({ expressApp }: ILoaderParams): void {
  expressLoader({ app: expressApp });
  console.info("%s Express loaded 🥳", chalk.green("✓"));
}
