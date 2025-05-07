import { IRol } from "@/types/rol-interface";
import { GenericService } from "./generic.service";

class RolService extends GenericService<IRol> {
  constructor() {
    super({ endpoint: "rol" });
  }
}
export const rolService = new RolService();
