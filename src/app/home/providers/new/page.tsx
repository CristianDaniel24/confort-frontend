"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  providerFormDefinition,
  ProviderFormType,
} from "@/lib/definitions/provider-form-definition";
import { IProvider } from "@/types/provider-interface";
import { providerService } from "@/services/provider.service";
import ProviderForm from "../_components/provider-form";

export default function CreateProvider() {
  const router = useRouter();
  const handleSubmit = (values: ProviderFormType) => {
    const provider = {
      name: values.name,
      address: values.address,
      phone: values.phone,
    } as IProvider;
    providerService.create(provider).then(() => {
      toast.success("Proveedor creado!");
      router.push("/home/providers");
    });
  };
  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Proveedor nuevo</h1>
        <ProviderForm
          provider={providerFormDefinition.defaultProvider}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
