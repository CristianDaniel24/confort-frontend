import { Card } from "@/components/ui/card";
import { procedureService } from "@/services/procedure.service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProcedureDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const procedure = await procedureService.findById(+id);

  if (!procedure) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Estado: {procedure.status}
            </h3>
            <p className="text-xs text-muted-foreground">
              Descripcion: {procedure.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Fecha: {procedure.date}
            </p>
            <p className="text-xs text-muted-foreground">
              Tipo de procedimiento: {procedure.typeProcedure?.type}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
