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
import DeleteEmployeeDialog from "./_components/employee-delete";
import { IEmployee } from "@/types/employee-interface";

export const columns: ColumnDef<IEmployee>[] = [
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
    accessorKey: "rol.name",
    header: "Rol",
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
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <DeleteEmployeeDialog id={element.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
