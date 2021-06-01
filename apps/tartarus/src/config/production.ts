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

  /** Postgres Configuration */
  postgres: {
    host: process.env.POSTGRES_HOST,
    db: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
} as const;
