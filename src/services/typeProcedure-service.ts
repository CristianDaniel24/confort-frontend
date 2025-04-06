import { getApiUrl } from "@/lib/utils";
import { ITypeProcedure } from "@/types/typeProcedure-interface";

class TypeProcedureService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/type-procedure`;
  }

  async getAll(): Promise<ITypeProcedure[]> {
    const res = await fetch(this.url);
    const typeProcedure = await res.json();
    return typeProcedure;
  }

  async findById(id: number): Promise<ITypeProcedure | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const typeProcedure = await res.json();
    return typeProcedure;
  }

  async create(typeProcedure: ITypeProcedure): Promise<ITypeProcedure> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(typeProcedure),
    });
    const restTypeProcedure = await res.json();
    return restTypeProcedure;
  }

  async update(
    id: number,
    typeProcedure: ITypeProcedure
  ): Promise<ITypeProcedure> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(typeProcedure),
    });
    const resTypeProcedure = res.json();
    return resTypeProcedure;
  }
}

export const typeProcedureService = new TypeProcedureService();
