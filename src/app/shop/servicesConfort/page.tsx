"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { IService } from "@/types/service-interface";
import { serviceService } from "@/services/service.service";
import { CaptionsOff, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sessionUtils } from "@/app/utils/session.utils";
import { useRouter } from "next/navigation";
import { ICar } from "@/types/car-interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { carService } from "@/services/car.service";

export default function ServicesEcommer() {
  const [services, setServices] = useState<IService[]>([]);
  const [search, setSearch] = useState("");
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const person = sessionUtils.getPersonFromSession();
  const [userCars, setUserCars] = useState<ICar[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      const data = await serviceService.getAll();
      setServices(data);
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchUserCars = async (): Promise<ICar[]> => {
    if (!person?.id) return [];
    try {
      return await carService.getCarsByClientId(person.id);
    } catch (error) {
      console.error("Error al obtener carros:", error);
      return [];
    }
  };

  const handleRequestClick = async (service: IService) => {
    setSelectedService(service);
    if (!person?.id) {
      router.push("/auth/signin");
      toast.error("Debes ingresar sesión primero!");
      return;
    }
    const cars = await fetchUserCars();
    setUserCars(cars);
    setOpenDialog(true);
  };

  const handleAddCar = () => {
    router.push("/shop/newCar");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCarId(null);
    setSelectedService(null);
  };

  const handleConfirmRequest = async () => {
    if (!selectedCarId || !selectedService) return;

    try {
      // Reemplaza esta lógica con tu llamada real al backend
      toast.success(
        `Servicio "${selectedService.name}" asignado al carro con ID ${selectedCarId}`
      );
      handleCloseDialog();
    } catch (error) {
      console.error("Error al asignar servicio:", error);
      toast.error("No se pudo asignar el servicio.");
    }
  };

  return (
    <div className="p-6 mt-20">
      <div className="mb-6">
        <Input
          placeholder="Buscar servicio por nombre..."
          className="w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-muted-foreground h-96">
          <CaptionsOff className="w-12 h-12 mb-2" />
          <p>No hay servicios disponibles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(service.price)}
                </CardDescription>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!imageError[service.id] && service.imgUrl ? (
                  <div className="relative w-full h-60 rounded overflow-hidden">
                    <Image
                      src={service.imgUrl}
                      alt={service.name}
                      fill
                      className="object-contain bg-white"
                      priority
                      unoptimized
                      onError={() =>
                        setImageError((prev) => ({
                          ...prev,
                          [service.id]: true,
                        }))
                      }
                    />
                  </div>
                ) : (
                  <div className="w-full h-60 flex flex-col items-center justify-center border rounded bg-muted text-muted-foreground gap-2">
                    <ImageOff className="w-10 h-10" />
                    <span>Sin imagen</span>
                  </div>
                )}
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => handleRequestClick(service)}
                >
                  Solicitar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccione un carro</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end mb-4">
            <Button
              onClick={handleAddCar}
              variant="link"
              className="cursor-pointer"
            >
              Agregar otro carro
            </Button>
          </div>
          {userCars.length === 0 ? (
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground">
                No tienes carros agregados.
              </p>
              <Button onClick={handleAddCar} className="cursor-pointer">
                Agregar un carro
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userCars.map((car) => (
                  <div
                    key={car.id}
                    className={`border rounded-xl shadow-sm p-4 transition cursor-pointer ${
                      selectedCarId === car.id
                        ? "bg-primary text-white"
                        : "bg-muted hover:shadow-md"
                    }`}
                    onClick={() => {
                      if (car.id !== undefined) setSelectedCarId(car.id);
                    }}
                  >
                    <h4 className="font-semibold text-lg mb-2">{car.plate}</h4>
                    <p>
                      <span className="font-medium">Color:</span> {car.color}
                    </p>
                    <p>
                      <span className="font-medium">Tipo:</span>{" "}
                      {car.typeCar.model}
                    </p>
                    <p>
                      <span className="font-medium">Año:</span>{" "}
                      {car.typeCar.year}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-4">
                <Button
                  onClick={handleConfirmRequest}
                  disabled={!selectedCarId}
                  className="cursor-pointer"
                >
                  Confirmar solicitud
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
