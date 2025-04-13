"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ITypeProduct } from "@/types/typeProduct-interface";
import { TypeProductFormType } from "@/lib/definitions/typeProduct-form-definition";
import { typeProductService } from "@/services/typeProduct.service";
import TypeProductForm from "../../_components/typeProduct-form";

export default function EditTypeProduct() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [typeProduct, setTypeProduct] = useState<ITypeProduct>();

  const handleSubmit = (values: TypeProductFormType) => {
    const typeProductUpdate = {
      type: values.type,
    } as ITypeProduct;
    typeProductService
      .update(+id, typeProductUpdate)
      .then(() => {
        toast.success("Tipo de producto editado!");
        router.push("/home/typeProduct");
      })
      .catch(() => {
        toast.error("Uh oh! algo salio mal", {
          description: "Hubo un problema con tu solicitud",
        });
      });
  };

  useEffect(() => {
    typeProductService
      .findById(+id)
      .then((typeProduct) => setTypeProduct(typeProduct));
  }, [id]);

  if (!typeProduct) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">
          Editar tipo de producto
        </h1>
        <TypeProductForm typeProduct={typeProduct} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
