import { IBill } from "@/types/bill-interface";
import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";

class BillService extends GenericService<IBill> {
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
export const billService = new BillService();
