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
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { IOrders } from "@/types/orders-interface";
import { toast } from "sonner";
import { billService } from "@/services/bill.service";

export const columns: ColumnDef<IOrders>[] = [
  {
    id: "client",
    header: "Cliente",
    accessorFn: (row) => {
      const person = row.shoppingCart.client.person;
      return `${person?.firstName ?? ""} ${person?.lastName ?? ""}`;
    },
    cell: ({ row }) => {
      const person = row.original.shoppingCart.client.person;
      if (!person)
        return <span className="text-muted-foreground">Sin cliente</span>;

      return (
        <div>
          {person.firstName} {person.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "shoppingCart.status",
    header: "Estado",
  },
  {
    accessorKey: "date",
    header: "Fecha del pedido",
    cell: ({ getValue }) => {
      const rawDate = getValue() as string;
      const date = new Date(rawDate);

      const formattedDate = date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const formattedTime = date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return (
        <div>
          <div>{formattedDate}</div>
          <div className="text-sm text-muted-foreground">{formattedTime}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "costTotal",
    header: "Costo total",
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
      const element = row.original;
      const currPath = usePathname();
      const router = useRouter();

      const handleConfirmOrder = async (orderId: number) => {
        try {
          await billService.confirmOrder(orderId);
          router.refresh();
          toast.success("Pedido confirmado con exito!");
        } catch {
          console.log("Hubo un error al confirmar el pedido");
          toast.error("Ocurrio un error con tu peticion");
        }
      };

      const handleCancelOrder = async (orderId: number) => {
        try {
          await billService.cancelOrder(orderId);
          router.refresh();
          toast.success("Pedido cancelado con exito!");
        } catch {
          console.log("Hubo un error al cancelar el pedido");
          toast.error("Ocurrio un error con tu peticion");
        }
      };

      const showOptions =
        element.shoppingCart.status === "CONFIRMADO" ||
        element.shoppingCart.status === "ACTIVO";

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
            {showOptions && (
              <>
                <DropdownMenuItem
                  onClick={() => handleConfirmOrder(element.id)}
                >
                  Pagar pedido
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCancelOrder(element.id)}>
                  Cancelar pedido
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
