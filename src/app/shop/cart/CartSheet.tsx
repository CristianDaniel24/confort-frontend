"use client";

import { sessionUtils } from "@/app/utils/session.utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";
import { ImageOff, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
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
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { shoppingCartService } from "@/services/shoppingCart.service";
import { IShoppingCartProduct } from "@/types/shoppingCartProduct-interface";

interface CartProduct {
  id: number;
  name: string;
  amount: number;
  price: number;
  imgUrl: string;
}

export function CartSheet() {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const fetchCart = async () => {
    try {
      const person = sessionUtils.getPersonFromSession();
      if (!person?.id) {
        toast.error("Ocurrio un error con tu peticion!");
        return;
      }
      const res = await shoppingCartService.getShoppingCartByClientId(
        person.id
      );

      const productsArray = res.shoppingCartProduct;

      if (!productsArray) {
        return;
      }

      const mappedProducts = productsArray.map(
        (item: IShoppingCartProduct) => ({
          id: item.product.id,
          name: item.product.name,
          amount: Number(item.amount) || 0,
          price: Number(item.product.cost) || 0,
          imgUrl: item.product.imgUrl,
        })
      );

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error al cargar el carrito: ", error);
    }
  };

  const fetchShoppingCart = async () => {
    try {
      const person = sessionUtils.getPersonFromSession();
      if (!person) {
        console.error("No se encontro el person");
        toast.error("Hubo un error con tu peticion");
        return;
      }

      await iAxios.post(`${utils.baseUrl}/shoppingCart/confirm/${person.id}`);
      await fetchCart();
      setIsOpen(false);
      setProducts([]);
      toast.success("Pedido confirmado exitosamente");
    } catch (error) {
      console.error("Error al confirmar el pedido:", error);
      toast.error("Ocurrió un error al confirmar tu pedido.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const handleDeleteProduct = async (productId: number) => {
    try {
      const person = sessionUtils.getPersonFromSession();
      if (!person?.id) {
        toast.error("No se pudo identificar al usuario.");
        return;
      }

      await iAxios.delete(
        `/shoppingCart-product/client/${person.id}/product/${productId}`
      );

      toast.success("Producto eliminado del carrito.");
      fetchCart();
    } catch (error) {
      toast.error("Error al eliminar el producto.");
      console.error("Error al eliminar producto del carrito:", error);
    }
  };

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.amount,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <ShoppingCart className="inline-block mr-1" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[350px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Carrito de Compras</SheetTitle>
            <SheetDescription>
              Estos son los productos que has agregado:
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 space-y-4 flex-1 overflow-y-auto">
            {products.length === 0 ? (
              <div className="text-center text-muted-foreground mt-10">
                <ShoppingBag className="mx-auto mb-2 w-10 h-10 opacity-50" />
                <p className="text-base font-medium">
                  Tu carrito está vacío por ahora.
                </p>
                <p className="text-sm">
                  ¡Explora nuestros productos y encuentra lo que necesitas!
                </p>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded p-2 flex items-center gap-4"
                >
                  {/* Imagen */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    {!imageError[product.id] && product.imgUrl ? (
                      <Image
                        src={product.imgUrl}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                        unoptimized
                        onError={() =>
                          setImageError((prev) => ({
                            ...prev,
                            [product.id]: true,
                          }))
                        }
                      />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center border rounded bg-muted text-muted-foreground">
                        <ImageOff className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Info producto */}
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Cantidad: {product.amount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Precio:{" "}
                      {new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                      }).format(product.price)}
                    </p>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Botón al fondo */}
          {products.length > 0 && (
            <div className="pt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full h-13 text-lg font-semibold rounded-none cursor-pointer">
                    Confirmar pedido
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Resumen del pedido</AlertDialogTitle>
                  <AlertDialogDescription>
                    Estos son los productos que has seleccionado:
                  </AlertDialogDescription>
                  <ul className="space-y-1 mt-2">
                    {products.map((product) => (
                      <li
                        key={product.id}
                        className="flex justify-between items-center py-1 border-b last:border-b-0"
                      >
                        <span className="text-sm">{product.name}</span>
                        <span className="text-sm text-muted-foreground">
                          x{product.amount} –-{" "}
                          {new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 0,
                          }).format(product.price * product.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-right font-medium">
                    Total:{" "}
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(totalPrice)}
                  </div>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="cursor-pointer"
                      onClick={fetchShoppingCart}
                    >
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
