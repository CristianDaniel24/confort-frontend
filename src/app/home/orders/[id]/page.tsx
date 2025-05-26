"use client";
status;
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { billService } from "@/services/bill.service";
import Image from "next/image";
import {
  CalendarDays,
  Car,
  Clock,
  Download,
  FileText,
  ImageOff,
  Mail,
  MapPin,
  Package,
  Phone,
  Receipt,
  ShoppingBag,
  User,
  Wrench,
  BadgeIcon as IdCard,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { IBill } from "@/types/bill-interface";

interface Props {
  params: Promise<{ id: string }>;
}

export default function OrderDetails({ params }: Readonly<Props>) {
  const [bill, setBill] = useState<IBill>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      const result = await billService.findById(+id);
      setBill(result as IBill);
      setLoading(false);
    };
    load();
  }, [params]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);

  const formatDate = (dateValue: string | Date) => {
    const date = new Date(dateValue);
    return `${date.toLocaleDateString("es-CO")} ${date.toLocaleTimeString(
      "es-CO",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    )}`;
  };

  const formatDateOnly = (dateValue: string | Date) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-contain"
          onError={() => setError(true)}
          unoptimized
        />
      </div>
    );
  }

  // Función para obtener el estado del carrito con color
  const getCartStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("completado") ||
      statusLower.includes("finalizado")
    )
      return "success";
    if (statusLower.includes("pendiente")) return "warning";
    if (statusLower.includes("cancelado")) return "destructive";
    return "default";
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
              <Separator />
              <div>
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
              <Separator />
              <Skeleton className="h-8 w-32 ml-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8 text-center">
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center">
            <Receipt className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Factura no encontrada</h3>
            <p className="text-muted-foreground">
              La factura que buscas no existe o ha sido eliminada.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verificar si hay productos o servicios
  const hasProducts =
    bill.shoppingCart.shoppingCartProduct &&
    bill.shoppingCart.shoppingCartProduct.length > 0;
  const hasServices =
    bill.shoppingCart.shoppingCartServices &&
    bill.shoppingCart.shoppingCartServices.length > 0;

  // Construir nombre completo del cliente
  const clientName = [
    bill.shoppingCart.client.person.firstName,
    bill.shoppingCart.client.person.secondName,
    bill.shoppingCart.client.person.lastName,
    bill.shoppingCart.client.person.secondLastName,
  ]
    .filter(Boolean)
    .join(" ");

  const { closeSidebar } = useSidebar();

  const handlePrintOrder = () => {
    //Se cierra el sidebar si esta abierto
    closeSidebar();

    //Se espera un poco para imprimir
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  return (
    <div className="max-w-6xl w-4xl mx-auto p-4 md:p-8">
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Receipt className="h-6 w-6 text-amber-600" />
                <CardTitle className="text-2xl">Factura #{bill.id}</CardTitle>
                <Badge
                  variant={getCartStatusColor(bill.shoppingCart.status) as any}
                  className="ml-2"
                >
                  {bill.shoppingCart.status}
                </Badge>
              </div>
              <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDate(bill.date)}</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="gap-2 bg-white cursor-pointer"
              onClick={handlePrintOrder}
            >
              <Download className="h-4 w-4" />
              Descargar factura
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <User className="h-5 w-5 text-amber-600" />
                Información del Cliente
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Nombre completo:</p>
                    <p className="text-base">
                      {clientName || "No especificado"}
                    </p>
                  </div>
                </div>
                {bill.shoppingCart.client.person.document && (
                  <div className="flex items-start gap-2">
                    <IdCard className="h-4 w-4 text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Documento:</p>
                      <p className="text-base">
                        {bill.shoppingCart.client.person.document}
                      </p>
                    </div>
                  </div>
                )}
                {bill.shoppingCart.client.person.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Teléfono:</p>
                      <p className="text-base">
                        {bill.shoppingCart.client.person.phone}
                      </p>
                    </div>
                  </div>
                )}
                {bill.shoppingCart.client.person.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Correo:</p>
                      <p className="text-base">
                        {bill.shoppingCart.client.person.email}
                      </p>
                    </div>
                  </div>
                )}
                {bill.shoppingCart.client.person.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Dirección:</p>
                      <p className="text-base">
                        {bill.shoppingCart.client.person.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-600" />
                Detalles de la Factura
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Número de factura:
                  </span>
                  <span className="font-medium">#{bill.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Fecha de emisión:
                  </span>
                  <span>{formatDateOnly(bill.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hora:</span>
                  <span>
                    {new Date(bill.date).toLocaleTimeString("es-CO", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Estado del carrito:
                  </span>
                  <Badge
                    variant={
                      getCartStatusColor(bill.shoppingCart.status) as any
                    }
                  >
                    {bill.shoppingCart.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Creado:</span>
                  <span className="text-sm">
                    {formatDateOnly(bill.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Última actualización:
                  </span>
                  <span className="text-sm">
                    {formatDateOnly(bill.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {hasProducts && (
            <>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-600" />
                Productos ({bill.shoppingCart.shoppingCartProduct.length})
              </h4>
              <div className="rounded-lg border overflow-hidden mb-6">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="w-[35%]">Producto</TableHead>
                      <TableHead className="w-[25%] pl-2">Cantidad</TableHead>
                      <TableHead className="w-[30%]  pl-6">
                        Precio unitario
                      </TableHead>
                      <TableHead className="w-[10%] pr-4">Total</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {bill.shoppingCart.shoppingCartProduct.map((item) => (
                      <TableRow key={`product-${item.product.id}`}>
                        <TableCell className="flex items-center gap-3 w-[40%]">
                          <SafeImage
                            src={item.product.imgUrl}
                            alt={item.product.name}
                          />
                          <div>
                            <span className="font-medium">
                              {item.product.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-left pl-2 w-[10%]">
                          <Badge variant="outline" className="bg-slate-100">
                            {item.amount}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-left pl-6 w-[20%]">
                          {item.product.cost
                            ? formatCurrency(item.product.cost)
                            : "No disponible"}
                        </TableCell>

                        <TableCell className="text-right font-medium pr-4 w-[30%]">
                          {item.product.cost
                            ? formatCurrency(item.amount * item.product.cost)
                            : "No disponible"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {hasServices && (
            <>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-amber-600" />
                Servicios ({bill.shoppingCart.shoppingCartServices.length})
              </h4>

              {/* Información del vehículo - Tomamos el primer servicio para mostrar info del carro */}
              {bill.shoppingCart.shoppingCartServices[0]?.service?.car && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h5 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Información del Vehículo
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">Color:</span>
                      <p>
                        {bill.shoppingCart.shoppingCartServices[0].service.car
                          .color || "No especificado"}
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Placa:</span>
                      <p className="font-mono">
                        {bill.shoppingCart.shoppingCartServices[0].service.car
                          .plate || "No especificada"}
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Modelo:</span>
                      <p>
                        {bill.shoppingCart.shoppingCartServices[0].service.car
                          .typeCar?.model || "No especificado"}{" "}
                        {bill.shoppingCart.shoppingCartServices[0].service.car
                          .typeCar?.year || ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Detalles de los servicios */}
              <div className="rounded-lg border overflow-hidden mb-6">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Procedimiento</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fechas</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bill.shoppingCart.shoppingCartServices.map(
                      (serviceItem) => (
                        <TableRow
                          key={`service-${serviceItem.shoppingCart}-${serviceItem.service.id}`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {serviceItem.service?.procedure?.imgUrl && (
                                <SafeImage
                                  src={serviceItem.service.procedure.imgUrl}
                                  alt={
                                    serviceItem.service.procedure.name ||
                                    "Procedimiento"
                                  }
                                />
                              )}
                              <div>
                                <span className="font-medium">
                                  {serviceItem.service?.procedure?.name ||
                                    "Procedimiento no especificado"}
                                </span>
                                {serviceItem.service?.procedure?.typeProcedure
                                  ?.type && (
                                  <p className="text-xs text-muted-foreground">
                                    Tipo:{" "}
                                    {
                                      serviceItem.service.procedure
                                        .typeProcedure.type
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {serviceItem.service?.status && (
                                <Badge
                                  variant={
                                    serviceItem.service.status
                                      .toLowerCase()
                                      .includes("aprobado") ||
                                    serviceItem.service.status
                                      .toLowerCase()
                                      .includes("completado")
                                      ? "default"
                                      : "secondary"
                                  }
                                  className={
                                    serviceItem.service.status
                                      .toLowerCase()
                                      .includes("aprobado") ||
                                    serviceItem.service.status
                                      .toLowerCase()
                                      .includes("completado")
                                      ? "bg-green-100 text-green-800"
                                      : "bg-amber-100 text-amber-800"
                                  }
                                >
                                  {serviceItem.service.status}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs space-y-1">
                              {serviceItem.service?.procedure?.date && (
                                <div>
                                  <span className="text-muted-foreground">
                                    Programado:
                                  </span>
                                  <p>
                                    {formatDateOnly(
                                      serviceItem.service.procedure.date
                                    )}
                                  </p>
                                </div>
                              )}
                              {serviceItem.service?.dueTo && (
                                <div>
                                  <span className="text-muted-foreground">
                                    Vence:
                                  </span>
                                  <p>
                                    {formatDateOnly(
                                      new Date(serviceItem.service.dueTo)
                                    )}
                                  </p>
                                </div>
                              )}
                              {serviceItem.service?.completedAt && (
                                <div>
                                  <span className="text-muted-foreground">
                                    Completado:
                                  </span>
                                  <p className="text-green-600">
                                    {formatDateOnly(
                                      new Date(serviceItem.service.completedAt)
                                    )}
                                  </p>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {serviceItem.service?.procedure?.price
                              ? formatCurrency(
                                  serviceItem.service.procedure.price
                                )
                              : "Precio no disponible"}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {!hasProducts && !hasServices && (
            <div className="text-center py-8 border rounded-lg bg-slate-50">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-1">
                No hay productos ni servicios
              </h3>
              <p className="text-muted-foreground">
                Esta factura no tiene productos ni servicios asociados.
              </p>
            </div>
          )}

          <Separator className="my-6" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                Facturado el {formatDateOnly(bill.date)}
              </span>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Total:</span>
              </div>
              <span className="text-2xl font-bold text-amber-700">
                {formatCurrency(bill.costTotal)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
