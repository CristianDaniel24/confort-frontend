import { IBill } from "./bill-interface";
import { IClient } from "./client-interface";
import { IProduct } from "./product-interface";
import { IService } from "./service-interface";

export interface IRecienActivityDTO {
  newService: IService;
  lowStock: IProduct;
  billPaid: IBill;
  newClient: IClient;
}
