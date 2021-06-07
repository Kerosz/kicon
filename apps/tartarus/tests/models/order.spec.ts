// internals
import { store as orderStore } from "../../src/models/order";
import { store as userStore } from "../../src/models/user";
import { store as productStore } from "../../src/models/product";
import { store as addressStore } from "../../src/models/address";
// types
import { OrderProduct, Address, Order, ProcessedOrder, Product, User } from "../../src/types";

describe("OrderStore Model", function () {
  let userData: User;
  let productData: Product;
  let addressData: Address;
  let orderData: Order;

  beforeAll(async function () {
    userData = await userStore.saveCustomer({
      email: "orderstore@customtest.com",
      password: "testorder",
      first_name: "Test",
      last_name: "Order",
    });

    productData = await productStore.saveProduct({
      name: "Test Order Product",
      description: "This is a test for the order model",
      price: "2000",
      stock: 2,
    });

    addressData = await addressStore.saveAddress(userData.id, {
      first_name: "Test",
      last_name: "Address",
      address1: "st. test, nr. 1",
      address2: null,
      country: "Test",
      city: "Test",
      state: "TA",
      postal_code: null,
      phone: "14312335235",
    });
  });

  afterAll(async function () {
    await productStore.deleteProduct(productData.id);
  });

  describe("getAllOrders()", function () {
    it("method should be defined", function () {
      expect(orderStore.getAllOrders).toBeDefined();
    });

    it("should get a list of all orders", async function () {
      const result: Order[] = await orderStore.getAllOrders();

      expect(result).toEqual([]);
    });
  });

  describe("saveOrder()", function () {
    it("method should be defined", function () {
      expect(orderStore.saveOrder).toBeDefined();
    });

    it("should create a new order and return it's details", async function () {
      const mockOrder: ProcessedOrder = {
        user_id: userData.id,
        shipping_address_id: addressData.id,
        billing_address_id: addressData.id,
        shipping_no: "3564764325234",
        invoice_no: "6757652152324",
        invoice_date: Date.now().toString(),
        delivery_date: Date.now().toString(),
        status: "pending",
        total: "123",
        total_discount: "0",
        comment: "Mock order for testing!",
      };
      const result: Order = await orderStore.saveOrder(mockOrder);

      // Saving the order to be used in other tests
      orderData = result;

      expect(result.id).toBeTruthy();
      expect(result.user_id).toBe(mockOrder.user_id);
      expect(result.shipping_address_id).toBe(mockOrder.shipping_address_id);
      expect(result.billing_address_id).toBe(mockOrder.billing_address_id);
      expect(result.shipping_no).toBe(mockOrder.shipping_no);
      expect(result.invoice_date).toBe(mockOrder.invoice_date);
      expect(result.invoice_no).toBe(mockOrder.invoice_no);
      expect(result.delivery_date).toBe(mockOrder.delivery_date);
      expect(result.status).toBe(mockOrder.status);
      expect(result.total).toBe(mockOrder.total);
      expect(result.total_discount).toBe(mockOrder.total_discount);
      expect(result.comment).toBe(mockOrder.comment);
      expect(result.created_at).toBeTruthy();
      expect(result.updated_at).toBeTruthy();
    });
  });

  describe("getOrderById()", function () {
    it("method should be defined", function () {
      expect(orderStore.getOrderById).toBeDefined();
    });

    it("should return a pending order queried by Id", async function () {
      const result: Order = await orderStore.getOrderById(orderData.id, "pending");

      expect(result.id).toBe(orderData.id);
      expect(result.user_id).toBe(orderData.user_id);
      expect(result.shipping_address_id).toBe(orderData.shipping_address_id);
      expect(result.billing_address_id).toBe(orderData.billing_address_id);
      expect(result.shipping_no).toBe(orderData.shipping_no);
      expect(result.invoice_date).toBe(orderData.invoice_date);
      expect(result.invoice_no).toBe(orderData.invoice_no);
      expect(result.delivery_date).toBe(orderData.delivery_date);
      expect(result.status).toBe(orderData.status);
      expect(result.total).toBe(orderData.total);
      expect(result.total_discount).toBe(orderData.total_discount);
      expect(result.comment).toBe(orderData.comment);
      expect(result.created_at).toBe(orderData.created_at);
      expect(result.updated_at).toBe(orderData.updated_at);
    });

    it("should return a completed order queried by Id", async function () {
      const result: Order = await orderStore.getOrderById(orderData.id, "delivered");

      expect(result).toBeUndefined();
    });
  });

  describe("getOrdersByUserId()", function () {
    it("method should be defined", function () {
      expect(orderStore.getOrdersByUserId).toBeDefined();
    });

    it("should get an order by the user Id and return it's data", async function () {
      const result: Order[] = await orderStore.getOrdersByUserId(userData.id);

      expect(result).toContain(orderData);
    });
  });

  describe("saveProductToOrder()", function () {
    it("method should be defined", function () {
      expect(orderStore.saveProductToOrder).toBeDefined();
    });

    it("should save a product to the order and return it's data", async function () {
      const result: OrderProduct = await orderStore.saveProductToOrder(orderData.id, {
        product_id: productData.id,
        quantity: 1,
        price: productData.price,
      });

      expect(result.id).toBeTruthy();
      expect(result.order_id).toBe(orderData.id);
      expect(result.product_id).toBe(productData.id);
      expect(result.price).toBe(productData.price);
      expect(result.quantity).toBe(1);
    });
  });

  describe("getOrderWithProducts()", function () {
    it("method should be defined", function () {
      expect(orderStore.getOrderWithProducts).toBeDefined();
    });

    it("should get a list of complete orders", async function () {
      const result = await orderStore.getOrderWithProducts(orderData.id);

      expect(result).toBeTruthy();
      expect(result[0].product_id).toBe(productData.id);
      expect(result[0].name).toBe(productData.name);
      expect(result[0].description).toBe(productData.description);
      expect(result[0].comment).toBe(orderData.comment);
      expect(result[0].shipping_address_id).toBe(addressData.id);
      expect(result[0].billing_address_id).toBe(addressData.id);
    });
  });

  describe("deleteProductFromOrder()", function () {
    it("method should be defined", function () {
      expect(orderStore.deleteProductFromOrder).toBeDefined();
    });

    it("should delete a product from an existing order", async function () {
      await orderStore.deleteProductFromOrder(orderData.id, productData.id);

      const orderResult = await orderStore.getOrderWithProducts(orderData.id);

      expect(orderResult).toHaveSize(0);
    });
  });
});
