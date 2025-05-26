"use client";

import { Car } from "lucide-react";
import { toast } from "sonner";
import ChangePasswordForm from "./change-password-form";
import { IChangePassword } from "@/types/change-password-interface";
import { changePasswordService } from "@/services/changePassword.service";
import { useParams } from "next/navigation";

export default function ChangePassword() {
  const params = useParams();
  const uuid = params.UUID as string;

  const handlePasswordChange = async (newPassword: string) => {
    try {
      const changePassword: IChangePassword = {
        password: newPassword,
        code: uuid,
      };
      console.log("Codigo UUID enviado al Backend:", uuid);
      await changePasswordService.postChangePassword(changePassword);
      toast.success("Contraseña actualizada con éxito!");
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
        <ChangePasswordForm onSubmit={handlePasswordChange} />
      </div>
    </div>
  );
}
