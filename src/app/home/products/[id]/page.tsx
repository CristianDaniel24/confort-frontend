"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/services/product.service";
import {
  Barcode,
  Box,
  Building,
  DollarSign,
  ImageOff,
  Package,
  Phone,
  ShoppingBag,
  Tag,
} from "lucide-react";

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

  // Función para formatear el precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Determinar el estado del stock
  const getStockStatus = (stock: number) => {
    if (stock <= 0) return { label: "Sin stock", color: "destructive" };
    if (stock < 10) return { label: "Stock bajo", color: "warning" };
    return { label: "En stock", color: "success" };
  };

  if (loading) {
    return (
      <div className="grid gap-y-5 p-4">
        <Card className="shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-60 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="grid place-items-center h-[60vh]">
        <div className="text-center space-y-4">
          <Package className="h-16 w-16 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-medium">Producto no encontrado</h3>
          <p className="text-muted-foreground">
            El producto que buscas no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="grid gap-y-5 p-4">
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-white shadow-sm border">
              {!imageError[product.id] && product.imgUrl ? (
                <Image
                  src={product.imgUrl || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                  onError={() =>
                    setImageError((prev) => ({
                      ...prev,
                      [product.id]: true,
                    }))
                  }
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400">
                  <ImageOff className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-2 gap-2">
                <Badge variant="outline" className="bg-emerald-50">
                  <Tag className="h-3 w-3 mr-1 text-emerald-500" />
                  {product.typeProduct?.type || "Sin categoría"}
                </Badge>
                <Badge variant="outline" className="bg-slate-50">
                  <Barcode className="h-3 w-3 mr-1 text-slate-500" />
                  {product.code}
                </Badge>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-emerald-600">
                  {formatPrice(product.cost)}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg text-slate-800 flex items-center">
                  <Box className="h-5 w-5 mr-2 text-emerald-500" />
                  Detalles del Producto
                </h3>
                <Separator className="my-3" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-50 p-2 rounded">
                      <Barcode className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Código</p>
                      <p className="text-sm text-slate-600">{product.code}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-slate-50 p-2 rounded">
                      <Tag className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tipo de producto</p>
                      <p className="text-sm text-slate-600">
                        {product.typeProduct?.type || "No especificado"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-slate-50 p-2 rounded">
                      <Package className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Cantidad en el almacen
                      </p>
                      <div className="flex items-center">
                        <p className="text-sm text-slate-600">
                          {product.stock} unidades
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-slate-50 p-2 rounded">
                      <DollarSign className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Precio</p>
                      <p className="text-sm text-slate-600">
                        {formatPrice(product.cost)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg text-slate-800 flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-emerald-500" />
                  Información del Proveedor
                </h3>
                <Separator className="my-3" />

                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="h-5 w-5 text-emerald-600" />
                    <h4 className="font-medium">
                      {product.provider?.name || "Proveedor no especificado"}
                    </h4>
                  </div>

                  {product.provider && (
                    <div className="space-y-2 ml-7">
                      <div className="flex items-start gap-2">
                        <p className="text-sm text-slate-500">Dirección:</p>
                        <p className="text-sm">
                          {product.provider.address || "No especificada"}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <p className="text-sm text-slate-500">Teléfono:</p>
                        <p className="text-sm flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {product.provider.phone || "No especificado"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
