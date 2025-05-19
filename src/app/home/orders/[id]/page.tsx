"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { billService } from "@/services/bill.service";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { IOrders } from "@/types/orders-interface";

interface Props {
  params: Promise<{ id: string }>;
}

export default function OrderDetails({ params }: Readonly<Props>) {
  const [bill, setBill] = useState<IOrders>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      const result = await billService.findById(+id);
      setBill(result as IOrders);
      setLoading(false);
    };
    load();
  }, [params]);

  if (loading || !bill) return null;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("es-CO")} ${date.toLocaleTimeString(
      "es-CO",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    )}`;
  };

  function SafeImage({ src, alt }: { src?: string; alt: string }) {
    const [error, setError] = useState(false);

    if (!src || error) {
      return (
        <div className="flex items-center justify-center w-14 h-14 rounded border bg-white">
          <ImageOff className="w-5 h-5 text-muted-foreground" />
        </div>
      );
    }

    return (
      <div className="relative w-14 h-14 rounded border overflow-hidden bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          onError={() => setError(true)}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Factura #{bill.id}</CardTitle>
          <p className="text-base text-muted-foreground">
            Fecha: {formatDate(bill.date)}
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">Cliente:</h4>

            <p className="text-base text-muted-foreground">
              <span className="font-medium text-black">Nombre:</span>{" "}
              {bill.shoppingCart.client.person.firstName}{" "}
              {bill.shoppingCart.client.person.lastName}
            </p>
            <p className="text-base text-muted-foreground">
              <span className="font-medium text-black">Teléfono:</span>{" "}
              {bill.shoppingCart.client.person.phone}
            </p>
            <p className="text-base text-muted-foreground">
              <span className="font-medium text-black">Correo:</span>{" "}
              {bill.shoppingCart.client.person.email}
            </p>
          </div>

          <Separator className="my-6" />

          <h4 className="font-semibold text-lg mb-4">Productos:</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bill.shoppingCart.shoppingCartProduct.map(
                (
                  item: IOrders["shoppingCart"]["shoppingCartProduct"][number]
                ) => (
                  <TableRow key={`${item.id}-${item.product.id}`}>
                    <TableCell className="flex items-center gap-3">
                      <SafeImage
                        src={item.product.imgUrl}
                        alt={item.product.name}
                      />
                      <span className="text-base">{item.product.name}</span>
                    </TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      {item.product.cost
                        ? formatCurrency(item.product.cost)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {item.product.cost
                        ? formatCurrency(item.amount * item.product.cost)
                        : "-"}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>

          <Separator className="my-6" />

          <div className="flex justify-end text-xl font-semibold">
            Total: {formatCurrency(bill.costTotal)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
