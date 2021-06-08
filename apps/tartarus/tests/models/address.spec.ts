// internals
import { store } from "../../src/models/address";

describe("AddressStore Model", function () {
  describe("getAddressById()", function () {
    it("method should be defined", function () {
      expect(store.getAddressById).toBeDefined();
    });
  });

  describe("getUserAddressById()", function () {
    it("method should be defined", function () {
      expect(store.getUserAddressById).toBeDefined();
    });
  });

  describe("getAddressByUserId()", function () {
    it("method should be defined", function () {
      expect(store.getAddressByUserId).toBeDefined();
    });
  });
});
