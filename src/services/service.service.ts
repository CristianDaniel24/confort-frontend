import { getApiUrl } from "@/lib/utils";
import { IService } from "@/types/service-interface";

class ServiceService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/service`;
  }

  async getAll(): Promise<IService[]> {
    const res = await fetch(this.url);
    const service = await res.json();
    return service;
  }

  async findById(id: number): Promise<IService | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const service = await res.json();
    return service;
  }

  async update(id: number, service: IService): Promise<IService> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(service),
    });
    const resService = res.json();
    return resService;
  }

  async delete(id: number): Promise<boolean> {
    try {
      await fetch(`${this.url}/${id}`, { method: "DELETE" });
      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  }
}

export const serviceService = new ServiceService();
