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
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CartProduct {
  name: string;
  quantity: number;
  price: number;
}

export function CartSheet() {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const person = sessionUtils.getPersonFromSession();
        if (!person?.id) {
          toast.error("Ocurrió un error con tu petición!");
          return;
        }
        const res = await iAxios.get(
          `${utils.baseUrl}/shoppingCart-product/client/${person.id}`
        );

        const mappedProducts = res.data.map((item: any) => ({
          name: item.id.product.name,
          quantity: item.amount,
          price: item.id.product.cost,
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error al cargar el carrito: ", error);
      }
    };

    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <ShoppingCart className="inline-block mr-1" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[350px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            Estos son los productos que has agregado:
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {products.length === 0 ? (
            <div className="text-center text-muted-foreground mt-10">
              <ShoppingBag className="mx-auto mb-2 w-10 h-10 opacity-50" />
              <p className="text-base font-medium">
                Tu carrito esta vacio por ahora.
              </p>
              <p className="text-sm">
                ¡Explora nuestros productos y encuentra lo que necesitas!
              </p>
            </div>
          ) : (
            products.map((product, index) => (
              <div key={index} className="border rounded p-2">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Cantidad: {product.quantity}
                </p>
                <p className="text-sm text-muted-foreground">
                  Precio: $
                  {typeof product.price === "number"
                    ? product.price.toFixed(2)
                    : "0.00"}
                </p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
