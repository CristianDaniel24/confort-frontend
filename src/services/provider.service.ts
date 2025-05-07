import { IProvider } from "@/types/provider-interface";
import { GenericService } from "./generic.service";

class ProviderService extends GenericService<IProvider> {
  constructor() {
    super({ endpoint: "provider" });
  }
}

export const providerService = new ProviderService();
