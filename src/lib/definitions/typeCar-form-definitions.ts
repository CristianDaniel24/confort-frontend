import { ITypeCar } from "@/types/typeCar-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type TypeCarFormType = z.infer<
  typeof typeCarFormDefinition.typeCarFormSchema
>;

class TypeCarFormDefinition {
  readonly typeCarFormSchema = z.object({
    model: z.string().min(2, { message: "Debes ingresar un modelo correcto" }),
    year: z.string({ message: "El año es requerido" }),
  });

  readonly defaultTypeCar = {
    model: "",
    year: 0,
  } as ITypeCar;

  public asignDefaultValues(typeCar: ITypeCar): any {
    const typeCarFormDefaultValues = {
      resolver: zodResolver(this.typeCarFormSchema),
      defaultValues: {
        model: typeCar.model,
        year: typeCar.year,
      },
    };
    return typeCarFormDefaultValues;
  }
}

export const typeCarFormDefinition = new TypeCarFormDefinition();
