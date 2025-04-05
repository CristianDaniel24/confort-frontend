import { getApiUrl } from "@/lib/utils";
import { IRol } from "@/types/rol-interface";

class RolService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/rol`;
  }

  async getAll(): Promise<IRol[]> {
    const res = await fetch(this.url);
    const rol = await res.json();
    return rol;
  }

  async findById(id: number): Promise<IRol | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const rol = await res.json();
    return rol;
  }

  async create(rol: IRol): Promise<IRol> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(rol),
    });
    const restRol = await res.json();
    return restRol;
  }

  async update(id: number, rol: IRol): Promise<IRol> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(rol),
    });
    const resRol = res.json();
    return resRol;
  }
}

export const rolService = new RolService();
