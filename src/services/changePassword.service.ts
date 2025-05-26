import { GenericService } from "./generic.service";
import { IChangePassword } from "@/types/change-password-interface";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";

class ChangePasswordService extends GenericService<IChangePassword> {
  constructor() {
    super({ endpoint: "auth" });
  }

  async postChangePassword(changePassword: IChangePassword) {
    return iAxios.post(`${utils.baseUrl}/auth/newPassword`, changePassword);
  }
}
export const changePasswordService = new ChangePasswordService();
