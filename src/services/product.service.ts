import { IProduct } from "@/types/product-interface";
import { GenericService } from "./generic.service";

class ProductService extends GenericService<IProduct> {
  constructor() {
    super({ endpoint: "product" });
  }
}

export const productService = new ProductService();
