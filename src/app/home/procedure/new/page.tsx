"use client";

import { useRouter } from "next/navigation";
import ProcedureForm from "../_components/procedure-form";
import { toast } from "sonner";
import {
  procedureFormDefinition,
  ProcedureFormType,
} from "@/lib/definitions/procedure-form-definition";
import { IProcedure } from "@/types/procedure-interface";
import { procedureService } from "@/services/procedure.service";

export default function CreateProcedure() {
  const router = useRouter();
  const handleSubmit = (values: ProcedureFormType) => {
    const procedure = {
      name: values.name,
      price: +values.price,
      description: values.description,
      date: values.date,
      status: values.status,
      typeProcedure: { id: +values.typeProcedure },
    } as IProcedure;
    procedureService.create(procedure).then(() => {
      toast.success("Procedimiento creado!");
      router.push("/home/procedure");
    });
  };
  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">
          Procedimiento nuevo
        </h1>
        <ProcedureForm
          procedure={procedureFormDefinition.defaultProcedure}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
