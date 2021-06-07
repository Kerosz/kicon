// internals
import { store as orderStore } from "../models/order";
import { store as addressStore } from "../models/address";
// types
import type {
  Address,
  Order,
  OrderProducRequest,
  OrderProduct,
  OrderRequest,
  ShippingDetails,
} from "../types";

class OrderService {
  /**
   * @descriptionMethod used to process the shipping of an order and issue it's shipping number and data
   *
   * @param shippingAddressId Shipping user address
   * @private
   */
  private static async processShipping(shippingAddressId: string): Promise<ShippingDetails> {
    const address: Address = await addressStore.getAddressById(shippingAddressId);

    if (!address) {
      throw new Error("Shipping address is invalid!");
    }

    // call an external shipping service which will send back these values
    const shippingNo: string = address.address1;
    const deliveryDate: string = Date.now().toString();

    return {
      shipping_no: shippingNo,
      delivery_date: deliveryDate,
    };
  }

  /**
   * @description Method used to add a product to an order
   *
   * @param orderId Id of the order to be added to
   * @param p The product data object to be added to order
   */
  public async addProduct(orderId: string, p: OrderProducRequest): Promise<OrderProduct> {
    return await orderStore.saveProductToOrder(orderId, p);
  }

  /**
   * @description Method used to process the shipping and mailing of an order and save it to storage
   *
   * @param orderData Order data object to be saved
   */
  public async processOrder(orderData: OrderRequest): Promise<Order> {
    // TODO: Implement a mailing service which will generate these values
    const invoiceNo = "46355v46bg53vc34653b";
    const invoiceDate: string = Date.now().toString();

    const shippingDetails: ShippingDetails = await OrderService.processShipping(
      orderData.shipping_address_id
    );

    return await orderStore.saveOrder({
      ...orderData,
      ...shippingDetails,
      invoice_date: invoiceDate,
      invoice_no: invoiceNo,
      status: "pending",
    });
  }
}

export default OrderService;
