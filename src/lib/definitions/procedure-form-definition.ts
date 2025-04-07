import { IProcedure } from "@/types/procedure-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ProcedureFormType = z.infer<
  typeof procedureFormDefinition.procedureFormSchema
>;

class ProcedureFormDefinition {
  readonly procedureFormSchema = z.object({
    description: z.string({ message: "La descripcion es requerida" }),
    date: z.date({
      invalid_type_error: "Must be a valid date",
    }),
    status: z.string({ message: "El estado es requerido" }),
    typeProcedure: z.string({
      message: "Debes ingresar un tipo de procedimiento correcto",
    }),
  });

  readonly defaultProcedure = {
    description: "",
    date: 0,
    status: "",
    typeProcedure: {
      type: "Herramienta",
    },
  } as IProcedure;

  public asignDefaultValues(procedure: IProcedure): any {
    const procedureFormDefaultValues = {
      resolver: zodResolver(this.procedureFormSchema),
      defaultValues: {
        description: procedure.description,
        date: procedure.date,
        status: procedure.status,
        typeProcedure: procedure.typeProcedure,
      },
    };
    return procedureFormDefaultValues;
  }
}

export const procedureFormDefinition = new ProcedureFormDefinition();
