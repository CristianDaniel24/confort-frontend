import { IPerson } from "./person-interface";
import { IRol } from "./rol-interface";

export interface IEmployee {
  id: number;
  person: IPerson;
  rol: IRol;
}
