import { Card } from "@/components/ui/card";
import { providerService } from "@/services/provider-service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProviderDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const provider = await providerService.findById(+id);

  if (!provider) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Nombre: {provider.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Correo: {provider.address}
            </p>
            <p className="text-xs text-muted-foreground">
              Telefono: {provider.phone}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
