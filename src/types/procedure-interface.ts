import { ITypeProcedure } from "./typeProcedure-interface";

export interface IProcedure {
  id: number;
  description: string;
  date: number;
  status: string;
  typeProcedure: ITypeProcedure;
}
