"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Receipt,
  Loader2,
  Package,
  Calendar,
  Clock,
  CheckCircle,
  ShoppingBag,
  Wrench,
  Car,
  X,
  Tag,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { sessionUtils } from "@/app/utils/session.utils";
import { billService } from "@/services/bill.service";
import type { IBill } from "@/types/bill-interface";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Pedidos() {
  const [orders, setOrders] = useState<IBill[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [viewMode, setViewMode] = useState<"cards" | "list">("list");
  const router = useRouter();

  const fetchOrders = async () => {
    const person = sessionUtils.getPersonFromSession();

    if (!person?.id) {
      router.push("/auth/signin");
      toast.error("Debes iniciar sesión para ver tus pedidos.");
      return;
    }

    try {
      setLoading(true);
      const res = await billService.getBillByClientId(person.id);

      const sortedOrders = (res ?? []).sort(
        (a: IBill, b: IBill) => b.id - a.id
      );

      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    } catch (error) {
      toast.error("Ocurrió un error al obtener los pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    if (statusFilter !== "todos") {
      filtered = filtered.filter(
        (order) => order.shoppingCart.status === statusFilter
      );
    }

    filtered = filtered.sort((a: IBill, b: IBill) => b.id - a.id);

    setFilteredOrders(filtered);
  }, [statusFilter, orders]);

  const handleCancelOrder = async (orderId: number) => {
    try {
      setCancellingId(orderId);
      await billService.cancelOrder(orderId);
      toast.success("Pedido cancelado con éxito!");
      await fetchOrders();
    } catch {
      toast.error("Ocurrió un error con tu petición");
    } finally {
      setCancellingId(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();

    if (statusLower === "confirmado") {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
          <Clock className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      );
    } else if (statusLower === "cancelado") {
      return (
        <Badge
          variant="destructive"
          className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200"
        >
          <X className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      );
    } else if (statusLower === "entregado" || statusLower === "completado") {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      );
    } else if (statusLower === "en proceso") {
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
          <Clock className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      );
    } else {
      return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getOrderTypeIcon = (order: IBill) => {
    const hasProducts = order.shoppingCart.shoppingCartProduct?.length > 0;
    const hasServices = order.shoppingCart.shoppingCartServices?.length > 0;

    if (hasProducts && hasServices) {
      return (
        <div className="flex -space-x-2">
          <div className="z-10 bg-blue-100 p-2 rounded-full">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="bg-amber-100 p-2 rounded-full">
            <Wrench className="h-5 w-5 text-amber-600" />
          </div>
        </div>
      );
    } else if (hasProducts) {
      return (
        <div className="bg-blue-100 p-2 rounded-full">
          <Package className="h-5 w-5 text-blue-600" />
        </div>
      );
    } else if (hasServices) {
      return (
        <div className="bg-amber-100 p-2 rounded-full">
          <Wrench className="h-5 w-5 text-amber-600" />
        </div>
      );
    } else {
      return (
        <div className="bg-gray-100 p-2 rounded-full">
          <ShoppingBag className="h-5 w-5 text-gray-600" />
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-muted-foreground">
        <Loader2 className="animate-spin w-12 h-12 mb-4 text-primary" />
        <h3 className="text-xl font-medium mb-2">Cargando pedidos</h3>
        <p className="text-sm text-muted-foreground">
          Estamos obteniendo tu historial de pedidos...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-muted-foreground h-[70vh] max-w-md mx-auto text-center p-6">
        <div className="bg-muted/50 p-6 rounded-full mb-4">
          <Receipt className="w-16 h-16 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">No tienes pedidos</h3>
        <p className="text-muted-foreground mb-6">
          Aún no has realizado ningún pedido. Explora nuestros productos y
          servicios para comenzar.
        </p>
        <Button className="gap-2">
          <ShoppingBag className="h-4 w-4" />
          Explora nuestros servicios y productos
        </Button>
      </div>
    );
  }

  const uniqueStatuses = [
    ...new Set(orders.map((order) => order.shoppingCart.status)),
  ];

  function formatStatus(status: string): string {
    const lower = status.toLowerCase().replace(/_/g, " ");
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl mt-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold group:text-primary mb-2">
            Mis pedidos
          </h2>
          <p className="text-muted-foreground">
            Historial de tus pedidos y su estado actual
          </p>
        </div>
      </div>

      <Tabs
        value={viewMode}
        onValueChange={(value) => setViewMode(value as "cards" | "list")}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Filtro de estados a la izquierda */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                {uniqueStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {formatStatus(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabs de vista a la derecha */}
          <TabsList>
            <TabsTrigger value="cards" className="gap-2">
              <Package className="h-4 w-4" />
              Tarjetas
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <Receipt className="h-4 w-4" />
              Lista
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Contenido de los tabs */}
        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all duration-200"
              >
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {getOrderTypeIcon(order)}
                      <div>
                        <CardTitle className="text-lg">
                          Pedido #{order.id}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(order.date)}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(order.shoppingCart.status)}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Total del pedido:
                      </span>
                      <span className="text-lg font-bold group:text-primary flex items-center">
                        {formatCurrency(order.costTotal)}
                      </span>
                    </div>

                    <Separator />

                    {order.shoppingCart.shoppingCartProduct.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Package className="h-4 w-4 text-blue-600" />
                          Productos (
                          {order.shoppingCart.shoppingCartProduct.length})
                        </h4>
                        <ul className="space-y-1.5">
                          {order.shoppingCart.shoppingCartProduct
                            .slice(0, 3)
                            .map((prod) => (
                              <li
                                key={`${prod.product.id}-${prod.amount}`}
                                className="flex justify-between text-sm"
                              >
                                <div className="flex items-center gap-1.5">
                                  <Tag className="h-3 w-3 text-muted-foreground" />
                                  <span className="truncate max-w-[180px]">
                                    {prod.product.name}
                                  </span>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="group:text-primary"
                                >
                                  x{prod.amount}
                                </Badge>
                              </li>
                            ))}
                          {order.shoppingCart.shoppingCartProduct.length >
                            3 && (
                            <li className="text-xs text-muted-foreground italic">
                              Y{" "}
                              {order.shoppingCart.shoppingCartProduct.length -
                                3}{" "}
                              productos más...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {order.shoppingCart.shoppingCartServices.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Wrench className="h-4 w-4 text-amber-600" />
                          Servicios (
                          {order.shoppingCart.shoppingCartServices.length})
                        </h4>
                        <ul className="space-y-1.5">
                          {order.shoppingCart.shoppingCartServices
                            .slice(0, 3)
                            .map((serviceEntry, index) => (
                              <li
                                key={index}
                                className="flex justify-between text-sm"
                              >
                                <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                                  <Car className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                  <span className="truncate">
                                    {serviceEntry.service.procedure.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs group:text-primary">
                                    {serviceEntry.service.car.plate}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="group:text-primary"
                                  >
                                    x{serviceEntry.amount}
                                  </Badge>
                                </div>
                              </li>
                            ))}
                          {order.shoppingCart.shoppingCartServices.length >
                            3 && (
                            <li className="text-xs text-muted-foreground italic">
                              Y{" "}
                              {order.shoppingCart.shoppingCartServices.length -
                                3}{" "}
                              servicios más...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end p-4 bg-muted/20">
                  {order.shoppingCart.status === "CONFIRMADO" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sm text-destructive border-destructive/30"
                        >
                          Cancelar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción cancelará tu pedido #{order.id} y no
                            podrá ser revertida.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            No, mantener pedido
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleCancelOrder(order.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={cancellingId === order.id}
                          >
                            {cancellingId === order.id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Cancelando...
                              </>
                            ) : (
                              "Sí, cancelar pedido"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Pedido
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Fecha
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Contenido
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Total
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/30">
                      <td className="px-4 py-4 text-sm font-medium">
                        #{order.id}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div>{formatDate(order.date)}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(order.date)}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(order.shoppingCart.status)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          {order.shoppingCart.shoppingCartProduct.length >
                            0 && (
                            <div className="flex items-center text-xs">
                              <Package className="h-3 w-3 mr-1 text-blue-600" />
                              <span>
                                {order.shoppingCart.shoppingCartProduct.length}{" "}
                                productos
                              </span>
                            </div>
                          )}
                          {order.shoppingCart.shoppingCartServices.length >
                            0 && (
                            <div className="flex items-center text-xs">
                              <Wrench className="h-3 w-3 mr-1 text-amber-600" />
                              <span>
                                {order.shoppingCart.shoppingCartServices.length}{" "}
                                servicios
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-medium">
                        {formatCurrency(order.costTotal)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          {order.shoppingCart.status === "CONFIRMADO" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <span className="sr-only">
                                    Cancelar pedido
                                  </span>
                                  <X className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estás seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción cancelará tu pedido #{order.id}{" "}
                                    y no podrá ser revertida.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    No, mantener pedido
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleCancelOrder(order.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    disabled={cancellingId === order.id}
                                  >
                                    {cancellingId === order.id ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Cancelando...
                                      </>
                                    ) : (
                                      "Sí, cancelar pedido"
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
