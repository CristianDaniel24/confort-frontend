import { getApiUrl } from "@/lib/utils";
import { IProvider } from "@/types/provider-interface";

class ProviderService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/provider`;
  }

  async getAll(): Promise<IProvider[]> {
    const res = await fetch(this.url);
    const rol = await res.json();
    return rol;
  }

  async findById(id: number): Promise<IProvider | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const rol = await res.json();
    return rol;
  }

  async create(provider: IProvider): Promise<IProvider> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(provider),
    });
    const restProvider = await res.json();
    return restProvider;
  }

  async update(id: number, provider: IProvider): Promise<IProvider> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(provider),
    });
    const resRol = res.json();
    return resRol;
  }
}

export const providerService = new ProviderService();
