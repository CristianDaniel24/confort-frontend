import { IBill } from "./bill-interface";

export interface IPayment {
  id?: number;
  method: string;
  bill?: IBill;
}
