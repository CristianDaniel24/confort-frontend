import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";

export class GenericService<T> {
  private readonly url: string;

  constructor(endpoint: string) {
    this.url = `${utils.baseUrl}${endpoint}`;
  }

  async getAll(): Promise<T[]> {
    const res = await iAxios.get(this.url);
    return res.data;
  }

  async findById(id: number): Promise<T | undefined> {
    const res = await iAxios.get(`${this.url}/${id}`);
    return res.data;
  }

  async create(data: T): Promise<T> {
    const res = await iAxios.post(this.url, data);
    return res.data;
  }

  async update(id: number, data: T): Promise<T> {
    const res = await iAxios.put(`${this.url}/${id}`, data);
    return res.data;
  }

  async delete(id: number): Promise<boolean> {
    try {
      await iAxios.delete(`${this.url}/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
