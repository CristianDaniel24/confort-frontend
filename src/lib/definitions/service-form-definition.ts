import { IService } from "@/types/service-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ServiceFormType = z.infer<
  typeof serviceFormDefinition.serviceFormSchema
>;

class ServiceFormDefinition {
  readonly serviceFormSchema = z.object({
    status: z.string({ message: "El estado es requerido" }),
    description: z
      .string()
      .min(2, { message: "Debes ingresar mas de 2 caracteres" })
      .max(150),
    dueTo: z.date({
      invalid_type_error: "Debe ser una fecha valida",
    }),
    completedAt: z.date({
      invalid_type_error: "Debe ser una fecha valida",
    }),
  });

  readonly defaultService = {
    status: "",
    description: "",
    dueTo: 0,
    completedAt: 0,
  } as IService;

  public asignDefaultValues(service: IService): any {
    const serviceFormDefaultValues = {
      resolver: zodResolver(this.serviceFormSchema),
      defaultValues: {
        status: service.status,
        description: service.description ?? "",
        dueTo: service.dueTo ?? "",
        completedAt: service.completedAt ?? "",
      },
    };
    return serviceFormDefaultValues;
  }
}

export const serviceFormDefinition = new ServiceFormDefinition();
