"use client";

import { useRouter } from "next/navigation";
import CarForm from "../_components/car-form";
import {
  carFormDefinition,
  CarFormType,
} from "@/lib/definitions/car-form-definition";
import { ICar } from "@/types/car-interface";
import { carService } from "@/services/car-service";
import { toast } from "sonner";

export default function CreateCar() {
  const router = useRouter();
  const handleSubmit = (values: CarFormType) => {
    const car = {
      type: values.type,
      color: values.color,
      plate: values.plate,
      year_model: values.year_model.getFullYear(),
    } as ICar;
    carService
      .create(car)
      .then(() => {
        toast.success("Carro creado!");
        router.push("/home/cars");
      })
      .catch(() => {
        toast.error("Ho algo salio mal", {
          description: "Hubo un problema con tu solicitud",
        });
      });
  };
  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Carro nuevo</h1>
        <CarForm car={carFormDefinition.defaultCar} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
