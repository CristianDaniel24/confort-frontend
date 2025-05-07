import { IPerson } from "./person-interface";
import { IRol } from "./rol-interface";

export interface IAuthResponse {
  person?: IPerson;
  rol?: IRol;
}
