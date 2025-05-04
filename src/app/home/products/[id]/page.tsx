"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { productService } from "@/services/product.service";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";
import { useImageUploadStore } from "../_components/imageUploadStore";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: Readonly<Props>) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const uploadingId = useImageUploadStore((state) => state.uploadingId);

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      const prod = await productService.findById(+id);
      setProduct(prod);
      setLoading(false);
    };
    load();
  }, [params]);

  if (loading || !product) {
    return null;
  }

  const isUploading = uploadingId === product.id;

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-2xl font-medium leading-none">
              Nombre: {product.name}
            </h3>
            <p className="text-lg text-muted-foreground">
              Costo: {product.cost}
            </p>
            <p className="text-lg text-muted-foreground">
              Codigo: {product.code}
            </p>
            <p className="text-lg text-muted-foreground">
              Cantidad: {product.stock}
            </p>
            <p className="text-lg text-muted-foreground">
              Tipo de producto: {product.typeProduct?.type}
            </p>
            <p className="text-lg text-muted-foreground">
              Proveedor: {product.provider?.name} ({product.provider?.address})
              ({product.provider?.phone})
            </p>
            <p className="text-lg text-muted-foreground">
              Imagen del producto:
            </p>
            {(() => {
              if (isUploading) {
                return <Skeleton className="w-[300px] h-[300px] rounded-md" />;
              }
              return product.imgUrl ? (
                <Image
                  src={product.imgUrl}
                  alt="Imagen del producto"
                  width={300}
                  height={300}
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="mt-2 w-[300px] h-[300px] flex flex-col items-center justify-center border rounded bg-muted text-muted-foreground gap-2">
                  <ImageOff className="w-10 h-10" />
                  <span>Sin imagen</span>
                </div>
              );
            })()}
          </div>
        </div>
      </Card>
    </div>
  );
}
