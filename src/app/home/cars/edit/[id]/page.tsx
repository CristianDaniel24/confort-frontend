"use client";

import { CarFormType } from "@/lib/definitions/car-form-definition";
import { carService } from "@/services/car-service";
import { ICar } from "@/types/car-interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CarForm from "../../_components/car-form";

export default function EditCar() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<ICar>();

  const handleSubmit = (values: CarFormType) => {
    const carUpdate = {
      type: values.type,
      color: values.color,
      plate: values.plate,
      year_model: values.year_model.getFullYear(),
    } as ICar;
    carService
      .update(+id, carUpdate)
      .then(() => {
        toast.success("Carro editado!");
        router.push("/home/cars");
      })
      .catch(() => {
        toast.error("¡Oh, oh! Algo salio mal", {
          description: "Hubo un problema con tu solicitud",
        });
      });
  };

  useEffect(() => {
    carService.findById(+id).then((car) => setCar(car));
  }, [id]);

  if (!car) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Editar Carro</h1>
        <CarForm car={car} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
