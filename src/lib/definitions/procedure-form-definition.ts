import { IProcedure } from "@/types/procedure-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ProcedureFormType = z.infer<
  typeof procedureFormDefinition.procedureFormSchema
>;

class ProcedureFormDefinition {
  readonly procedureFormSchema = z.object({
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
