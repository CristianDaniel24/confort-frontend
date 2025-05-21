import { ICar } from "./car-interface";
import { IProcedure } from "./procedure-interface";

export interface IService {
  id?: number;
  status?: string;
  description?: string;
  dueTo?: number;
  completedAt?: number;
  car: ICar;
  procedure: IProcedure;
}
