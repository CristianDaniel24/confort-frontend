"use client";

import { useRouter } from "next/navigation";
import ProductForm from "../_components/product-form";
import { toast } from "sonner";
import {
  productFormDefinition,
  ProductFormType,
} from "@/lib/definitions/product-form-definition";
import { IProduct } from "@/types/product-interface";
import { productService } from "@/services/product.service";

export default function CreateProduct() {
  const router = useRouter();
  const handleSubmit = (values: ProductFormType) => {
    const product = {
      name: values.name,
      cost: Number(values.cost),
      code: values.code,
      stock: Number(values.stock),
      typeProduct: { id: +values.typeProduct },
      provider: { id: +values.provider },
    } as IProduct;
    productService
      .create(product)
      .then(() => {
        toast.success("Producto creado!");
        router.push("/home/products");
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
        <h1 className="text-4xl leading-none font-medium">Producto nuevo</h1>
        <ProductForm
          product={productFormDefinition.defaultProduct}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
