// packages
import dotenv from "dotenv";
// internals
import development from "./development";
import test from "./test";
import production from "./production";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (process.env.NODE_ENV === "production" && envFound.error) {
  throw new Error("🤡 Couldn't find .env file️");
}

export default process.env.NODE_ENV === "development"
  ? development
  : process.env.NODE_ENV === "test"
  ? test
  : production;
