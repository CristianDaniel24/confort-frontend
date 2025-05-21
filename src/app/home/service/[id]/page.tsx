import { Card } from "@/components/ui/card";
import { serviceService } from "@/services/service.service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const service = await serviceService.findById(+id);

  if (!service) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-2xl font-medium leading-none">
              Estado: {service.status ?? "Aún falta por llenar"}
            </h3>

            <p className="text-lg text-muted-foreground">
              Descripción: {service.description || "Aún falta por llenar"}
            </p>

            <p className="text-lg text-muted-foreground">
              Listo para:{" "}
              {service.dueTo
                ? new Date(service.dueTo).toLocaleDateString()
                : "Aún falta por llenar"}
            </p>

            <p className="text-lg text-muted-foreground">
              Completado el:{" "}
              {service.completedAt
                ? new Date(service.completedAt).toLocaleDateString()
                : "Aún falta por llenar"}
            </p>

            <p className="text-lg text-muted-foreground">
              Carro:{" "}
              {service.car
                ? `${service.car.color ?? "?"} - ${service.car.plate ?? "?"} ${
                    service.car.typeCar?.model ?? ""
                  }`
                : "Aún falta por llenar"}
            </p>

            <p className="text-lg text-muted-foreground">
              Procedimiento:{" "}
              {service.procedure
                ? `${service.procedure.name ?? "?"} - $${
                    service.procedure.price ?? "?"
                  }`
                : "Aún falta por llenar"}
            </p>

            <p className="text-lg text-muted-foreground">
              Fecha del procedimiento:{" "}
              {service.procedure?.date
                ? new Date(service.procedure.date).toLocaleDateString()
                : "Aún falta por llenar"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
