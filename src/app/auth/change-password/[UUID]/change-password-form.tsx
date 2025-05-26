"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const passwordRegex = /^(?=(?:.*\d){2,})[A-Za-z\d.]{5,}$/;

// Validación de contraseñas
const formSchema = z
  .object({
    password: z.string().refine((val) => passwordRegex.test(val), {
      message:
        "Debes ingresar una contraseña valida, solo puedes ingresar letras(mayuscula o minuscula), numeros(1-9) y puntos(.) ",
    }),
    password2: z.string().trim(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Las contraseñas deben ser iguales",
    path: ["password2"],
  });

type FormValues = z.infer<typeof formSchema>;

interface PasswordChangeFormProps {
  onSubmit: (email: string) => Promise<void>;
}

export default function ChangePasswordForm({
  onSubmit,
}: PasswordChangeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      password2: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const cleanedPassword = values.password.trim();
      console.log("Contraseña nueva enviada al Backend", cleanedPassword);

      await onSubmit(cleanedPassword);
      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePage = () => {
    router.push("/auth/signin");
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl flex items-center justify-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            Cambia tu contraseña
          </CardTitle>
          <CardDescription>
            Ingresa una nueva contraseña para reestablecerla.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-800">
                  ¡Se ha cambiado tu contraseña!
                </AlertTitle>
                <AlertDescription className="text-green-700">
                  Hemos cambiado tu contraseña, ve al inicio de sesion e intenta
                  iniciar sesion de nuevo.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tu nueva contraseña"
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
                          placeholder="Ingresa tu nueva contraseña otra vez"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Cambiar tu contraseña"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <button
            onClick={handlePage}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio de sesión
          </button>
        </CardFooter>
      </Card>
      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Al continuar, se cambiara la contraseña de tu cuenta, despues de
        cambiarla intenta nuevamente iniciar sesion con tu nueva contraseña.
      </div>
    </div>
  );
}
