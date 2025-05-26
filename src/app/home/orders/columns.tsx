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
import { toast } from "sonner";
import { billService } from "@/services/bill.service";
import { ConfirmOrderDialog } from "./_components/ConfirmOrderDialog";
import { useState } from "react";
import { IPayment } from "@/types/payment-interface";
import { IBill } from "@/types/bill-interface";

export const columns: ColumnDef<IBill>[] = [
  {
    accessorKey: "id",
    header: "N° Pedido",
    enableSorting: true,
    sortDescFirst: true,
    cell: ({ getValue }) => (
      <span className="font-medium">#{getValue() as number}</span>
    ),
  },
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

      const [dialogOpen, setDialogOpen] = useState(false);
      const [selectedOrderId, setSelectedOrderId] = useState<number | null>(
        null
      );

      const openPaymentDialog = (orderId: number) => {
        setSelectedOrderId(orderId);
        setDialogOpen(true);
      };

      const handleDialogConfirm = async (paymentMethod: string) => {
        if (!selectedOrderId) return;
        try {
          const payment: IPayment = {
            method: paymentMethod,
          };

          await billService.confirmOrder(selectedOrderId, payment);
          toast.success("Pedido confirmado con éxito");
          window.location.reload();
        } catch (error) {
          toast.error("Error al confirmar el pedido");
        } finally {
          setDialogOpen(false);
        }
      };

      const handleCancelOrder = async (orderId: number) => {
        try {
          await billService.cancelOrder(orderId);
          router.refresh();
          toast.success("Pedido cancelado con éxito");
          router.push("/home/orders");
        } catch {
          toast.error("Error al cancelar el pedido");
        }
      };

      const showOptions =
        element.shoppingCart.status === "CONFIRMADO" ||
        element.shoppingCart.status === "ACTIVO";

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`${currPath}/${element.id}`)}
                className="cursor-pointer"
              >
                Ver
              </DropdownMenuItem>
              {showOptions && (
                <>
                  <DropdownMenuItem
                    onClick={() => openPaymentDialog(element.id)}
                    className="cursor-pointer"
                  >
                    Pagar pedido
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleCancelOrder(element.id)}
                    className="cursor-pointer"
                  >
                    Cancelar pedido
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ConfirmOrderDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={handleDialogConfirm}
          />
        </>
      );
    },
  },
];
