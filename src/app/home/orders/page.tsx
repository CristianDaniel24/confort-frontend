"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { IBill } from "@/types/bill-interface";
import { orderService } from "@/services/orders.service";
import { Loader2 } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState<IBill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAll();
        setOrders(response);
      } catch (error) {
        console.error("Error al cargar pedidos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de Pedidos:</h1>
      <DataTable<IBill, unknown> columns={columns} data={orders} />
    </div>
  );
}
