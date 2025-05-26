"use client";

import { Car } from "lucide-react";
import PasswordRecoveryForm from "./password-recovery-form";
import type { IRecoveryPassword } from "@/types/recoveryPassword-response-interface";
import { recoveryPasswordService } from "@/services/recoveryPassword.service";
import { toast } from "sonner";

export default function PasswordRecoveryPage() {
  const handlePasswordRecovery = async (email: string) => {
    try {
      const recoveryPassword: IRecoveryPassword = {
        email: email,
      };
      await recoveryPasswordService.postRecoveryPassword(recoveryPassword);
      toast.success("Correo enviado con exito!");
    } catch (error) {
      // Relanzamos el error para que el componente lo maneje
      console.log("Error al intentar recuperar la constraseña", error);
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
