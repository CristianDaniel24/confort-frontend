"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IProcedure } from "@/types/procedure-interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DeleteBookDialog from "./_components/procedure-delete";

export const columns: ColumnDef<IProcedure>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripcion",
  },
  {
    header: "Tipo de procedimiento",
    id: "typeProcedure",
    accessorFn: (row) => row.typeProcedure,
    cell: ({ row }) => row.original.typeProcedure?.type || "Sin tipo",
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
              <DeleteBookDialog id={element.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
