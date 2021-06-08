// internals
import OrderService from "../../src/services/order";

describe("ModelService Class", function () {
  let orderInstance: OrderService;

  beforeAll(() => {
    orderInstance = new OrderService();
  });

  afterAll(() => {
    // @ts-ignore
    orderInstance = null;
  });

  describe("addProduct()", function () {
    it("method should be defined", function () {
      expect(orderInstance.addProduct).toBeDefined();
    });
  });

  describe("processOrder()", function () {
    it("method should be defined", function () {
      expect(orderInstance.processOrder).toBeDefined();
    });
  });
});
