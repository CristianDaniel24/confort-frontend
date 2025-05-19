import { IShoppingCart } from "@/types/shoppingCart-interface";
import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";

class ShoppingCartService extends GenericService<IShoppingCart> {
  constructor() {
    super({ endpoint: "shoppingCart" });
  }

  async getShoppingCartByClientId(clientId: number) {
    const response = await iAxios.get(
      `${utils.baseUrl}/shoppingCart/client/${clientId}`
    );
    return response.data;
  }
}

export const shoppingCartService = new ShoppingCartService();
