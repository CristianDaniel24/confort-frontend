"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Users,
  ShoppingCart,
  Calendar,
  Clock,
  DollarSign,
  Activity,
  Plus,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { IMainCardsDTO } from "@/types/main-cards-response-interface";
import { mainCardsService } from "@/services/mainCards.service";
import { IRecienActivityDTO } from "@/types/recent-activity-response-interface";
import { recentActivityService } from "@/services/recentActivity.service";

interface ActivityItem {
  description: string;
  type: string;
  status: string;
}

export default function HomeMain() {
  const [mainCards, setMainCards] = useState<IMainCardsDTO>();
  const [recentActivity, setRecentActivity] = useState<IRecienActivityDTO>();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainCartdsdata = await mainCardsService.mainCards();
        setMainCards(mainCartdsdata);
      } catch (error) {
        toast.error("Error al cargar los datos");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentActivityData = await recentActivityService.recentActivity();
        setRecentActivity(recentActivityData);
      } catch (error) {
        toast.error("Error al cargar los datos");
      }
    };
    fetchData();
  }, []);

  const quickActions = [
    {
      title: "Completar Pagos",
      description: "Completar pagos de pedidos",
      icon: ShoppingCart,
      color: "bg-blue-500",
      href: "/home/orders",
    },
    {
      title: "Agregar Producto",
      description: "Añadir producto al inventario",
      icon: Package,
      color: "bg-green-500",
      href: "/home/products/new",
    },
    {
      title: "Nuevo Empleado",
      description: "Registrar nuevo empleado",
      icon: Users,
      color: "bg-purple-500",
      href: "/home/employee/new",
    },
    {
      title: "Agregar Procedimiento",
      description: "Agregar nuevo procedimiento",
      icon: Calendar,
      color: "bg-orange-500",
      href: "/home/procedure/new",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4" />;
      case "product":
        return <Package className="h-4 w-4" />;
      case "service":
        return <Wrench className="h-4 w-4" />;
      case "client":
        return <Users className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStaticColorByType = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-600";
      case "product":
        return "bg-green-100 text-green-600";
      case "service":
        return "bg-orange-100 text-orange-600";
      case "client":
        return "bg-purple-100 text-blue-600";
      case "bill":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const activityItems = [
    recentActivity?.newService && {
      id: recentActivity.newService.id,
      description: `Nuevo servicio creado para el auto ${
        recentActivity.newService.car?.typeCar.model ?? "N/A"
      }`,
      type: "service",
      status: recentActivity.newService.status,
    },
    recentActivity?.lowStock && {
      id: recentActivity.lowStock.id,
      description: `Producto con mas bajo stock: ${recentActivity.lowStock.name}`,
      type: "product",
      status: recentActivity.lowStock.stock,
    },
    recentActivity?.billPaid && {
      id: recentActivity.billPaid.id,
      description: `Costo total de la ultima factura ${
        recentActivity.billPaid.costTotal ?? "N/A"
      }`,
      type: "bill",
      status: "PAGADO",
    },
    recentActivity?.newClient && {
      id: recentActivity.newClient.id,
      description: `Nuevo cliente registrado: ${
        recentActivity.newClient.person?.firstName ?? "N/A"
      } ${recentActivity.newClient.person.lastName}`,
      type: "client",
      status: "NUEVO",
    },
  ].filter(Boolean) as ActivityItem[];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mt-4">
            Dashboard - Tapicería Confort
          </h1>
          <p className="text-muted-foreground mt-8">
            Bienvenido de vuelta. Aquí tienes un resumen de tu negocio.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {currentTime.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>
              {currentTime.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingresos del Mes
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mainCards?.monthlyIncome ?? 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Servicios Pendientes
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mainCards?.pendingOrders ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mainCards?.totalClients ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Productos en Stock
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mainCards?.productsStock ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-12">
        {/* Quick Actions */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 justify-start"
                  asChild
                >
                  <Link href={action.href}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-md ${action.color}`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actividad reciente */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activityItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay actividad reciente registrada.
              </p>
            ) : (
              <div className="space-y-4">
                {activityItems.map((activity, index) => {
                  if (!activity) return null;

                  return (
                    <div
                      key={activity.type ?? index}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`p-1.5 rounded-full ${getStaticColorByType(
                          activity.type
                        )}`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>

                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
