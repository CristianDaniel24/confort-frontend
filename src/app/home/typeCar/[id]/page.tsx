import { Card } from "@/components/ui/card";
import { typeCarService } from "@/services/typeCar-service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TypeCarDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const typeCar = await typeCarService.findById(+id);

  if (!typeCar) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Modelo: {typeCar.model}
            </h3>
            <p className="text-xs text-muted-foreground">
              Año: {new Date(typeCar.year).getFullYear()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
