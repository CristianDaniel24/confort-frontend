"use client";

import { useRouter } from "next/navigation";
import RolForm from "../_components/rol-form";
import { toast } from "sonner";
import {
  rolFormDefinition,
  RolFormType,
} from "@/lib/definitions/rol-form-definition";
import { IRol } from "@/types/rol-interface";
import { rolService } from "@/services/rol.service";

export default function CreateRol() {
  const router = useRouter();
  const handleSubmit = (values: RolFormType) => {
    const rol = {
      name: values.name,
      salary: Number(values.salary),
    } as IRol;
    rolService
      .create(rol)
      .then(() => {
        toast.success("Rol creado!");
        router.push("/home/rols");
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
        <h1 className="text-4xl leading-none font-medium">Rol nuevo</h1>
        <RolForm rol={rolFormDefinition.defaultRol} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
