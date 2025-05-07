"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

export function CartSheet() {
  return (
    <Sheet>
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
          <div className="border rounded p-2">
            <p className="font-medium">Martillo</p>
            <p className="text-sm text-muted-foreground">Cantidad: 2</p>
            <p className="text-sm text-muted-foreground">Precio: $25.00</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
