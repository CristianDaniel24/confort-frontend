import { ITypeProcedure } from "@/types/typeProcedure-interface";
import { GenericService } from "./generic.service";

class TypeProcedureService extends GenericService<ITypeProcedure> {
  constructor() {
    super({ endpoint: "type-procedure" });
  }
}

export const typeProcedureService = new TypeProcedureService();
