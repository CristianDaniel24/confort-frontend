import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";
import { IOrders } from "@/types/orders-interface";

class OrderService extends GenericService<IOrders> {
  constructor() {
    super({ endpoint: "bill" });
  }

  async getBillByClientId(clientId: number) {
    const response = await iAxios.get(
      `${utils.baseUrl}/bill/client/${clientId}`
    );
    return response.data;
  }

  async confirmOrder(orderId: number) {
    const response = await iAxios.get(
      `${utils.baseUrl}/bill/confirmOrder/${orderId}`
    );
    return response.data;
  }

  async cancelOrder(orderId: number) {
    const response = await iAxios.get(
      `${utils.baseUrl}/bill/cancelOrder/${orderId}`
    );
    return response.data;
  }
}
export const orderService = new OrderService();
