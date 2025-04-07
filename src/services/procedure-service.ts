import { getApiUrl } from "@/lib/utils";
import { IProcedure } from "@/types/procedure-interface";

class ProcedureService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/procedure`;
  }

  async getAll(): Promise<IProcedure[]> {
    const res = await fetch(this.url);
    const procedure = await res.json();
    return procedure;
  }

  async findById(id: number): Promise<IProcedure | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const procedure = await res.json();
    return procedure;
  }

  async create(procedure: IProcedure): Promise<IProcedure> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(procedure),
    });
    const restProcedure = await res.json();
    return restProcedure;
  }

  async update(id: number, procedure: IProcedure): Promise<IProcedure> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(procedure),
    });
    const resProcedure = res.json();
    return resProcedure;
  }
}

export const procedureService = new ProcedureService();
