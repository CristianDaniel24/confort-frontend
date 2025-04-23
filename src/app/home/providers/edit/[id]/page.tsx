"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IProvider } from "@/types/provider-interface";
import { ProviderFormType } from "@/lib/definitions/provider-form-definition";
import { providerService } from "@/services/provider.service";
import ProviderForm from "../../_components/provider-form";

export default function EditProvider() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<IProvider>();

  const handleSubmit = (values: ProviderFormType) => {
    const providerUpdate = {
      name: values.name,
      address: values.address,
      phone: values.phone,
    } as IProvider;
    providerService.update(+id, providerUpdate).then(() => {
      toast.success("Proveedor editado!");
      router.push("/home/providers");
    });
  };

  useEffect(() => {
    providerService.findById(+id).then((rol) => setProvider(rol));
  }, [id]);

  if (!provider) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Editar Proveedor</h1>
        <ProviderForm provider={provider} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
