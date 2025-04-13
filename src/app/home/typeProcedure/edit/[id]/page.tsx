"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ITypeProcedure } from "@/types/typeProcedure-interface";
import { TypeProcedureFormType } from "@/lib/definitions/typeProcedure-form-definition";
import { typeProcedureService } from "@/services/typeProcedure.service";
import TypeProcedureForm from "../../_components/typeProcedure-form";

export default function EditTypeProcedure() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [typeProcedure, setTypeProcedure] = useState<ITypeProcedure>();

  const handleSubmit = (values: TypeProcedureFormType) => {
    const typeProcedureUpdate = {
      type: values.type,
    } as ITypeProcedure;
    typeProcedureService
      .update(+id, typeProcedureUpdate)
      .then(() => {
        toast.success("Tipo de procedimiento editado!");
        router.push("/home/typeProcedure");
      })
      .catch(() => {
        toast.error("Uh oh! algo salio mal", {
          description: "Hubo un problema con tu solicitud",
        });
      });
  };

  useEffect(() => {
    typeProcedureService
      .findById(+id)
      .then((typeProcedure) => setTypeProcedure(typeProcedure));
  }, [id]);

  if (!typeProcedure) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">
          Editar tipo de procedimiento
        </h1>
        <TypeProcedureForm
          typeProcedure={typeProcedure}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
