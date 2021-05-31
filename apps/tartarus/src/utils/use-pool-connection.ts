// packages
import pool from "../database";
// types
import type { QueryResult } from "pg";

/**
 * @description Function used to open a connection to the DB, make the required query and close the connection.
 * @param sqlQuery SQL string used to make a query to the database
 * @param params An array of values
 */
export default async function usePoolConnection<T>(
  sqlQuery: string,
  params?: unknown[]
): Promise<T[]> {
  const db = await pool.connect();

  const result: QueryResult<T> = await db.query(sqlQuery, params);
  db.release();

  return result.rows;
}
