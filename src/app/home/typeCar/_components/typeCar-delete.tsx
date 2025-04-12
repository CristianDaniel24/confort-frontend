import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { typeCarService } from "@/services/typeCar-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  id: number;
}

export default function DeleteTypeCarDialog({ id }: Readonly<Props>) {
  const router = useRouter();
  const handleDelete = async () => {
    const result = await typeCarService.delete(id);
    if (result) {
      toast.success("Tipo de carro eliminado!");
      router.refresh();
    } else {
      toast.error("Uh oh! algo salio mal.", {
        description: "Hubo un problema con tu solicitud.",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <span>Eliminar</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Estas seguro/a que lo deseas eliminar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion no se puede deshacer, se eliminara permanentemente y se
            eliminara de la base de datos a menos que restauren lo datos con una
            copia de seguridad..
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
