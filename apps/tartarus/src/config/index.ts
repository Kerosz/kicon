// packages
import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("🤡 Couldn't find .env file️");
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
    prefix: "/api/v1",
  },
} as const;
