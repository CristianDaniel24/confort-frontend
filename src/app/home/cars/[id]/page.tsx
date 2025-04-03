import { Card } from "@/components/ui/card";
import { carService } from "@/services/car-service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CarDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const car = await carService.findById(+id);

  if (!car) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Name: {car.type}
            </h3>
            <p className="text-xs text-muted-foreground">Author: {car.color}</p>
            <p className="text-xs text-muted-foreground">
              Duration: {car.plate}
            </p>
            <p className="text-xs text-muted-foreground">
              Fecha de publicacion: {car.year_model}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
