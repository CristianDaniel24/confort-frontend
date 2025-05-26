import { IProduct } from "./product-interface";
import { IShoppingCart } from "./shoppingCart-interface";

export interface IShoppingCartProduct {
  id?: number;
  shoppingCart: IShoppingCart;
  product: IProduct;
  amount: number;
}
