"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  loginFormDefinition,
  LoginFormType,
} from "@/lib/definitions/auth/login-form-definition";
import { ILogin } from "@/types/login-interface";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const login = {} as ILogin;

  const form = useForm<LoginFormType>(
    loginFormDefinition.asignDefaultValues(login)
  );

  const handleSubmit = () => {
    // Se le manda la peticion al service con los datos del formulario
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
          <CardDescription>
            Inicie sesion con su cuenta de Google o Correo electronico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid gap-y-5"
            >
              <div className="grid gap-6">
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo</FormLabel>
                          <FormControl>
                            <Input placeholder="m@ejemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                              <Input
                                placeholder=""
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Button type="submit" className="w-full">
                    Iniciar
                  </Button>
                </div>
                <div className="text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <a
                    href="/auth/signup"
                    className="underline underline-offset-4"
                  >
                    Crear cuenta
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Al hacer clic en iniciar, aceptas nuestros{" "}
        <a href="#">Terminos de servicio</a> y{" "}
        <a href="#">politica de privacidad</a>.
      </div>
    </div>
  );
}
