import { Card } from "@/components/ui/card";
import { serviceService } from "@/services/service-service";

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
            <h3 className="text-xl font-medium leading-none">
              Nombre: {service.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Precio: {service.price}
            </p>
            <p className="text-xs text-muted-foreground">
              Estado: {service.status}
            </p>
            <p className="text-xs text-muted-foreground">
              Descripcion: {service.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Fecha de inicio: {service.dueTo}
            </p>
            <p className="text-xs text-muted-foreground">
              Fecha de completado: {service.completedAt}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
