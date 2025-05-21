import { ITypeProcedure } from "./typeProcedure-interface";

export interface IProcedure {
  id: number;
  name: string;
  price: number;
  description: string;
  date: Date;
  status: string;
  imgUrl?: string;
  typeProcedure: ITypeProcedure;
}
