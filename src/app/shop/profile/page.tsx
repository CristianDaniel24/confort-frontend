"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { sessionUtils } from "@/app/utils/session.utils";
import { IClient } from "@/types/client-interface";
import { clientService } from "@/services/client.service";
import ClientFormEditAccount from "./client-edit-form";
import { ClientEditFormType } from "./client-edit-form-definition";

export default function ProfilePageClient() {
  const router = useRouter();
  const [client, setClient] = useState<IClient>();
  const [personId, setPersonId] = useState<number | null>(null);

  const handleSubmit = (values: ClientEditFormType) => {
    const clientUpdate = {
      person: {
        firstName: values.firstName,
        secondName: values.secondName,
        lastName: values.lastName,
        secondLastName: values.secondLastName,
        document: values.document,
        phone: values.phone,
        address: values.address,
        email: values.email,
      },
    } as IClient;

    if (personId != null) {
      clientService.update(personId, clientUpdate).then(() => {
        toast.success("Se editó tu cuenta con éxito!");
        router.push("/shop");
      });
    }
  };

  useEffect(() => {
    const person = sessionUtils.getPersonFromSession();
    console.log("Persona en sesión:", person);

    if (person?.id) {
      setPersonId(person.id);

      clientService
        .findById(person.id)
        .then(setClient)
        .catch((error) => {
          console.error("Error al obtener el cliente:", error);
          toast.error("No se pudo cargar la información del cliente.");
        });
    }
  }, []);

  if (!client) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10 mt-15">
      <div className="grid gap-5">
        <ClientFormEditAccount client={client.person} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
