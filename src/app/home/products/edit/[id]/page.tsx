"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IProduct } from "@/types/product-interface";
import { ProductFormType } from "@/lib/definitions/product-form-definition";
import { productService } from "@/services/product.service";
import ProductForm from "../../_components/product-form";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct>();

  const handleSubmit = (values: ProductFormType) => {
    const productUpdate = {
      name: values.name,
      cost: Number(values.cost),
      code: values.code,
      stock: Number(values.stock),
      typeProduct: { id: +values.typeProduct },
      provider: { id: +values.provider },
    } as IProduct;
    productService.update(+id, productUpdate).then(() => {
      toast.success("Producto editado!");
      router.push("/home/products");
    });
  };

  useEffect(() => {
    productService.findById(+id).then((product) => setProduct(product));
  }, [id]);

  if (!product) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Editar Producto</h1>
        <ProductForm product={product} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
