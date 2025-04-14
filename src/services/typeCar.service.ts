import { ITypeCar } from "@/types/typeCar-interface";
import { GenericService } from "./generic.service";

class TypeCarService extends GenericService<ITypeCar> {
  constructor() {
    super({ endpoint: "types-car" });
  }
}

export const typeCarService = new TypeCarService();
