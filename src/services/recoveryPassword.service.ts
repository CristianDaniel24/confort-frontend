import { IRecoveryPassword } from "@/types/recoveryPassword-response-interface";
import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";

class RecoveryPasswordService extends GenericService<IRecoveryPassword> {
  constructor() {
    super({ endpoint: "auth" });
  }

  async postRecoveryPassword(email: IRecoveryPassword) {
    return iAxios.post(`${utils.baseUrl}/auth/email`, email);
  }
}

export const recoveryPasswordService = new RecoveryPasswordService();
