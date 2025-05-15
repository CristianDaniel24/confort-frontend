import LoginForm from "@/components/layout/auth/login-form";
import { Car } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo y título */}
        <div className="flex flex-col items-center mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 mb-2 font-medium text-primary hover:text-primary/90 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Car className="size-5" />
            </div>
            <span className="text-xl font-bold">Tapicería Confort</span>
          </Link>
          <p className="text-muted-foreground text-center">
            Tu espacio de confort, nuestro compromiso de calidad.
          </p>
        </div>

        {/* Contenedor principal */}
        <div className="w-full bg-background rounded-lg border border-border shadow-lg overflow-hidden border-t-4 border-t-primary">
          <div className="px-6 pt-6 pb-2 text-center border-b">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Bienvenido de nuevo
            </h1>
            <p className="text-muted-foreground text-sm">
              Inicia sesión para acceder a tu cuenta
            </p>
          </div>

          <div className="p-6">
            <LoginForm />

            {/* Registro y recuperación */}
            <div className="mt-6 pt-6 border-t flex flex-col space-y-4 text-center text-sm">
              <p className="text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/auth/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Regístrate ahora
                </Link>
              </p>
              <Link
                href="/auth/forgot-password"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Tapicería Confort © {new Date().getFullYear()} - Todos los derechos
            reservados
          </p>
        </div>

        {/* Ayuda o contacto */}
        <div className="mt-4 flex items-center justify-center space-x-4">
          <Link
            href="/ayuda"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Ayuda
          </Link>
          <span className="text-muted-foreground text-xs">•</span>
          <Link
            href="/contacto"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Contacto
          </Link>
          <span className="text-muted-foreground text-xs">•</span>
          <Link
            href="/politica-privacidad"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacidad
          </Link>
        </div>
      </div>
    </div>
  );
}
