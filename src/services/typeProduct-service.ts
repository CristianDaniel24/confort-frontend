import { getApiUrl } from "@/lib/utils";
import { ITypeProduct } from "@/types/typeProduct-interface";

class TypeProductService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/typeProduct`;
  }

  async getAll(): Promise<ITypeProduct[]> {
    const res = await fetch(this.url);
    const typeProduct = await res.json();
    return typeProduct;
  }

  async findById(id: number): Promise<ITypeProduct | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const typeProduct = await res.json();
    return typeProduct;
  }

  async create(typeProduct: ITypeProduct): Promise<ITypeProduct> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(typeProduct),
    });
    const restTypeProduct = await res.json();
    return restTypeProduct;
  }

  async update(id: number, typeProduct: ITypeProduct): Promise<ITypeProduct> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(typeProduct),
    });
    const resTypeProduct = res.json();
    return resTypeProduct;
  }
}

export const typeProductService = new TypeProductService();
