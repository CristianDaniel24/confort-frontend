"use client";

import { useRouter } from "next/navigation";
import TypeCarForm from "../_components/typeCar-form";
import { toast } from "sonner";
import {
  typeCarFormDefinition,
  TypeCarFormType,
} from "@/lib/definitions/typeCar-form-definitions";
import { ITypeCar } from "@/types/typeCar-interface";
import { typeCarService } from "@/services/typeCar.service";

export default function CreateTypeCar() {
  const router = useRouter();
  const handleSubmit = (values: TypeCarFormType) => {
    const typeCar = {
      model: values.model,
      year: +values.year,
    } as ITypeCar;
    typeCarService
      .create(typeCar)
      .then(() => {
        toast.success("Tipo de carro creado!");
        router.push("/home/typeCar");
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
        <h1 className="text-4xl leading-none font-medium">
          Tipo de carro nuevo
        </h1>
        <TypeCarForm
          typeCar={typeCarFormDefinition.defaultTypeCar}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
