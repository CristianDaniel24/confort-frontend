import { IService } from "@/types/service-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ServiceFormType = z.infer<
  typeof serviceFormDefinition.serviceFormSchema
>;

class ServiceFormDefinition {
  readonly serviceFormSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Debes ingresar mas de 2 caracteres" })
      .max(50),
    price: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debes ingresar un precio valido",
      }),
    status: z.string({ message: "El estado es requerido" }),
    description: z
      .string()
      .min(2, { message: "Debes ingresar mas de 2 caracteres" })
      .max(50),
    dueTo: z.date({
      invalid_type_error: "Debe ser una fecha valida",
    }),
    completedAt: z.date({
      invalid_type_error: "Debe ser una fecha valida",
    }),
  });

  readonly defaultService = {
    name: "",
    price: 0,
    status: "",
    description: "",
    dueTo: 0,
    completedAt: 0,
  } as IService;

  public asignDefaultValues(service: IService): any {
    const serviceFormDefaultValues = {
      resolver: zodResolver(this.serviceFormSchema),
      defaultValues: {
        name: service.name,
        price: service.price,
        status: service.status,
        description: service.description,
        dueTo: service.dueTo,
        completedAt: service.completedAt,
      },
    };
    return serviceFormDefaultValues;
  }
}

export const serviceFormDefinition = new ServiceFormDefinition();
