import { ICar } from "@/types/car-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type CarFormType = z.infer<typeof carFormDefinition.carFormSchema>;

class CarFormDefinition {
  readonly carFormSchema = z.object({
    type: z
      .string()
      .min(3, { message: "Debes ingresar mas de 3 caracteres" })
      .max(30),
    color: z.string({ message: "El color es requirido" }).min(3).max(30),
    plate: z.string({ message: "La placa es requerida" }).min(7).max(7),
    year_model: z.date({
      invalid_type_error: "Debes ingresar una fecha valida",
    }),
  });

  readonly defaultCar = {
    type: "",
    color: "",
    plate: "",
    year_model: 0,
  } as ICar;

  public asignDefaultValues(car: ICar): any {
    const carFormDefaultValues = {
      resolver: zodResolver(this.carFormSchema),
      defaultValues: {
        type: car.type,
        color: car.color,
        plate: car.plate,
        year_model:
          car.year_model === 0 ? new Date() : new Date(car.year_model, 1, 1),
      },
    };
    return carFormDefaultValues;
  }
}

export const carFormDefinition = new CarFormDefinition();
