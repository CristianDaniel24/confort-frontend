import { IService } from "@/types/service-interface";
import { GenericService } from "./generic.service";

class ServiceService extends GenericService<IService> {
  constructor() {
    super({ endpoint: "service" });
  }
}

export const serviceService = new ServiceService();
