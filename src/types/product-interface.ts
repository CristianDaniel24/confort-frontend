import { IProvider } from "./provider-interface";
import { ITypeProduct } from "./typeProduct-interface";

export interface IProduct {
  id: number;
  name: string;
  cost: number;
  code: string;
  stock: number;
  typeProduct: ITypeProduct;
  provider: IProvider;
}
