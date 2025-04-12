"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  personFormDefinition,
  PersonFormType,
} from "@/lib/definitions/person-form-definition";

import { Car } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPerson } from "@/types/person-interface";
import { personService } from "@/services/person-service";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup() {
  const form = useForm<PersonFormType>(
    personFormDefinition.asignDefaultValues(personFormDefinition.defaultPerson)
  );
  const router = useRouter();

  const handleSubmit = (values: PersonFormType) => {
    const person = {
      firstName: values.firstName,
      secondName: values.secondName,
      lastName: values.lastName,
      secondLastName: values.secondLastName,
      document: values.document,
      email: values.email,
      phone: values.phone,
      address: values.address,
      dateOfBirth: Number(values.dateOfBirth),
    } as IPerson;

    personService
      .create(person)
      .then(() => {
        toast.success("Tu cuenta ha sido creada con exito!");
        router.push("/auth/signin");
      })
      .catch(() => {
        toast.error("Ho algo salio mal", {
          description: "Hubo un problema con tu solicitud",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 ">
      <Card>
        <CardHeader className="text-center">
          <div className="flex w-[800px] flex-col gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 self-center font-medium"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Car className="size-4" />
              </div>
              Tapiceria Confort.
            </Link>
          </div>
          <CardTitle className="text-xl">Formulario de registro</CardTitle>
          <CardDescription>
            Formulario de registro de cuenta para la tapiceria confort =)
          </CardDescription>
        </CardHeader>

        <form action=""></form>
        <Tabs defaultValue="personal" className="w-[800px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Identidad</TabsTrigger>
            <TabsTrigger value="contact">Contactos</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <CardHeader>
              <CardTitle>Identidad</CardTitle>
              <CardDescription>
                A continuacion ingresa tus datos de identidad basicos para
                registrar tu cuenta. Haz clic en "Crear cuenta" cuando hayas
                terminado de llenar todos los formularios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="firstName">Primer nombre</Label>
                <Input id="firstName" defaultValue="" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="secondName">
                  Segundo nombre (No obligatorio)
                </Label>
                <Input id="secondName" defaultValue="" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Primer apellido</Label>
                <Input id="lastName" defaultValue="" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="secondLastName">
                  Segundo apellido (No obligatorio)
                </Label>
                <Input id="secondLastName" defaultValue="" />
                <div className="space-y-1">
                  <Label htmlFor="document">Documento</Label>
                  <Input id="document" defaultValue="" />
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="contact">
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
              <CardDescription>
                A continuacion ingresa tus datos de contacto para poder
                contactar contigo de forma sencilla. Haz clic en "Crear cuenta"
                cuando hayas terminado de llenar todos los formularios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="phone">Telefono</Label>
                <Input id="phone" name="phone" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="address">Direccion</Label>
                <Input id="address" name="address" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="dateOfBirth">Fecha de cumpleaños</Label>
                <Input id="dateOfBirth" type="date" />
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="security">
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>
                A continuacion ingresa tus datos sobre la seguridad y tu correo
                para iniciar sesion para poder contactar contigo de forma
                sencilla. Haz clic en "Crear cuenta" cuando hayas terminado de
                llenar todos los formularios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Repite tu contraseña</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end space-x-5">
                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={() => router.push("/auth/signin")}
                >
                  Cancelar
                </Button>
              </div>
              <Button type="submit">Crear cuenta</Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
