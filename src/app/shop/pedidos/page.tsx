"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Receipt, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { sessionUtils } from "@/app/utils/session.utils";
import { billService } from "@/services/bill.service";
import { IBill } from "@/types/bill-interface";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";

export default function Pedidos() {
  const [orders, setOrders] = useState<IBill[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const person = sessionUtils.getPersonFromSession();

      if (!person?.id) {
        router.push("/auth/signin");
        toast.error("Debes iniciar sesión para ver tus pedidos.");
        return;
      }

      try {
        // Obtener TODAS las facturas
        const allBills = await billService.getAll();

        // Filtrar facturas del cliente
        /* */
        const clientBills = allBills.filter(
          (bill: IBill) => bill.shoppingCart?.client?.person_id === person.id
        );

        if (clientBills.length === 0) {
          setOrders([]);
          return;
        }

        // Obtener los productos con nombre
        const res = await iAxios.get(
          `${utils.baseUrl}/shoppingCart-product/client/${person.id}`
        );

        const productMap = res.data.reduce((acc: any, item: any) => {
          acc[item.id] = item.product.name;
          return acc;
        }, {});

        // Enriquecer productos en cada factura
        const enrichedOrders = clientBills.map((bill) => ({
          ...bill,
          shoppingCart: {
            ...bill.shoppingCart,
            products: bill.shoppingCart.shoppingCartProduct.map((p: any) => ({
              ...p,
              name: productMap[p.id] || "Producto desconocido",
            })),
          },
        }));

        setOrders(enrichedOrders);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        toast.error("Ocurrió un error al obtener los pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-muted-foreground">
        <Loader2 className="animate-spin w-8 h-8" />
        <span className="ml-2">Cargando pedidos...</span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-muted-foreground h-96">
        <Receipt className="w-12 h-12 mb-2" />
        <p>Aún no tienes facturas registradas.</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      <h2 className="text-2xl font-bold mb-6">Mis pedidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Pedido #{order.id}</CardTitle>
              <CardDescription>
                Fecha: {new Date(order.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Total:{" "}
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(order.costTotal)}
              </p>
              <p className="text-sm">
                Estado: <Badge>{order.shoppingCart.status}</Badge>
              </p>
              <ul className="text-sm list-disc list-inside text-muted-foreground">
                {order.shoppingCart.shoppingCartProduct?.map((prod) => (
                  <li key={`${prod.product.id}-${prod.amount}`}>
                    {prod.product.name} x {prod.amount}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
