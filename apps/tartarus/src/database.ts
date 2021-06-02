// packages
import { Pool } from "pg";
// internals
import config from "./config/index";

const pool = new Pool({
  host: config.postgres.host,
  database: config.postgres.db,
  user: config.postgres.user,
  password: config.postgres.password,
});

export default pool;
