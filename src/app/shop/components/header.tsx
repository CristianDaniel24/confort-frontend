"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/shop" className="text-2xl font-bold">
          Confort Shop
        </Link>
        <nav className="space-x-6">
          <Link href="/shop">Inicio</Link>
          <Link href="/shop/product">Productos</Link>
          <Link href="/shop/cart">
            <ShoppingCart className="inline-block mr-1" />
            Carrito
          </Link>
        </nav>
      </div>
    </header>
  );
}
