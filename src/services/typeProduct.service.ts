import { ITypeProduct } from "@/types/typeProduct-interface";
import { GenericService } from "./generic.service";

class TypeProductService extends GenericService<ITypeProduct> {
  constructor() {
    super({ endpoint: "type-product" });
  }
}

export const typeProductService = new TypeProductService();
