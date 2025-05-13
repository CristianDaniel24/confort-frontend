"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { productService } from "@/services/product.service";
import { ImageOff } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: Readonly<Props>) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

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
            {!imageError[product.id] && product.imgUrl ? (
              <div className="relative w-full h-60 rounded overflow-hidden">
                <Image
                  src={product.imgUrl}
                  alt={product.name}
                  fill
                  className="object-contain bg-white"
                  priority
                  unoptimized
                  onError={() =>
                    setImageError((prev) => ({
                      ...prev,
                      [product.id]: true,
                    }))
                  }
                />
              </div>
            ) : (
              <div className="w-full h-60 flex flex-col items-center justify-center border rounded bg-muted text-muted-foreground gap-2">
                <ImageOff className="w-10 h-10" />
                <span>Sin imagen</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
