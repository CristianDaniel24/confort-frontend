"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IProduct } from "@/types/product-interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DeleteProductDialog from "./_components/product-delete";
import { useRef, useState } from "react";
import { productService } from "@/services/product.service";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cost",
    header: "Costo",
  },
  {
    accessorKey: "code",
    header: "Codigo",
  },
  {
    accessorKey: "stock",
    header: "Cantidad",
  },
  {
    header: "Tipo de producto",
    id: "typeProduct",
    accessorFn: (row) => row.typeProduct,
    cell: ({ row }) => row.original.typeProduct?.type || "Sin tipo",
  },
  {
    header: "Proveedor",
    id: "provider",
    accessorFn: (row) => row.provider,
    cell: ({ row }) => {
      const provider = row.original.provider;
      return `${provider?.name ?? "Sin proveedor"} (${
        provider?.address ?? ""
      }) (${provider?.phone ?? ""})`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const element = row.original;
      const currPath = usePathname();
      const [progress, setProgress] = useState(0);
      const [isUploading, setIsUploading] = useState(false);
      const fileInputRef = useRef<HTMLInputElement>(null);

      const handleImage = async (
        product: IProduct,
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setProgress(0);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "confortUpload");
        formData.append("cloud_name", "ddgkelrey");
        formData.append("folder", "confort_images");

        const xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          "https://api.cloudinary.com/v1_1/ddgkelrey/image/upload"
        );

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
          }
        };

        xhr.onload = async () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            product.imgUrl = data.secure_url;
            await productService.update(product.id, product);

            toast.success("Imagen subida con exito");
          } else {
            toast.error("Error al subir la imagen");
          }

          setIsUploading(false);
          setProgress(0);
        };

        xhr.onerror = () => {
          toast.error("Error en la red");
          setIsUploading(false);
        };

        xhr.send(formData);
      };

      const handleButtonClick = () => {
        fileInputRef.current?.click();
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => router.push(`${currPath}/${element.id}`)}
            >
              Ver
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`${currPath}/edit/${element.id}`)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <DeleteProductDialog id={element.id} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleButtonClick();
              }}
            >
              <div className="grid gap-y-2">
                <div>Agregar imagen </div>
                <div className="flex space-x-3 align-middle">
                  <div className="flex-auto">
                    <Progress value={progress} />
                  </div>
                  <div>{progress}</div>
                </div>
              </div>
            </DropdownMenuItem>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImage(element, e);
              }}
              ref={fileInputRef}
              className="hidden"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
