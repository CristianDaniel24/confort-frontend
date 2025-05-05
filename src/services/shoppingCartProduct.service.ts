import { IShoppingCartProduct } from "@/types/shoppingCartProduct-interface";
import { GenericService } from "./generic.service";

class ShoppingCartProduct extends GenericService<IShoppingCartProduct> {
  constructor() {
    super({ endpoint: "shoppingCart-product" });
  }
}

export const shoppingCartProductService = new ShoppingCartProduct();
