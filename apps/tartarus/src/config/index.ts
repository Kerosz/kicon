// packages
import dotenv from "dotenv";
// types
import type { DotenvConfigOutput } from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

let envFound: DotenvConfigOutput;

/**
 * Loads the env configuration
 * It used the environment name for the .env file if it's not in production
 */
if (process.env.NODE_ENV !== "production") {
  envFound = dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  });
} else {
  envFound = dotenv.config({
    path: ".env.production",
  });
}

if (process.env.NODE_ENV === "production" && envFound.error) {
  throw new Error("🤡 Couldn't find .env.development file️");
}

export default {
  /** Application host */
  host: process.env.HOSTNAME,

  /** Application running port */
  port: parseInt(process.env.PORT as string, 10),

  /** Current application environment */
  env: process.env.NODE_ENV,

  /** API configs */
  api: {
    prefix: process.env.API_VERSION as string,
  },

  /** Argon Configuration */
  argon: {
    secret: process.env.ARGON_SECRET as string,
  },

  /** JWT Configuration */
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },

  /** Postgres Configuration */
  postgres: {
    host: process.env.POSTGRES_HOST,
    db: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
} as const;
