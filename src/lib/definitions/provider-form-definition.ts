import { IProvider } from "@/types/provider-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ProviderFormType = z.infer<
  typeof providerFormDefinition.providerFormSchema
>;

class ProviderFormDefinition {
  readonly providerFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Debes ingresar mas de 3 caracteres" })
      .max(30),
    address: z.string({ message: "El salario es requerido" }).min(4).max(30),
    phone: z
      .string({ message: "" })
      .min(10, { message: "Debes ingresar un numero de telefono correcto" })
      .max(10),
  });

  readonly defaultProvider = {
    name: "",
    address: "",
    phone: "",
  } as IProvider;

  public asignDefaultValues(provider: IProvider): any {
    const providerFormDefaultValues = {
      resolver: zodResolver(this.providerFormSchema),
      defaultValues: {
        name: provider.name,
        address: provider.address,
        phone: provider.phone,
      },
    };
    return providerFormDefaultValues;
  }
}

export const providerFormDefinition = new ProviderFormDefinition();
