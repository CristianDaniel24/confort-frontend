"use client";

import { sessionUtils } from "@/app/utils/session.utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";
import {
  Car,
  ImageOff,
  Package,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  Wrench,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
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
import { Button } from "@/components/ui/button";
import { shoppingCartService } from "@/services/shoppingCart.service";
import type { IShoppingCartProduct } from "@/types/shoppingCartProduct-interface";
import type { ICar } from "@/types/car-interface";
import type { IProcedure } from "@/types/procedure-interface";
import type { IShoppingCartService } from "@/types/shoppingCartService-interface";
import { useCartStore } from "./_components/cart-update-icon";

interface CartProduct {
  id: number;
  name: string;
  amount: number;
  price: number;
  imgUrl: string;
}

interface CartService {
  id: number;
  status: string;
  description: string;
  amount: number;
  dueTo: number;
  completedAt: number;
  car: ICar;
  procedure: IProcedure;
  price: number;
}

export function CartSheet() {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [services, setServices] = useState<CartService[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const person = sessionUtils.getPersonFromSession();
      if (!person?.id) {
        toast.error("Ocurrió un error con tu petición!");
        return;
      }

      const res = await shoppingCartService.getShoppingCartByClientId(
        person.id
      );
      const productsArray = res.shoppingCartProduct;
      const servicesArray: IShoppingCartService[] = res.shoppingCartServices;

      const mappedProducts = productsArray?.map(
        (item: IShoppingCartProduct) => ({
          id: item.product.id,
          name: item.product.name,
          amount: Number(item.amount) || 0,
          price: Number(item.product.cost) || 0,
          imgUrl: item.product.imgUrl,
        })
      );

      const mappedServices = servicesArray?.map(
        (item: IShoppingCartService) =>
          ({
            id: item.service.id,
            status: item.service.status,
            description: item.service.description,
            amount: Number(item.amount) || 0,
            dueTo: item.service.dueTo,
            completedAt: item.service.completedAt,
            car: item.service.car,
            procedure: item.service.procedure,
            price: Number(item.service.procedure?.price) || 0,
          } as CartService)
      );

      setProducts(mappedProducts ?? []);
      setServices(mappedServices ?? []);

      const totalProductUnits =
        mappedProducts?.reduce(
          (acc: number, item: CartProduct) => acc + item.amount,
          0
        ) ?? 0;
      const totalServiceUnits =
        groupedServicesArray?.reduce((acc, item) => acc + item.count, 0) ?? 0;
      const totalItems = totalProductUnits + totalServiceUnits;
      useCartStore.getState().setItemCount(totalItems);
    } catch (error) {
      console.error("Error al cargar el carrito: ", error);
      toast.error("Error al cargar el carrito");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchShoppingCart = async () => {
    try {
      setIsLoading(true);
      const person = sessionUtils.getPersonFromSession();
      if (!person) {
        console.error("No se encontró el person");
        toast.error("Hubo un error con tu petición");
        return;
      }

      await iAxios.post(`${utils.baseUrl}/shoppingCart/confirm/${person.id}`);
      await fetchCart();
      setIsOpen(false);
      setProducts([]);
      setServices([]);
      toast.success("Pedido confirmado exitosamente");
      window.location.reload();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const groupedServices = services.reduce((acc, item) => {
    const key = `${item.procedure.name}-${item.car.plate}`;

    if (!acc[key]) {
      acc[key] = {
        id: item.id,
        name: item.procedure.name,
        plate: item.car.plate,
        count: 1,
        price: item.price,
        car: item.car,
      };
    } else {
      acc[key].count += 1;
      acc[key].price += item.price;
    }

    return acc;
  }, {} as Record<string, { id: number; name: string; plate: string; count: number; price: number; car: ICar }>);

  const groupedServicesArray = Object.values(groupedServices);

  const handleDeleteProduct = async (id: number) => {
    try {
      setIsLoading(true);
      const person = sessionUtils.getPersonFromSession();
      if (!person?.id) {
        toast.error("No se pudo identificar al usuario.");
        return;
      }

      await iAxios.delete(
        `/shoppingCart-product/client/${person.id}/product/${id}`
      );
      toast.success("Se eliminó correctamente del carrito.");
      fetchCart();
    } catch (error) {
      toast.error("Error al eliminar del carrito.");
      console.error("Error al eliminar del carrito:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      setIsLoading(true);
      const person = sessionUtils.getPersonFromSession();
      if (!person?.id) {
        toast.error("No se pudo identificar al usuario.");
        return;
      }

      await iAxios.delete(
        `/shoppingCart-service/client/${person.id}/service/${id}`
      );
      toast.success("Se eliminó correctamente del carrito.");
      fetchCart();
    } catch (error) {
      toast.error("Error al eliminar del carrito.");
      console.error("Error al eliminar del carrito:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalProductsPrice =
    products?.reduce(
      (total, product) => total + product.price * product.amount,
      0
    ) || 0;
  const totalServicesPrice =
    services?.reduce((total, service) => total + service.price, 0) || 0;
  const totalCartPrice = totalProductsPrice + totalServicesPrice;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const hasItems = products.length > 0 || services.length > 0;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start transition-all duration-300 hover:bg-primary/10 hover:text-primary cursor-pointer"
        >
          <ShoppingCart className="inline-block mr-1" />
          <span className="inline md:hidden">Carrito de compras</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[350px] sm:w-[450px] p-0 flex flex-col"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle className="text-xl flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Carrito de Compras
            </SheetTitle>
            <SheetDescription>
              Productos y servicios en tu carrito
            </SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Cargando carrito...</p>
              </div>
            </div>
          ) : !hasItems ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <ShoppingBag className="mx-auto mb-4 w-16 h-16 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-1">
                  Tu carrito está vacío
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Explora nuestros productos y servicios para añadirlos a tu
                  carrito.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6">
              {/* Productos */}
              {products.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="font-medium text-lg">
                      Productos ({products.length})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div
                        key={`product-${product.id}`}
                        className="border rounded-lg p-3 bg-card hover:bg-accent/5 transition-colors"
                      >
                        <div className="flex gap-3">
                          <div className="relative w-20 h-20 flex-shrink-0 bg-background rounded overflow-hidden">
                            {!imageError[product.id] && product.imgUrl ? (
                              <Image
                                src={product.imgUrl || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-contain"
                                unoptimized
                                onError={() =>
                                  setImageError((prev) => ({
                                    ...prev,
                                    [product.id]: true,
                                  }))
                                }
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                                <ImageOff className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-base truncate">
                                {product.name}
                              </h4>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-destructive hover:text-destructive/80 transition-colors ml-2 flex-shrink-0"
                                title="Eliminar producto"
                                disabled={isLoading}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="bg-primary/10 text-xs"
                              >
                                <Tag className="h-3 w-3 mr-1" />x
                                {product.amount}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatCurrency(product.price)} c/u
                              </span>
                            </div>
                            <div className="mt-2 text-right">
                              <span className="font-medium">
                                {formatCurrency(product.price * product.amount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {services.length > 0 && <Separator className="my-6" />}
                </div>
              )}

              {/* Servicios */}
              {services.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="h-5 w-5 text-primary" />
                    <h3 className="font-medium text-lg">
                      Servicios ({groupedServicesArray.length})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {groupedServicesArray.map((service, index) => (
                      <div
                        key={`service-${index}`}
                        className="border rounded-lg p-3 bg-card hover:bg-accent/5 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-base">
                            {service.name}
                          </h4>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors ml-2"
                            title="Eliminar servicio"
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Car className="h-3.5 w-3.5 mr-1.5" />
                            <span>
                              {service.car.color} - {service.plate}
                            </span>
                          </div>
                          {service.count > 1 && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Tag className="h-3.5 w-3.5 mr-1.5" />
                              <span>Cantidad: {service.count}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 text-right">
                          <span className="font-medium">
                            {formatCurrency(service.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {hasItems && (
            <>
              <div className="px-6 py-4 border-t bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Subtotal productos:
                  </span>
                  <span>{formatCurrency(totalProductsPrice)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">
                    Subtotal servicios:
                  </span>
                  <span>{formatCurrency(totalServicesPrice)}</span>
                </div>
                <div className="flex justify-between items-center font-medium text-lg">
                  <span>Total:</span>
                  <span className="group:text-primary">
                    {formatCurrency(totalCartPrice)}
                  </span>
                </div>
              </div>

              <SheetFooter className="px-6 py-4 border-t">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full h-12 gap-2 cursor-pointer"
                      disabled={isLoading}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Confirmar pedido
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar pedido</AlertDialogTitle>
                      <AlertDialogDescription>
                        Estás a punto de confirmar tu pedido con los siguientes
                        productos y servicios:
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="max-h-[300px] overflow-y-auto my-4">
                      {products.length > 0 && (
                        <>
                          <h4 className="font-medium mb-2 flex items-center gap-1.5">
                            <Package className="h-4 w-4" />
                            Productos
                          </h4>
                          <ul className="space-y-1 mb-4">
                            {products.map((product) => (
                              <li
                                key={`summary-product-${product.id}`}
                                className="flex justify-between items-center py-1 border-b last:border-b-0"
                              >
                                <span className="text-sm">
                                  {product.name}{" "}
                                  <span className="text-muted-foreground">
                                    x{product.amount}
                                  </span>
                                </span>
                                <span className="text-sm font-medium">
                                  {formatCurrency(
                                    product.price * product.amount
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {groupedServicesArray.length > 0 && (
                        <>
                          <h4 className="font-medium mb-2 flex items-center gap-1.5">
                            <Wrench className="h-4 w-4" />
                            Servicios
                          </h4>
                          <ul className="space-y-1">
                            {groupedServicesArray.map((service, index) => (
                              <li
                                key={`summary-service-${index}`}
                                className="flex justify-between items-center py-1 border-b last:border-b-0"
                              >
                                <div>
                                  <span className="text-sm">
                                    {service.name}
                                  </span>
                                  <div className="text-xs text-muted-foreground">
                                    {service.plate}{" "}
                                    {service.count > 1 && `(x${service.count})`}
                                  </div>
                                </div>
                                <span className="text-sm font-medium">
                                  {formatCurrency(service.price)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <div className="bg-muted p-3 rounded-lg ">
                      <div className="flex justify-between items-center">
                        <span className="font-medium flex items-center gap-1.5 ">
                          <DollarSign className="h-4 w-4 " />
                          Total a pagar:
                        </span>
                        <span className="text-lg font-bold">
                          {formatCurrency(totalCartPrice)}
                        </span>
                      </div>
                    </div>

                    <AlertDialogFooter className="mt-4 ">
                      <AlertDialogCancel
                        disabled={isLoading}
                        className="cursor-pointer"
                      >
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isLoading}
                        onClick={fetchShoppingCart}
                        className="cursor-pointer"
                      >
                        {isLoading ? "Procesando..." : "Confirmar pedido"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
