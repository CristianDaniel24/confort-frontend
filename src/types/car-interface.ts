import { IClient } from "./client-interface";
import { ITypeCar } from "./typeCar-interface";

export interface ICar {
  id?: number;
  color: string;
  plate: string;
  typeCar: ITypeCar;
  client?: IClient;
}
