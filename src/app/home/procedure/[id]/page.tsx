"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { procedureService } from "@/services/procedure.service";
import {
  Calendar,
  ClipboardList,
  DollarSign,
  FileText,
  ImageOff,
  Info,
  Stethoscope,
  Tag,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProcedureDetails({ params }: Readonly<Props>) {
  const [procedure, setProcedure] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      const serv = await procedureService.findById(+id);
      setProcedure(serv);
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

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Función para determinar el color del estado
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("completado") ||
      statusLower.includes("finalizado")
    )
      return "success";
    if (statusLower.includes("pendiente")) return "warning";
    if (statusLower.includes("cancelado")) return "destructive";
    if (statusLower.includes("progreso") || statusLower.includes("proceso"))
      return "default";
    return "secondary";
  };

  if (loading) {
    return (
      <div className="grid gap-y-5 p-4">
        <Card className="shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 pb-6">
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

  if (!procedure) {
    return (
      <div className="grid place-items-center h-[60vh]">
        <div className="text-center space-y-4">
          <ClipboardList className="h-16 w-16 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-medium">Procedimiento no encontrado</h3>
          <p className="text-muted-foreground">
            El procedimiento que buscas no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );
  }

  const statusColor = getStatusColor(procedure.status);

  return (
    <div className="grid gap-y-5 p-4">
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-white shadow-sm border">
              {!imageError[procedure.id] && procedure.imgUrl ? (
                <Image
                  src={procedure.imgUrl || "/placeholder.svg"}
                  alt={procedure.name}
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                  onError={() =>
                    setImageError((prev) => ({
                      ...prev,
                      [procedure.id]: true,
                    }))
                  }
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400">
                  <Stethoscope className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-2xl font-bold">{procedure.name}</h2>
                <Badge
                  variant={
                    statusColor as
                      | "default"
                      | "destructive"
                      | "warning"
                      | "success"
                      | "outline"
                      | "secondary"
                  }
                  className="md:ml-2"
                >
                  {procedure.status}
                </Badge>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-2 gap-2">
                <Badge variant="outline" className="bg-purple-50">
                  <Tag className="h-3 w-3 mr-1 text-purple-500" />
                  {procedure.typeProcedure?.type || "Sin categoría"}
                </Badge>
                <Badge variant="outline" className="bg-slate-50">
                  <Calendar className="h-3 w-3 mr-1 text-slate-500" />
                  {formatDate(procedure.date)}
                </Badge>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-purple-600">
                  {formatPrice(procedure.price)}
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
                  <Info className="h-5 w-5 mr-2 text-purple-500" />
                  Detalles del Procedimiento
                </h3>
                <Separator className="my-3" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-50 p-2 rounded">
                      <Tag className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Tipo de procedimiento
                      </p>
                      <p className="text-sm text-slate-600">
                        {procedure.typeProcedure?.type || "No especificado"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-purple-50 p-2 rounded">
                      <Calendar className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fecha</p>
                      <p className="text-sm text-slate-600">
                        {formatDate(procedure.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-purple-50 p-2 rounded">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Precio</p>
                      <p className="text-sm text-slate-600">
                        {formatPrice(procedure.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-purple-50 p-2 rounded">
                      <ClipboardList className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Estado</p>
                      <Badge
                        variant={
                          statusColor as
                            | "default"
                            | "destructive"
                            | "warning"
                            | "success"
                            | "outline"
                            | "secondary"
                        }
                      >
                        {procedure.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg text-slate-800 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-purple-500" />
                  Descripción
                </h3>
                <Separator className="my-3" />

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-line">
                    {procedure.description ||
                      "No hay descripción disponible para este procedimiento."}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-700 mb-2 flex items-center">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Información del Procedimiento
                </h4>
                <p className="text-sm text-slate-600">
                  Este procedimiento fue registrado el{" "}
                  {formatDate(procedure.date)} y actualmente se encuentra en
                  estado{" "}
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  El costo total del procedimiento es de{" "}
                  {formatPrice(procedure.price)}.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
