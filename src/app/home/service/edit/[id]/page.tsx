"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IService } from "@/types/service-interface";
import { serviceService } from "@/services/service.service";
import { ServiceFormType } from "@/lib/definitions/service-form-definition";
import ServiceForm from "../../_components/service-form";
import { useCartStore } from "@/app/shop/cart/_components/cart-update-icon";

export default function EditService() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<IService>();
  const { incrementItemCount } = useCartStore();

  const handleSubmit = (values: ServiceFormType) => {
    const serviceUpdate = {
      status: values.status,
      description: values.description,
      dueTo: Number(values.dueTo),
      completedAt: Number(values.completedAt),
    } as IService;
    console.log("Id del servicio " + id);
    serviceService.update(+id, serviceUpdate).then(() => {
      incrementItemCount();
      toast.success("Servicio editado!");
      router.push("/home/service");
    });
  };

  useEffect(() => {
    serviceService.findById(+id).then((service) => setService(service));
  }, [id]);

  if (!service) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Editar Servicio</h1>
        <ServiceForm service={service} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
