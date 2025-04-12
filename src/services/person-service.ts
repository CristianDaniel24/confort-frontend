import { getApiUrl } from "@/lib/utils";
import { IPerson } from "@/types/person-interface";

class PersonService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/auth/signup/client`;
  }

  async getAll(): Promise<IPerson[]> {
    const res = await fetch(this.url);
    const person = await res.json();
    return person;
  }

  async findById(id: number): Promise<IPerson | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const person = await res.json();
    return person;
  }

  async create(person: IPerson): Promise<IPerson> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(person),
    });
    const restPerson = await res.json();
    return restPerson;
  }

  async update(id: number, person: IPerson): Promise<IPerson> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(person),
    });
    const resPerson = res.json();
    return resPerson;
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

export const personService = new PersonService();
