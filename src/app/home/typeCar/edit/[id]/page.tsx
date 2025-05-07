"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ITypeCar } from "@/types/typeCar-interface";
import { TypeCarFormType } from "@/lib/definitions/typeCar-form-definitions";
import { typeCarService } from "@/services/typeCar.service";
import TypeCarForm from "../../_components/typeCar-form";

export default function EditTypeCar() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [typeCar, setTypeCar] = useState<ITypeCar>();

  const handleSubmit = (values: TypeCarFormType) => {
    const typeCarUpdate = {
      model: values.model,
      year: +values.year,
    } as ITypeCar;
    typeCarService.update(+id, typeCarUpdate).then(() => {
      toast.success("Tipo de carro editado!");
      router.push("/home/typeCar");
    });
  };

  useEffect(() => {
    typeCarService.findById(+id).then((typeCar) => setTypeCar(typeCar));
  }, [id]);

  if (!typeCar) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">
          Editar tipo de carro
        </h1>
        <TypeCarForm typeCar={typeCar} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
