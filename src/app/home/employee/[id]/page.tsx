import { Card } from "@/components/ui/card";
import { employeeService } from "@/services/employee.service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EmployeeDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const employee = await employeeService.findById(+id);

  if (!employee) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Nombre: {employee.person.firstName}
            </h3>
            <p className="text-xs text-muted-foreground">
              Documento: {employee.person.document}
            </p>
            <p className="text-xs text-muted-foreground">
              Telefono: {employee.person.phone}
            </p>
            <p className="text-xs text-muted-foreground">
              Direccion: {employee.person.address}
            </p>
            <p className="text-xs text-muted-foreground">
              Correo electronico: {employee.person.email}
            </p>
            <p className="text-xs text-muted-foreground">
              Fecha de cumpleaños: {employee.person.dateOfBirth.toString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Rol: {employee.rol?.name}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
