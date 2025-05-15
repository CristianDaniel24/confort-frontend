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

    personService.create(person).then(() => {
      toast.success("Tu cuenta ha sido creada con éxito!");
      router.push("/auth/signin");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Link
            href="#"
            className="flex items-center gap-2 mb-2 font-medium text-primary hover:text-primary/90 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Car className="size-5" />
            </div>
            <span className="text-xl font-bold">Tapicería Confort</span>
          </Link>
          <p className="text-muted-foreground text-center max-w-md">
            Tu espacio de confort, nuestro compromiso de calidad.
          </p>
        </div>

        <Card className="w-full shadow-lg border-t-4 border-t-primary">
          <CardHeader className="text-center pb-4 border-b">
            <CardTitle className="text-2xl font-bold">Crea tu cuenta</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Completa el siguiente formulario para registrarte y comenzar a
              disfrutar de nuestros servicios personalizados.
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid gap-y-4"
            >
              <Tabs defaultValue="personal" className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-3 rounded-lg bg-muted/50 p-1">
                    <TabsTrigger
                      value="personal"
                      className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      Identidad
                    </TabsTrigger>
                    <TabsTrigger
                      value="contact"
                      className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      Contacto
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      Seguridad
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="personal" className="mt-4 space-y-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                        1
                      </span>
                      Información Personal
                    </CardTitle>
                    <CardDescription>
                      Ingresa tus datos de identidad básicos para comenzar con
                      tu registro.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primer nombre</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ingresa tu primer nombre"
                                className="focus-visible:ring-primary"
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
                            <FormLabel>
                              Segundo nombre{" "}
                              <span className="text-xs text-muted-foreground">
                                (Opcional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ingresa tu segundo nombre"
                                className="focus-visible:ring-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primer apellido</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ingresa tu primer apellido"
                                className="focus-visible:ring-primary"
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
                            <FormLabel>
                              Segundo apellido{" "}
                              <span className="text-xs text-muted-foreground">
                                (Opcional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ingresa tu segundo apellido"
                                className="focus-visible:ring-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="document"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Documento de identidad</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa tu documento de identidad"
                              className="focus-visible:ring-primary"
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
                  <CardHeader className="pb-2 mt-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                        2
                      </span>
                      Información de Contacto
                    </CardTitle>
                    <CardDescription>
                      Ingresa tus datos de contacto para una comunicación
                      efectiva.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa tu número de teléfono"
                              className="focus-visible:ring-primary"
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
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa tu dirección completa"
                              className="focus-visible:ring-primary"
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
                            <FormLabel>Fecha de nacimiento</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal border border-input hover:bg-muted/50",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>
                                        Selecciona tu fecha de nacimiento
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
                  <CardHeader className="pb-2 mt-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                        3
                      </span>
                      Credenciales de Acceso
                    </CardTitle>
                    <CardDescription>
                      Configura tu correo y contraseña para acceder a tu cuenta
                      de forma segura.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ejemplo@correo.com"
                              className="focus-visible:ring-primary"
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
                              placeholder="Mínimo 8 caracteres"
                              className="focus-visible:ring-primary"
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
                          <FormLabel>Confirmar contraseña</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Repite tu contraseña"
                              className="focus-visible:ring-primary"
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

              <CardFooter className="flex flex-col sm:flex-row items-center justify-between mt-6 px-6 pb-6 pt-2 gap-4">
                <div className="text-sm text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    href="/auth/signin"
                    className="text-primary hover:underline font-medium"
                  >
                    Iniciar sesión
                  </Link>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    variant={"outline"}
                    type="button"
                    className="flex-1 sm:flex-none"
                    onClick={() => router.push("/auth/signin")}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 sm:flex-none">
                    Crear cuenta
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Tapicería Confort © {new Date().getFullYear()} - Todos los derechos
            reservados
          </p>
        </div>
      </div>
    </div>
  );
}
