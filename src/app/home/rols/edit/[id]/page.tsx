"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IRol } from "@/types/rol-interface";
import { RolFormType } from "@/lib/definitions/rol-form-definition";
import { rolService } from "@/services/rol-service";
import RolForm from "../../_components/rol-form";

export default function EditRol() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [rol, setRol] = useState<IRol>();

  const handleSubmit = (values: RolFormType) => {
    const rolUpdate = {
      name: values.name,
      salary: Number(values.salary),
    } as IRol;
    rolService
      .update(+id, rolUpdate)
      .then(() => {
        toast.success("Rol editado!");
        router.push("/home/rols");
      })
      .catch(() => {
        toast.error("Uh oh! algo salio mal", {
          description: "Hubo un problema con tu solicitud",
        });
      });
  };

  useEffect(() => {
    rolService.findById(+id).then((rol) => setRol(rol));
  }, [id]);

  if (!rol) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Editar Rol</h1>
        <RolForm rol={rol} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
