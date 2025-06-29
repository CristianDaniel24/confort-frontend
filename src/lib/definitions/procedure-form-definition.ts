import { IProcedure } from "@/types/procedure-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ProcedureFormType = z.infer<
  typeof procedureFormDefinition.procedureFormSchema
>;

class ProcedureFormDefinition {
  readonly procedureFormSchema = z.object({
    name: z.string().min(3, { message: "El nombre es requerido" }),
    price: z
      .string()
      .min(1, { message: "Debes ingresar un costo valido" })
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Debes ingresar un precio valido, tiene que ser mayor que 0",
      }),
    description: z.string().min(3, { message: "La descripcion es requerida" }),
    date: z.date({
      invalid_type_error: "Must be a valid date",
    }),
    status: z.string().min(3, { message: "El estado es requerido" }),
    typeProcedure: z
      .string()
      .min(1, { message: "Debes ingresar un tipo de procedimiento correcto" }),
  });

  readonly defaultProcedure = {
    name: "",
    price: 0,
    description: "",
    date: new Date(),
    status: "",
    typeProcedure: {
      id: 0,
    },
  } as IProcedure;

  public asignDefaultValues(procedure: IProcedure): any {
    const procedureFormDefaultValues = {
      resolver: zodResolver(this.procedureFormSchema),
      defaultValues: {
        name: procedure.name,
        price: procedure.price.toString(),
        description: procedure.description,
        date: new Date(procedure.date),
        status: procedure.status,
        typeProcedure: procedure.typeProcedure.id.toString(),
      },
    };
    return procedureFormDefaultValues;
  }
}

export const procedureFormDefinition = new ProcedureFormDefinition();
