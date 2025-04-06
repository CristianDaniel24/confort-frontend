import { ITypeProcedure } from "@/types/typeProcedure-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type TypeProcedureFormType = z.infer<
  typeof typeProcedureFormDefinition.typeProcedureFormSchema
>;

class TypeProcedureFormDefinition {
  readonly typeProcedureFormSchema = z.object({
    type: z
      .string()
      .min(3, { message: "Debes ingresar mas de 3 caracteres" })
      .max(100),
  });

  readonly defaultTypeProcedure = {
    type: "",
  } as ITypeProcedure;

  public asignDefaultValues(typeProcedure: ITypeProcedure): any {
    const typeProcedureFormDefaultValues = {
      resolver: zodResolver(this.typeProcedureFormSchema),
      defaultValues: {
        type: typeProcedure.type,
      },
    };
    return typeProcedureFormDefaultValues;
  }
}

export const typeProcedureFormDefinition = new TypeProcedureFormDefinition();
