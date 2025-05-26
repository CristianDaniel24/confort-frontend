import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { employeeService } from "@/services/employee.service";
import {
  Briefcase,
  Calendar,
  Home,
  Mail,
  Phone,
  UserCircle,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EmployeeDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const employee = await employeeService.findById(+id);

  if (!employee) {
    return null;
  }

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Formatear la fecha de cumpleaños
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="grid gap-y-5 p-4">
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-50 pb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-sm">
              <AvatarImage
                src={`/placeholder.svg?height=96&width=96&text=${getInitials(
                  employee.person.firstName
                )}`}
                alt={employee.person.firstName}
              />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {getInitials(employee.person.firstName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">
                {employee.person.firstName}
              </h2>
              <Badge variant="secondary" className="mt-1">
                <Briefcase className="h-3 w-3 mr-1" />
                {employee.rol?.name || "Sin rol asignado"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-slate-800">
                Información Personal
              </h3>
              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Documento</p>
                    <p className="text-sm text-slate-600">
                      {employee.person.document}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha de cumpleaños</p>
                    <p className="text-sm text-slate-600">
                      {formatDate(employee.person.dateOfBirth.toString())}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg text-slate-800">
                Información de Contacto
              </h3>
              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Teléfono</p>
                    <p className="text-sm text-slate-600">
                      {employee.person.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Correo electrónico</p>
                    <p className="text-sm text-slate-600">
                      {employee.person.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Dirección</p>
                    <p className="text-sm text-slate-600">
                      {employee.person.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
