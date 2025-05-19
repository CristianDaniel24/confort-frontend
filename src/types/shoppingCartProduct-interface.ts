import { IProduct } from "./product-interface";
import { IShoppingCart } from "./shoppingCart-interface";

export interface IShoppingCartProduct {
  shoppingCart: IShoppingCart;
  product: IProduct;
  amount: number;
}
