import { IBill } from "@/types/bill-interface";
import { GenericService } from "./generic.service";

class BillService extends GenericService<IBill> {
  constructor() {
    super({ endpoint: "bill" });
  }
}
export const billService = new BillService();
