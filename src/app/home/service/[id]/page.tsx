import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { serviceService } from "@/services/service.service";
import {
  CalendarClock,
  CalendarDays,
  Car,
  CheckCircle2,
  ClipboardList,
  Clock,
  DollarSign,
  FileText,
  Hammer,
  PaintBucket,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const service = await serviceService.findById(+id);

  if (!service) {
    return (
      <div className="grid place-items-center h-[60vh]">
        <div className="text-center space-y-4">
          <ClipboardList className="h-16 w-16 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-medium">Servicio no encontrado</h3>
          <p className="text-muted-foreground">
            El servicio que buscas no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );
  }

  // Función para formatear la fecha
  const formatDate = (dateValue: string | number | null | undefined) => {
    if (!dateValue) return null;
    const date = new Date(dateValue);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Función para formatear el precio
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return null;
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Función para determinar el color del estado
  const getStatusColor = (status: string | null | undefined) => {
    if (!status) return "secondary";
    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("completado") ||
      statusLower.includes("finalizado") ||
      statusLower.includes("entregado")
    )
      return "success";
    if (statusLower.includes("pendiente")) return "warning";
    if (statusLower.includes("cancelado")) return "destructive";
    if (statusLower.includes("progreso") || statusLower.includes("proceso"))
      return "default";
    return "secondary";
  };

  // Calcular si el servicio está retrasado
  const isOverdue = () => {
    if (!service.dueTo || !service.status) return false;
    const dueDate = new Date(service.dueTo);
    const today = new Date();
    const statusLower = service.status.toLowerCase();
    return (
      today > dueDate &&
      !statusLower.includes("completado") &&
      !statusLower.includes("finalizado") &&
      !statusLower.includes("entregado")
    );
  };

  const statusColor = getStatusColor(service.status);
  const overdue = isOverdue();

  return (
    <div className="grid gap-y-5 p-4">
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-sky-50 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-center w-24 h-24">
              <Car className="h-16 w-16 text-sky-500" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-2xl font-bold">Servicio #{id}</h2>
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
                  {service.status || "Sin estado"}
                </Badge>
                {overdue && (
                  <Badge variant="destructive" className="md:ml-2">
                    <Clock className="h-3 w-3 mr-1" />
                    Retrasado
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-center md:justify-start mt-2 gap-2">
                {service.car && (
                  <Badge variant="outline" className="bg-sky-50">
                    <Car className="h-3 w-3 mr-1 text-sky-500" />
                    {service.car.plate || "Sin placa"}
                  </Badge>
                )}
                {service.procedure && (
                  <Badge variant="outline" className="bg-slate-50">
                    <Hammer className="h-3 w-3 mr-1 text-slate-500" />
                    {service.procedure.name || "Sin nombre"}
                  </Badge>
                )}
              </div>
              {service.dueTo && (
                <div className="mt-4 flex items-center justify-center md:justify-start text-sm text-slate-500">
                  <CalendarClock className="h-4 w-4 mr-1" />
                  Fecha estimada: {formatDate(service.dueTo)}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg text-slate-800 flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2 text-sky-500" />
                  Detalles del Servicio
                </h3>
                <Separator className="my-3" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-sky-50 p-2 rounded">
                      <CheckCircle2 className="h-5 w-5 text-sky-500" />
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
                        {service.status || "Sin estado"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-sky-50 p-2 rounded">
                      <CalendarClock className="h-5 w-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fecha estimada</p>
                      <p className="text-sm text-slate-600">
                        {formatDate(service.dueTo) || (
                          <span className="text-slate-400 italic">
                            Aún falta por llenar
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-sky-50 p-2 rounded">
                      <CalendarDays className="h-5 w-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fecha de entrega</p>
                      <p className="text-sm text-slate-600">
                        {formatDate(service.completedAt) || (
                          <span className="text-slate-400 italic">
                            Aún falta por llenar
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg text-slate-800 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-sky-500" />
                  Descripción
                </h3>
                <Separator className="my-3" />

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-line">
                    {service.description || (
                      <span className="text-slate-400 italic">
                        No hay descripción disponible para este servicio.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {service.car && (
                <div>
                  <h3 className="font-medium text-lg text-slate-800 flex items-center">
                    <Car className="h-5 w-5 mr-2 text-sky-500" />
                    Información del Vehículo
                  </h3>
                  <Separator className="my-3" />

                  <div className="bg-sky-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium flex items-center">
                          <PaintBucket className="h-4 w-4 mr-1 text-sky-600" />
                          Color
                        </p>
                        <p className="text-sm">
                          {service.car.color || (
                            <span className="text-slate-400 italic">
                              No especificado
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium flex items-center">
                          <Car className="h-4 w-4 mr-1 text-sky-600" />
                          Placa
                        </p>
                        <p className="text-sm">
                          {service.car.plate || (
                            <span className="text-slate-400 italic">
                              No especificada
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium flex items-center">
                          <Hammer className="h-4 w-4 mr-1 text-sky-600" />
                          Modelo
                        </p>
                        <p className="text-sm">
                          {service.car.typeCar?.model || (
                            <span className="text-slate-400 italic">
                              No especificado
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {service.procedure && (
                <div>
                  <h3 className="font-medium text-lg text-slate-800 flex items-center">
                    <Hammer className="h-5 w-5 mr-2 text-sky-500" />
                    Información del Procedimiento
                  </h3>
                  <Separator className="my-3" />

                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium flex items-center">
                          <ClipboardList className="h-4 w-4 mr-1 text-sky-600" />
                          Nombre
                        </p>
                        <p className="text-sm">
                          {service.procedure.name || (
                            <span className="text-slate-400 italic">
                              No especificado
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-sky-600" />
                          Precio
                        </p>
                        <p className="text-sm font-semibold text-sky-700">
                          {formatPrice(service.procedure.price) || (
                            <span className="text-slate-400 italic">
                              No especificado
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1 text-sky-600" />
                          Fecha del procedimiento
                        </p>
                        <p className="text-sm">
                          {formatDate(service.procedure.date) || (
                            <span className="text-slate-400 italic">
                              No especificada
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-sky-100 p-4 rounded-lg border border-sky-200">
                <h4 className="font-medium text-sky-700 mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Estado del Servicio
                </h4>
                <p className="text-sm text-slate-600">
                  {service.status ? (
                    <>
                      Este servicio se encuentra actualmente en estado{" "}
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
                        className="ml-1"
                      >
                        {service.status}
                      </Badge>
                    </>
                  ) : (
                    <span className="text-slate-400 italic">
                      El estado del servicio aún no ha sido definido.
                    </span>
                  )}
                </p>
                {service.dueTo && (
                  <p className="text-sm text-slate-600 mt-2">
                    {overdue ? (
                      <span className="text-red-600 font-medium">
                        Este servicio está retrasado. La fecha estimada de
                        entrega era el {formatDate(service.dueTo)}.
                      </span>
                    ) : (
                      <>
                        La fecha estimada de entrega es el{" "}
                        {formatDate(service.dueTo)}.
                      </>
                    )}
                  </p>
                )}
                {service.completedAt && (
                  <p className="text-sm text-slate-600 mt-2">
                    Este servicio fue completado el{" "}
                    {formatDate(service.completedAt)}.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
