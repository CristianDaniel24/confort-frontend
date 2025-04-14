import { IPerson } from "@/types/person-interface";
import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";

class PersonService extends GenericService<IPerson> {
  constructor() {
    super({ endpoint: "client" });
  }

  async create(data: IPerson): Promise<IPerson> {
    const wrappedData = {
      person: {
        ...data,
        dateOfBirth:
          typeof data.dateOfBirth === "string"
            ? data.dateOfBirth
            : new Date(data.dateOfBirth).toISOString(),
      },
    };

    const res = await iAxios.post(this.url, wrappedData);
    return res.data;
  }
}

export const personService = new PersonService();
