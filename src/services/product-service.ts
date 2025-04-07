import { getApiUrl } from "@/lib/utils";
import { IProduct } from "@/types/product-interface";

class ProductService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/product`;
  }

  async getAll(): Promise<IProduct[]> {
    const res = await fetch(this.url);
    const product = await res.json();
    return product;
  }

  async findById(id: number): Promise<IProduct | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const product = await res.json();
    return product;
  }

  async create(product: IProduct): Promise<IProduct> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(product),
    });
    const restProduct = await res.json();
    return restProduct;
  }

  async update(id: number, product: IProduct): Promise<IProduct> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(product),
    });
    const resProduct = res.json();
    return resProduct;
  }
}

export const productService = new ProductService();
