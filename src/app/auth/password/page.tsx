"use client";

import { Car } from "lucide-react";
import PasswordRecoveryForm from "./password-recovery-form";

export default function PasswordRecoveryPage() {
  // Esta función sería la que conecta con tu backend
  const handlePasswordRecovery = async (email: string) => {
    try {
      // Aquí realizarías la llamada a tu API
      const response = await fetch("/api/auth/recover-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al procesar la solicitud");
      }

      // Si todo sale bien, no necesitamos hacer nada más aquí
      // El componente mostrará el mensaje de éxito
    } catch (error) {
      // Relanzamos el error para que el componente lo maneje
      throw error;
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Car className="size-4" />
          </div>
          Tapiceria Confort.
        </a>
        <PasswordRecoveryForm onSubmit={handlePasswordRecovery} />
      </div>
    </div>
  );
}
