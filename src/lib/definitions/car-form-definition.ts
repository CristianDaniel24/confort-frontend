import { ICar } from "@/types/car-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type CarFormType = z.infer<typeof carFormDefinition.carFormSchema>;

class CarFormDefinition {
  readonly carFormSchema = z.object({
    color: z.string().nonempty("El color es requerido"),
    plate: z.string().nonempty("La placa es requerida"),
    typeCar: z
      .string()
      .min(1, { message: "Debes seleccionar un tipo de carro" })
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Debes seleccionar un tipo de carro válido",
      }),
  });

  readonly defaultCar = {
    color: "",
    plate: "",
    typeCar: {
      id: 0,
    },
    client: {
      id: 0,
    },
  } as ICar;

  public asignDefaultValues(car: ICar): any {
    const carFormDefaultValues = {
      resolver: zodResolver(this.carFormSchema),
      defaultValues: {
        color: car.color,
        plate: car.plate,
        typeCar: car.typeCar.id.toString(),
      },
    };
    return carFormDefaultValues;
  }
}

export const carFormDefinition = new CarFormDefinition();
