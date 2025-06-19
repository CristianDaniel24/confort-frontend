"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { productService } from "@/services/product.service";
import { IProduct } from "@/types/product-interface";
import { Loader2 } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de productos:</h1>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
