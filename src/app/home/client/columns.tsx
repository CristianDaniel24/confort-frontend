"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { IClient } from "@/types/client-interface";

export const columns: ColumnDef<IClient>[] = [
  {
    accessorFn: (row) =>
      `${row.person.firstName} ${row.person.secondName ?? ""} ${
        row.person.lastName
      } ${row.person.secondLastName ?? ""}`,
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
    id: "firstName",
  },
  {
    accessorKey: "person.document",
    header: "Documento",
  },
  {
    accessorKey: "person.phone",
    header: "Telefono",
  },
  {
    accessorKey: "person.address",
    header: "Direccion",
  },
  {
    accessorKey: "person.email",
    header: "Correo electronico",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"></DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
