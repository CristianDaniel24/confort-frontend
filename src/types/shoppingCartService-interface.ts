import { IService } from "./service-interface";
import { IShoppingCart } from "./shoppingCart-interface";

export interface IShoppingCartService {
  shoppingCart: IShoppingCart;
  service: IService;
  amount: number;
}
