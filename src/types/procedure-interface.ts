import { ITypeProcedure } from "./typeProcedure-interface";

export interface IProcedure {
  id: number;
  description: string;
  date: Date;
  status: string;
  typeProcedure: ITypeProcedure;
}
