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
import { ArrowLeft, CheckCircle2, KeyRound, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

// Validación
const formSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
});

type FormValues = z.infer<typeof formSchema>;

interface PasswordRecoveryFormProps {
  onSubmit: (email: string) => Promise<void>;
}

export default function PasswordRecoveryForm({
  onSubmit,
}: PasswordRecoveryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(values.email);
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
            Recuperar contraseña
          </CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para restablecer tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-800">
                  ¡Correo enviado!
                </AlertTitle>
                <AlertDescription className="text-green-700">
                  Hemos enviado un correo electrónico con instrucciones para
                  recuperar tu contraseña. Por favor, revisa tu bandeja de
                  entrada.
                </AlertDescription>
              </Alert>
              <div className="text-center text-sm text-muted-foreground mt-4">
                ¿No recibiste el correo? Revisa tu carpeta de spam o{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal"
                  onClick={() => {
                    setIsSuccess(false);
                    form.reset();
                  }}
                >
                  intenta nuevamente
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Correo electrónico
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ejemplo@gmail.com"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
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
                    "Enviar instrucciones"
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
        Al continuar, se enviara un correo electrónico con las instrucciones
        para recuperar la contraseña de tu cuenta.
      </div>
    </div>
  );
}
