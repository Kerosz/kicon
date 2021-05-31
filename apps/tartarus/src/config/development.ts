export default {
  /** Application host */
  host: "http://localhost",

  /** Application running port */
  port: 1234,

  /** Current application environment */
  env: "development",

  /** API configs */
  api: {
    prefix: "/api/v1",
  },

  /** Postgres Configuration */
  postgres: {
    host: "127.0.0.1",
    db: "store_dev",
    user: "postgres",
    password: "password123",
  },
} as const;
