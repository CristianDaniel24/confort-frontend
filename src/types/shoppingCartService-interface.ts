import { IService } from "./service-interface";
import { IShoppingCart } from "./shoppingCart-interface";

export interface IShoppingCartService {
  id?: number;
  shoppingCart: IShoppingCart;
  service: IService;
  amount: number;
}
