import { ITypeCar } from "@/types/typeCar-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type TypeCarFormType = z.infer<
  typeof typeCarFormDefinition.typeCarFormSchema
>;

class TypeCarFormDefinition {
  readonly typeCarFormSchema = z.object({
    model: z.string({ message: "El modelo es requerido" }),
    year: z.coerce.date({
      invalid_type_error: "El año del carro debe tener una fecha válida",
    }),
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
        year: new Date(typeCar.year), // convierte timestamp a Date
      },
    };
    return typeCarFormDefaultValues;
  }
}

export const typeCarFormDefinition = new TypeCarFormDefinition();
