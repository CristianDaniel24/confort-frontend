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
      const currPath = usePathname();
      const element = row.original;

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
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(element.id.toString())
              }
            ></DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <DeleteProductDialog id={element.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
