"use client";

import { useRouter } from "next/navigation";
import TypeProductForm from "../_components/typeProduct-form";
import { toast } from "sonner";
import {
  typeProductFormDefinition,
  TypeProductFormType,
} from "@/lib/definitions/typeProduct-form-definition";
import { ITypeProduct } from "@/types/typeProduct-interface";
import { typeProductService } from "@/services/typeProduct.service";

export default function CreateTypeProduct() {
  const router = useRouter();
  const handleSubmit = (values: TypeProductFormType) => {
    const typeProduct = {
      type: values.type,
    } as ITypeProduct;
    typeProductService.create(typeProduct).then(() => {
      toast.success("Tipo de producto creado!");
      router.push("/home/typeProduct");
    });
  };
  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">
          Tipo de producto nuevo
        </h1>
        <TypeProductForm
          typeProduct={typeProductFormDefinition.defaultTypeProduct}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
