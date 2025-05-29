"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  KeyRound,
  MapPin,
  Phone,
  Save,
  User,
  UserCircle,
  X,
} from "lucide-react";
import {
  employeeFormDefinition,
  EmployeeFormType,
} from "@/lib/definitions/employee-form-definition";
import { cn } from "@/lib/utils";
import { IEmployee } from "@/types/employee-interface";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { IPerson } from "@/types/person-interface";
import {
  employeeEditFormDefinition,
  EmployeeEditFormType,
} from "./employee-edit-form-definition";

interface Props {
  employee: IEmployee;
  onSubmit: (value: EmployeeEditFormType) => void;
}

export default function EmployeeFormEditAccount({
  employee,
  onSubmit,
}: Readonly<Props>) {
  const form = useForm<EmployeeEditFormType>(
    employeeEditFormDefinition.asignDefaultValues(employee)
  );

  const router = useRouter();

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-inherit">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <UserCircle className="h-6 w-6 text-primary" />
          Editar Perfil
        </CardTitle>
        <CardDescription>
          Actualiza tu información personal y datos de contacto
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium flex items-center mb-4">
                <User className="mr-2 h-5 w-5 text-primary/80" />
                Información Personal
              </h3>
              <Separator className="mb-4" />

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
                          {...field}
                          className="bg-slate-50 focus-visible:bg-white transition-colors"
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
                        <span className="text-muted-foreground text-xs">
                          (Opcional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu segundo nombre"
                          {...field}
                          className="bg-slate-50 focus-visible:bg-white transition-colors"
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
                          className="bg-slate-50 focus-visible:bg-white transition-colors"
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
                        <span className="text-muted-foreground text-xs">
                          (Opcional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu segundo apellido"
                          {...field}
                          className="bg-slate-50 focus-visible:bg-white transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document"
                  disabled={true}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento de identidad</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu documento de identidad"
                          {...field}
                          className="bg-slate-50 focus-visible:bg-white transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de nacimiento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-slate-50 hover:bg-slate-100",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? format(field.value, "PPP")
                                : "Selecciona tu fecha de nacimiento"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  disabled={true}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu documento de identidad"
                          {...field}
                          className="bg-slate-50 focus-visible:bg-white transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium flex items-center mb-4">
                <MapPin className="mr-2 h-5 w-5 text-primary/80" />
                Información de Contacto
              </h3>
              <Separator className="mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        Teléfono
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu número de teléfono"
                          {...field}
                          className="bg-slate-50 focus-visible:bg-white transition-colors"
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
                      <FormLabel className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        Dirección
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu dirección"
                          {...field}
                          className="bg-slate-50 focus-visible:bg-white transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
                className="gap-2 cursor-pointer"
              >
                <X className="h-4 w-4 " />
                Cancelar
              </Button>
              <Button type="submit" className="gap-2 cursor-pointer">
                <Save className="h-4 w-4 " />
                Guardar cambios
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
