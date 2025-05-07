import { IRol } from "@/types/rol-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type RolFormType = z.infer<typeof rolFormDefinition.rolFormSchema>;

class RolFormDefinition {
  readonly rolFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Debes ingresar mas de 3 caracteres" })
      .max(30),
    salary: z.string({ message: "El salario es requerido" }),
  });

  readonly defaultRol = {
    name: "",
    salary: 0,
  } as IRol;

  public asignDefaultValues(rol: IRol): any {
    const rolFormDefaultValues = {
      resolver: zodResolver(this.rolFormSchema),
      defaultValues: {
        name: rol.name,
        salary: rol.salary,
      },
    };
    return rolFormDefaultValues;
  }
}

export const rolFormDefinition = new RolFormDefinition();
