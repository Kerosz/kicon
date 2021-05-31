import { generateUpdateSqlQuery, SqlQueryReturn } from "../../src/utils/generators";

describe("Generator Utils", function () {
  describe("generateUpdateSqlQuery()", function () {
    it("should be defined", function () {
      expect(generateUpdateSqlQuery).toBeDefined();
    });

    it("should return an object with a sql query string and required params", function () {
      const result: SqlQueryReturn = generateUpdateSqlQuery({
        tablename: "table",
        condition: "condition",
        rawData: { key_one: "valueOne", key_two: "valueTwo", updated_at: "epochTime" },
      });

      const sqlExpectedResult =
        "UPDATE table SET key_one = ($1), key_two = ($2), updated_at = ($3) WHERE id = ($4) RETURNING *;";
      const paramsExpectedResult = ["valueOne", "valueTwo", "epochTime", "condition"];

      expect(result.sql).toBe(sqlExpectedResult);
      expect(result.params).toEqual(paramsExpectedResult);
    });
  });
});
