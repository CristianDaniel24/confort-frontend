import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { providerService } from "@/services/provider.service";
import { Building2, Home, Phone, ShoppingBag } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProviderDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const provider = await providerService.findById(+id);

  if (!provider) {
    return null;
  }

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <div className="grid gap-y-5 p-4">
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-sm">
              <AvatarImage
                src={`/placeholder.svg?height=96&width=96&text=${getInitials(
                  provider.name
                )}`}
                alt={provider.name}
              />
              <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-600">
                {getInitials(provider.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{provider.name}</h2>
                <Badge variant="outline" className="ml-2 bg-indigo-50">
                  <ShoppingBag className="h-3 w-3 mr-1 text-indigo-500" />
                  Proveedor
                </Badge>
              </div>
              {/*<p className="text-sm text-slate-500 mt-1">ID: {id}</p>*/}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg text-slate-800 mb-3">
                Información de Contacto
              </h3>
              <Separator className="mb-4" />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 flex items-start gap-3">
                  <div className="mt-1">
                    <Home className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Dirección
                    </p>
                    <p className="text-sm text-slate-600">
                      {provider.address || "No especificada"}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 flex items-start gap-3">
                  <div className="mt-1">
                    <Phone className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Teléfono
                    </p>
                    <p className="text-sm text-slate-600">
                      {provider.phone || "No especificado"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg text-slate-800 mb-3">
                Información Adicional
              </h3>
              <Separator className="mb-4" />

              <div className="bg-indigo-50 rounded-lg p-4 flex items-start gap-3">
                <div className="mt-1">
                  <Building2 className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Sobre este proveedor
                  </p>
                  <p className="text-sm text-slate-600">
                    Proveedor registrado en el sistema. Para añadir más
                    información sobre este proveedor, edite su perfil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
