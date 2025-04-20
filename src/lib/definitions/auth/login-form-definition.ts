import { ILogin } from "@/types/login-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type LoginFormType = z.infer<typeof loginFormDefinition.loginFormSchema>;

class LoginFormDefinition {
  readonly loginFormSchema = z.object({
    email: z.string().trim(),
    password: z.string().trim(),
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
