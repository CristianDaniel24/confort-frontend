"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IRol } from "@/types/rol-interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DeleteRolDialog from "./_components/rol-delete";

export const columns: ColumnDef<IRol>[] = [
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
    accessorKey: "salary",
    header: "Salario",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      const formatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(value);

      return <span>{formatted}</span>;
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
              onClick={() => router.push(`${currPath}/edit/${element.id}`)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <DeleteRolDialog id={element.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
