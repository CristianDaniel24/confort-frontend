"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import {
  Search,
  PlusCircle,
  Wrench,
  Car,
  Calendar,
  Filter,
  Grid3X3,
  List,
  CheckCircle,
  Loader2,
  CarFront,
  Sparkles,
  CaptionsOff,
  ImageOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { sessionUtils } from "@/app/utils/session.utils";
import { useRouter } from "next/navigation";
import type { ICar } from "@/types/car-interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { carService } from "@/services/car.service";
import type { IProcedure } from "@/types/procedure-interface";
import { procedureService } from "@/services/procedure.service";
import { serviceService } from "@/services/service.service";
import type { IService } from "@/types/service-interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ServicesEcommerce() {
  const [procedures, setProcedures] = useState<IProcedure[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState<number | null>(null);

  const person = sessionUtils.getPersonFromSession();
  const [userCars, setUserCars] = useState<ICar[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<IProcedure | null>(
    null
  );
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [loadingCars, setLoadingCars] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const proceduresData = await procedureService.getAll();
        setProcedures(proceduresData);
      } catch (error) {
        toast.error("Error al cargar los servicios");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProcedures = procedures
    .filter((procedure) => {
      const matchesSearch = procedure.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const fetchUserCars = async () => {
    if (!person?.id) return [];
    setLoadingCars(true);
    try {
      const cars = await carService.getCarsByClientId(person.id);
      setUserCars(cars);
      return cars;
    } catch (error) {
      toast.error("No se pudieron cargar tus vehículos");
      return [];
    } finally {
      setLoadingCars(false);
    }
  };

  const handleRequestClick = async (procedure: IProcedure) => {
    setSelectedProcedure(procedure);
    setRequestingId(procedure.id);

    if (!person?.id) {
      router.push("/auth/signin");
      toast.error("Debes ingresar sesión primero!");
      return;
    }

    await fetchUserCars();
    setOpenDialog(true);
    setRequestingId(null);
  };

  const handleAddCar = () => {
    setOpenDialog(false);
    router.push("/shop/newCar");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCarId(null);
    setSelectedProcedure(null);
  };

  const handleConfirmRequest = async () => {
    if (!selectedCarId || !selectedProcedure) return;

    try {
      const payload: IService = {
        car: { id: selectedCarId } as ICar,
        procedure: { id: selectedProcedure.id } as IProcedure,
      };

      await serviceService.create(payload);
      handleCloseDialog();
      toast.success(
        "Servicio solicitado con éxito. Se verá reflejado en el carrito cuando sea aprobado por el administrador."
      );
    } catch (error) {
      toast.error("No se pudo asignar el servicio.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateValue: string | Date) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const ServiceCard = ({ procedure }: { procedure: IProcedure }) => {
    return (
      <Card className="group overflow-hidden border hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
        <div className="relative">
          <div className="relative w-full h-48 bg-muted overflow-hidden">
            {!imageError[procedure.id] && procedure.imgUrl ? (
              <Image
                src={procedure.imgUrl || "/placeholder.svg"}
                alt={procedure.name}
                fill
                className="object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                priority
                unoptimized
                onError={() =>
                  setImageError((prev) => ({
                    ...prev,
                    [procedure.id]: true,
                  }))
                }
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                <ImageOff className="w-12 h-12 mb-2" />
                <span className="text-sm">Sin imagen</span>
              </div>
            )}
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {procedure.name}
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(procedure.price)}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-2 h-10">
            {procedure.description || "Sin descripción disponible"}
          </p>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            className="w-full gap-2"
            onClick={() => handleRequestClick(procedure)}
            disabled={requestingId === procedure.id}
          >
            {requestingId === procedure.id ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                <Wrench className="h-4 w-4" />
                Solicitar servicio
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const ServiceListItem = ({ procedure }: { procedure: IProcedure }) => {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              {!imageError[procedure.id] && procedure.imgUrl ? (
                <Image
                  src={procedure.imgUrl || "/placeholder.svg"}
                  alt={procedure.name}
                  fill
                  className="object-contain bg-white"
                  unoptimized
                  onError={() =>
                    setImageError((prev) => ({
                      ...prev,
                      [procedure.id]: true,
                    }))
                  }
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Wrench className="w-8 h-8" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{procedure.name}</h3>
                  {procedure.typeProcedure && (
                    <Badge variant="outline" className="mt-1">
                      {procedure.typeProcedure.type}
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency(procedure.price)}
                  </div>
                  {procedure.status && (
                    <Badge
                      className={
                        procedure.status.toLowerCase().includes("disponible")
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {procedure.status}
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {procedure.description || "Sin descripción disponible"}
              </p>

              <div className="flex items-center justify-between">
                {procedure.date && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(procedure.date)}</span>
                  </div>
                )}

                <Button
                  onClick={() => handleRequestClick(procedure)}
                  disabled={requestingId === procedure.id}
                  className="gap-2"
                >
                  {requestingId === procedure.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    <>
                      <Wrench className="h-4 w-4" />
                      Solicitar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-muted-foreground">
        <Loader2 className="animate-spin w-12 h-12 mb-4 text-primary" />
        <h3 className="text-xl font-medium mb-2">Cargando servicios</h3>
        <p className="text-sm text-muted-foreground">
          Estamos preparando nuestro catálogo de servicios...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl mt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nuestros Servicios</h1>
        <p className="text-muted-foreground">
          Descubre nuestra amplia gama de servicios profesionales para tu
          vehículo
        </p>
      </div>

      {/* Filtros y controles */}
      <div className="bg-muted/30 p-4 rounded-lg mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar servicios..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-low">Precio: Menor a mayor</SelectItem>
                <SelectItem value="price-high">
                  Precio: Mayor a menor
                </SelectItem>
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-8" />

            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "grid" | "list")}
            >
              <TabsList>
                <TabsTrigger value="grid" className="gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  Cuadrícula
                </TabsTrigger>
                <TabsTrigger value="list" className="gap-2">
                  <List className="h-4 w-4" />
                  Lista
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {filteredProcedures.length} servicio(s) encontrado(s)
          {search && ` para "${search}"`}
        </p>
      </div>

      {/* Servicios */}
      {filteredProcedures.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-muted-foreground h-96 max-w-md mx-auto text-center">
          <div className="bg-muted/50 p-6 rounded-full mb-4">
            <CaptionsOff className="w-16 h-16" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            No se encontraron servicios
          </h3>
          <p className="text-muted-foreground mb-4">
            {search
              ? "Intenta ajustar tu búsqueda"
              : "No hay servicios disponibles en este momento"}
          </p>
          {search && (
            <Button variant="outline" onClick={() => setSearch("")}>
              Limpiar búsqueda
            </Button>
          )}
        </div>
      ) : (
        <Tabs value={viewMode} className="w-full">
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProcedures.map((procedure) => (
                <ServiceCard key={procedure.id} procedure={procedure} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredProcedures.map((procedure) => (
                <ServiceListItem key={procedure.id} procedure={procedure} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Diálogo de selección de vehículo */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Selecciona un vehículo
            </DialogTitle>
            <DialogDescription>
              {selectedProcedure && (
                <div className="mt-2">
                  <span className="font-medium">Servicio:</span>{" "}
                  {selectedProcedure.name} -{" "}
                  {formatCurrency(selectedProcedure.price)}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {loadingCars ? (
            <div className="py-6 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {userCars.length === 0 ? (
                <div className="space-y-4 text-center py-6">
                  <CarFront className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground mb-4">
                      No tienes vehículos registrados. Añade uno para continuar.
                    </p>
                    <Button onClick={handleAddCar} className="gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Añadir vehículo
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-3 py-4">
                    {userCars.map((car) => (
                      <div
                        key={car.id}
                        className={`border rounded-lg p-4 transition cursor-pointer flex items-center ${
                          selectedCarId === car.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => {
                          if (car.id !== undefined) setSelectedCarId(car.id);
                        }}
                      >
                        <div className="bg-muted rounded-full p-3 mr-4">
                          <CarFront
                            className={`h-6 w-6 ${
                              selectedCarId === car.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{car.plate}</h4>
                          <div className="grid grid-cols-2 gap-x-4 text-sm">
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Color:
                              </span>{" "}
                              {car.color}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Modelo:
                              </span>{" "}
                              {car.typeCar.model}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Año:
                              </span>{" "}
                              {car.typeCar.year}
                            </p>
                          </div>
                        </div>
                        {selectedCarId === car.id && (
                          <CheckCircle className="h-5 w-5 text-primary ml-2" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={handleAddCar}
                      size="sm"
                      className="gap-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Añadir otro vehículo
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" onClick={handleCloseDialog}>
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleConfirmRequest}
                        disabled={!selectedCarId}
                        className="gap-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        Solicitar servicio
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
