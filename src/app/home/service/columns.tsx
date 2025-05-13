"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DeleteServiceDialog from "./_components/service-delete";
import { IService } from "@/types/service-interface";
import { useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useImageUploadStore } from "../products/_components/imageUploadStore";
import { serviceService } from "@/services/service.service";
import { toast } from "sonner";

export const columns: ColumnDef<IService>[] = [
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
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "description",
    header: "Descripcion",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const currPath = usePathname();
      const element = row.original;
      const fileInputRef = useRef<HTMLInputElement>(null);
      const [progress, setProgress] = useState(0);
      const [isUploading, setIsUploading] = useState(false);
      const setUploadingId = useImageUploadStore(
        (state) => state.setUploadingId
      );

      const handleImage = async (
        service: IService,
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

        setUploadingId(service.id);
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

            service.imgUrl = data.secure_url;
            await serviceService.update(service.id, service);

            toast.success("Imagen subida con exito");
          } else {
            toast.error("Error al subir la imagen");
          }

          setUploadingId(null);
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
              <DeleteServiceDialog id={element.id} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleButtonClick();
              }}
            >
              <div className="grid gap-y-2">
                <div>Agregar imagen</div>

                {isUploading && (
                  <div className="flex items-center space-x-3">
                    <Progress value={progress} className="w-24" />
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                )}
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
