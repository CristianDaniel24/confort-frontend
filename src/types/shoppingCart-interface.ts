import { IClient } from "./client-interface";
import { IShoppingCartProduct } from "./shoppingCartProduct-interface";
import { IShoppingCartService } from "./shoppingCartService-interface";

export interface IShoppingCart {
  id: number;
  status: string;
  shoppingCartProduct: IShoppingCartProduct[];
  shoppingCartServices: IShoppingCartService[];
  client: IClient;
}
