import { getApiUrl } from "@/lib/utils";
import { ITypeCar } from "@/types/typeCar-interface";

class TypeCarService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/types-car`;
  }

  async getAll(): Promise<ITypeCar[]> {
    const res = await fetch(this.url);
    const typeCar = await res.json();
    return typeCar;
  }

  async findById(id: number): Promise<ITypeCar | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const typeCar = await res.json();
    return typeCar;
  }

  async create(typeCar: ITypeCar): Promise<ITypeCar> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(typeCar),
    });
    const restTypeCar = await res.json();
    return restTypeCar;
  }

  async update(id: number, typeCar: ITypeCar): Promise<ITypeCar> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(typeCar),
    });
    const resTypeCar = res.json();
    return resTypeCar;
  }
}

export const typeCarService = new TypeCarService();
