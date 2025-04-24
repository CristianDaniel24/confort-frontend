import { ILogin } from "@/types/login-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type LoginFormType = z.infer<typeof loginFormDefinition.loginFormSchema>;

const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;

class LoginFormDefinition {
  readonly loginFormSchema = z.object({
    email: z.string().refine((val) => emailRegex.test(val), {
      message:
        "Debes ingresar un correo valido y debe pertenecer a gmail.com, outlook.com o hotmail.com",
    }),
    password: z.string().min(5, {
      message: "Debes ingresar tu contraseña, minimo 5 caracteres",
    }),
  });

  readonly defaultLogin = {
    email: "",
    password: "",
  } as ILogin;

  public asignDefaultValues(login: ILogin): any {
    const loginFormDefaultValues = {
      resolver: zodResolver(this.loginFormSchema),
      defaultValues: {
        email: login.email,
        password: login.password,
      },
    };
    return loginFormDefaultValues;
  }
}

export const loginFormDefinition = new LoginFormDefinition();
