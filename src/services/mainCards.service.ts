import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";
import { IBill } from "@/types/bill-interface";

class MainCardsService extends GenericService<IBill> {
  constructor() {
    super({ endpoint: "dashboard" });
  }

  async mainCards() {
    const response = await iAxios.get(`${utils.baseUrl}/dashboard/mainCards`);
    return response.data;
  }
}

export const mainCardsService = new MainCardsService();
