import { IProcedure } from "@/types/procedure-interface";
import { GenericService } from "./generic.service";

class ProcedureService extends GenericService<IProcedure> {
  constructor() {
    super({ endpoint: "procedure" });
  }
}

export const procedureService = new ProcedureService();
