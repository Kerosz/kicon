export interface SqlQueryParams {
  tablename: string;
  condition: string;
  rawData: Record<string, unknown>;
}

export interface SqlQueryReturn {
  sql: string;
  params: unknown[];
}

/**
 * @description Generates the SQL query and params using UPDATE clause
 * @param args SQL query parameters
 * @returns An object containing the SQL query and the params array
 */
export function generateUpdateSqlQuery(args: SqlQueryParams): SqlQueryReturn {
  if (!args.tablename) throw new Error("'tablename' argument must be provided!");
  if (!args.condition) throw new Error("'condition' argument must be provided!");
  if (!args.rawData) throw new Error("'rawData' argument must be provided!");

  const { tablename, condition, rawData } = args;

  let sql: string = `UPDATE ${tablename} SET`;
  let params: unknown[] = [];

  Object.entries(rawData).forEach(([key, value], index, self) => {
    params.push(value);

    if (self.length === index + 1) {
      sql += ` ${key} = ($${index + 1})`;
    } else {
      sql += ` ${key} = ($${index + 1}),`;
    }
  });

  /**
   * We are passing the updated_at value when doing testing
   * so we have to check if already exists in the data
   * otherwise add to the query
   */
  if (!rawData.updated_at) {
    params.push(Date.now());
    sql += `, updated_at = ($${params.length})`;
  }

  params.push(condition);
  sql += ` WHERE id = ($${params.length}) RETURNING *;`;

  return { sql, params };
}
