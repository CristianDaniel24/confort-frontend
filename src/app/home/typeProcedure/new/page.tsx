"use client";

import { useRouter } from "next/navigation";
import TypeProcedureForm from "../_components/typeProcedure-form";
import { toast } from "sonner";
import {
  typeProcedureFormDefinition,
  TypeProcedureFormType,
} from "@/lib/definitions/typeProcedure-form-definition";
import { ITypeProcedure } from "@/types/typeProcedure-interface";
import { typeProcedureService } from "@/services/typeProcedure.service";

export default function CreateTypeProcedure() {
  const router = useRouter();
  const handleSubmit = (values: TypeProcedureFormType) => {
    const typeProcedure = {
      type: values.type,
    } as ITypeProcedure;
    typeProcedureService
      .create(typeProcedure)
      .then(() => {
        toast.success("Tipo de procedimiento creado!");
        router.push("/home/typeProcedure");
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
          Tipo de procedimiento nuevo
        </h1>
        <TypeProcedureForm
          typeProcedure={typeProcedureFormDefinition.defaultTypeProcedure}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
