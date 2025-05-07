"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="text-center py-20 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Confort Shop</h1>
      <p className="text-lg text-gray-600 mb-6">
        Descubre nuestra colección de productos diseñados para tu comodidad.
      </p>
      <Link href="/shop/productos">
        <Button size="lg">Ver Productos</Button>
      </Link>
    </section>
  );
}
