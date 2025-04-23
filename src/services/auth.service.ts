import { cookieUtils } from "@/app/utils/cookies.utils";
import iAxios from "@/lib/axios-instance.utils";
import { LoginFormType } from "@/lib/definitions/auth/login-form-definition";
import { IPerson } from "@/types/person-interface";
import { utils } from "@/lib/utils";

class AuthService {
  private readonly url: string;

  constructor() {
    this.url = `${utils.baseUrl}/auth`;
  }

  async logIn(values: LoginFormType) {
    const res = await iAxios.post<IPerson>(`${this.url}/signin`, values);

    this.createSession(res.data);
  }

  logOut() {
    cookieUtils.deleteCookie("session");
  }

  private createSession(person: IPerson) {
    cookieUtils.setCookie({
      name: "session",
      value: JSON.stringify(person),
      days: 1,
    });
  }
}

export const authService = new AuthService();
