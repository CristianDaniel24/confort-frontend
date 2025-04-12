import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";
import { IRol } from "@/types/rol-interface";

class RolService {
  private readonly url: string;

  constructor() {
    this.url = `${utils.baseUrl}/rol`;
  }

  async getAll(): Promise<IRol[]> {
    const res = await iAxios.get(this.url);
    return res.data;
  }

  async findById(id: number): Promise<IRol | undefined> {
    const res = await iAxios.get(`${this.url}/${id}`);
    return res.data;
  }

  async create(rol: IRol): Promise<IRol> {
    const res = await iAxios.post(this.url, rol);
    return res.data;
  }

  async update(id: number, rol: IRol): Promise<IRol> {
    const res = await iAxios.put(`${this.url}/${id}`, rol);
    return res.data;
  }

  async delete(id: number): Promise<boolean> {
    try {
      await iAxios.delete(`${this.url}/${id}`);
      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  }
}

export const rolService = new RolService();
