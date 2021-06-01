import { generateUpdateSqlQuery, SqlQueryParams, SqlQueryReturn } from "../../src/utils/generators";

describe("Generator Utils", function () {
  describe("generateUpdateSqlQuery()", function () {
    const rawDataMock = { key_one: "valueOne", key_two: "valueTwo", updated_at: "epochTime" };

    it("should be defined", function () {
      expect(generateUpdateSqlQuery).toBeDefined();
    });

    it("should return an object with a sql query string and required params", function () {
      const result: SqlQueryReturn = generateUpdateSqlQuery({
        tablename: "table",
        condition: "condition",
        rawData: rawDataMock,
      });

      const sqlExpectedResult =
        "UPDATE table SET key_one = ($1), key_two = ($2), updated_at = ($3) WHERE id = ($4) RETURNING *;";
      const paramsExpectedResult = ["valueOne", "valueTwo", "epochTime", "condition"];

      expect(result.sql).toBe(sqlExpectedResult);
      expect(result.params).toEqual(paramsExpectedResult);
    });

    it("should throw an error if 'tablename' arg was not provided", async function () {
      const args = {
        condition: "condition",
        rawData: rawDataMock,
      } as unknown as SqlQueryParams;

      const errorMessage = "'tablename' argument must be provided!";

      expect(() => generateUpdateSqlQuery(args)).toThrowError(errorMessage);
    });

    it("should throw an error if 'condition' arg was not provided", function () {
      const args = {
        tablename: "table",
        rawData: rawDataMock,
      } as unknown as SqlQueryParams;

      const errorMessage = "'condition' argument must be provided!";

      expect(() => generateUpdateSqlQuery(args)).toThrowError(errorMessage);
    });

    it("should throw an error if 'rawData' arg was not provided", function () {
      const args = {
        tablename: "table",
        condition: "condition",
      } as unknown as SqlQueryParams;

      const errorMessage = "'rawData' argument must be provided!";

      expect(() => generateUpdateSqlQuery(args)).toThrowError(errorMessage);
    });
  });
});
