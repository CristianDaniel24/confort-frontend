"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  personFormDefinition,
  PersonFormType,
} from "@/lib/definitions/person-form-definition";

import { CalendarIcon, Car } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPerson } from "@/types/person-interface";
import { personService } from "@/services/person.service";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
      phone: values.phone,
      address: values.address,
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      password: values.password,
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
      <Link href="#" className="flex items-center  gap-2 mb-6 font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Car className="size-4" />
        </div>
        Tapiceria Confort.
      </Link>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Formulario de registro</CardTitle>
          <CardDescription>
            Formulario de registro de cuenta para la tapiceria confort =)
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-y-5"
          >
            <Tabs defaultValue="personal" className="w-[500px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Identidad</TabsTrigger>
                <TabsTrigger value="contact">Contactos</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="mt-6">
                <CardHeader className="mb-6">
                  <CardTitle>Identidad</CardTitle>
                  <CardDescription>
                    A continuacion ingresa tus datos de identidad basicos para
                    registrar tu cuenta. Haz clic en "Crear cuenta" cuando hayas
                    terminado de llenar todos los formularios.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primer nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu primer nombre"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="secondName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Segundo nombre (No obligatorio)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu segundo nombre"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primer apellido</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu primer apellido"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="secondLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Segundo apellido (No obligatorio)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu segundo apellido"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="document"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Documento</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu documento de identidad"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </TabsContent>

              <TabsContent value="contact">
                <CardHeader className="mb-6 mt-6">
                  <CardTitle>Contacto</CardTitle>
                  <CardDescription>
                    A continuacion ingresa tus datos de contacto para poder
                    contactar contigo de forma sencilla. Haz clic en "Crear
                    cuenta" cuando hayas terminado de llenar todos los
                    formularios.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu numero de telefono"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Direccion</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu direccion"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Fecha de cumpleaños</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>
                                      Selecciona tu fecha de cumpleaños
                                    </span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </CardContent>
              </TabsContent>

              <TabsContent value="security">
                <CardHeader className="mb-6 mt-6">
                  <CardTitle>Seguridad</CardTitle>
                  <CardDescription>
                    A continuacion ingresa tus datos sobre la seguridad y tu
                    correo para iniciar sesion para poder contactar contigo de
                    forma sencilla. Haz clic en "Crear cuenta" cuando hayas
                    terminado de llenar todos los formularios.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu correo electronico"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu constraseña"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repite tu contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa tu constraseña otra vez"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </TabsContent>
            </Tabs>
            <CardFooter className="flex justify-end space-x-5">
              <Button
                variant={"secondary"}
                type="button"
                onClick={() => router.push("/auth/signin")}
              >
                Cancelar
              </Button>
              <Button type="submit">Crear cuenta</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
