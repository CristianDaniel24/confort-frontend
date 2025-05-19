import { GenericService } from "./generic.service";
import { IClient } from "@/types/client-interface";

class ClientService extends GenericService<IClient> {
  constructor() {
    super({ endpoint: "client" });
  }
}
export const clientService = new ClientService();
