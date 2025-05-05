import { IPerson } from "@/types/person-interface";
import { cookieUtils } from "./cookies.utils";

class SessionUtils {
  getPersonFromSession(): IPerson {
    const cookie = cookieUtils.getCookie("session");

    if (!cookie) return {} as IPerson;

    try {
      const parsed = JSON.parse(cookie);
      return parsed.person as IPerson;
    } catch (error) {
      console.error("Error al parsear la cookie:", error);
      return {} as IPerson;
    }
  }
}

export const sessionUtils = new SessionUtils();
