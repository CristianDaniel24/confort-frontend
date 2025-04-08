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
import { productService } from "@/services/product-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  id: number;
}

export default function DeleteProductDialog({ id }: Readonly<Props>) {
  const router = useRouter();
  const handleDelete = async () => {
    const result = await productService.delete(id);
    if (result) {
      toast.success("Producto eliminado!");
      router.refresh();
    } else {
      toast.error("Uh oh! Something went wrong.", {
        description: "There was a problem with your request",
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
