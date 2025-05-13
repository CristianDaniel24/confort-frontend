import { IShoppingCart } from "@/types/shoppingCart-interface";
import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";

class ShoppingCartService extends GenericService<IShoppingCart> {
  constructor() {
    super({ endpoint: "shoppingCart" });
  }
}

export const shoppingCartService = new ShoppingCartService();
