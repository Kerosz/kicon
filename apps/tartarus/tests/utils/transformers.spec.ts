// internals
import { deleteProperty } from "../../src/utils/transformers";

describe("Transformers Utils", function () {
  const mockObject = { key_one: "valueOne", key_two: "valueTwo", key_three: "valueThree" };

  describe("deleteProperty()", function () {
    it("should remove a property from an object", function () {
      const expectedResult = { key_one: "valueOne" };

      deleteProperty(mockObject, ["key_two", "key_three"]);

      expect(mockObject as unknown).toEqual(expectedResult);
    });

    it("should throw an error if no object is passed in", function () {
      const errorMessage = "Must pass in an object to be transformed!";

      // @ts-ignore
      expect(() => deleteProperty()).toThrowError(errorMessage);
    });

    it("should throw an error if no properties are passed in", function () {
      const errorMessage = "Properties array must contain at least one property!";

      // @ts-ignore
      expect(() => deleteProperty(mockObject)).toThrowError(errorMessage);
    });

    it("should throw an error if the properties array is of length 0", function () {
      const errorMessage = "Properties array must contain at least one property!";

      // @ts-ignore
      expect(() => deleteProperty(mockObject, [])).toThrowError(errorMessage);
    });
  });
});
