import { IRol } from "@/types/rol-interface";
import { GenericService } from "./generic.service";

export const rolService = new GenericService<IRol>("/rol");
