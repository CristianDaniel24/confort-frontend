import { IPerson } from "@/types/person-interface";
import { cookieUtils } from "./cookies.utils";

class SessionUtils {
  getPersonFromSession(): IPerson {
    const cookie = cookieUtils.getCookie("session");
    const person = cookie ? JSON.parse(cookie) : ({} as IPerson);
    return person;
  }
}

export const sessionUtils = new SessionUtils();
