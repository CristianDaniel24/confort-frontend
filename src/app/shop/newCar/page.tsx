"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { ITypeCar } from "@/types/typeCar-interface";
import { ICar } from "@/types/car-interface";

import { typeCarService } from "@/services/typeCar.service";
import { carService } from "@/services/car.service";
import { useRouter } from "next/navigation";
import { sessionUtils } from "@/app/utils/session.utils";
import {
  carFormDefinition,
  CarFormType,
} from "@/lib/definitions/car-form-definition";
import { IClient } from "@/types/client-interface";
import { toast } from "sonner";

export default function CarForm() {
  const form = useForm<CarFormType>(
    carFormDefinition.asignDefaultValues(carFormDefinition.defaultCar)
  );
  const [typeCars, setTypeCars] = useState<ITypeCar[]>([]);
  const [userCars, setUserCars] = useState<ICar[]>([]);
  const [person, setPerson] = useState<{ id: number } | null>(null);
  const router = useRouter();

  // Efecto 1: cargar usuario de la sesion SOLO en cliente
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = sessionUtils.getPersonFromSession();
    setPerson(p);
  }, []);

  // Efecto 2: cuando person cambie (de null → {id}), traemos los carros
  useEffect(() => {
    if (!person?.id) return;
    carService
      .getCarsByClientId(person.id)
      .then(setUserCars)
      .catch((error) => console.log("Error al obtener los carros", error));
  }, [person]);

  // — Carga tipos de carro
  useEffect(() => {
    typeCarService.getAll().then(setTypeCars);
  }, []);

  const onSubmit = async (data: CarFormType) => {
    if (!person) {
      toast.error("Debes iniciar sesion primero.");
      router.push("auth/signin");
    }

    const selectedTypeCar = typeCars.find((t) => t.id === data.typeCar);

    if (!selectedTypeCar || !person?.id) {
      toast.error("Información incompleta. No se puede registrar el carro.");
      console.error("No se encontro el id del usuario");
      return;
    }

    const car: ICar = {
      color: data.color,
      plate: data.plate,
      typeCar: { id: selectedTypeCar.id } as ITypeCar,
      client: { id: person.id } as IClient,
    };

    console.log("Carro formulario:", car);
    try {
      await carService.create(car);
      toast.success("Carro registrado exitosamente.");
      router.push("/shop/servicesConfort");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar el carro.");
    }
  };
  useEffect(() => {
    const personcookie = sessionUtils.getPersonFromSession();
    setPerson(personcookie);

    if (person) {
      carService
        .getCarsByClientId(person.id)
        .then(setUserCars)
        .catch((error) => console.log("Error al obtener los carros", error));
    }
  }, []);

  useEffect(() => {
    typeCarService.getAll().then(setTypeCars);
  }, []);
  return (
    <div className="max-w-md mx-auto p-6 mt-30">
      {/*Mostrar los carros del cliente*/}
      {userCars.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Tus Carros Registrados</h2>
          <ul className="space-y-2">
            {userCars.map((car) => (
              <li key={car.plate} className="p-3 border rounded-md shadow-sm">
                <p>
                  <strong>Placa:</strong> {car.plate}
                </p>
                <p>
                  <strong>Color:</strong> {car.color}
                </p>
                <p>
                  <strong>Modelo:</strong> {car.typeCar?.model}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mb-6 text-gray-500">No tienes carros registrados.</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Registrar Carro Nuevo</h2>
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Rojo, Azul, Negro..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa</FormLabel>
                <FormControl>
                  <Input placeholder="ABC123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeCar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Carro</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un tipo de carro"></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {typeCars.map((typeCar) => (
                      <SelectItem
                        key={typeCar.id}
                        value={typeCar.id.toString()}
                      >
                        {typeCar.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Registrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
