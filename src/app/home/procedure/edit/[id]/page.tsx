"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IProcedure } from "@/types/procedure-interface";
import { ProcedureFormType } from "@/lib/definitions/procedure-form-definition";
import { procedureService } from "@/services/procedure.service";
import ProcedureForm from "../../_components/procedure-form";

export default function EditProcedure() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [procedure, setProcedure] = useState<IProcedure>();

  const handleSubmit = (values: ProcedureFormType) => {
    const procedureUpdate = {
      name: values.name,
      price: +values.price,
      description: values.description,
      date: values.date,
      status: values.status,
      typeProcedure: { id: +values.typeProcedure },
    } as IProcedure;
    procedureService.update(+id, procedureUpdate).then(() => {
      toast.success("Procedimiento editado!");
      router.push("/home/procedure");
    });
  };

  useEffect(() => {
    procedureService.findById(+id).then((procedure) => setProcedure(procedure));
  }, [id]);

  if (!procedure) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">
          Editar Procedimiento
        </h1>
        <ProcedureForm procedure={procedure} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
