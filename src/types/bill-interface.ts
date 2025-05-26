import { IShoppingCart } from "./shoppingCart-interface";

export interface IBill {
  id: number;
  date: string;
  costTotal: number;
  shoppingCart: IShoppingCart;
  createdAt: string;
  updatedAt: string;
}
