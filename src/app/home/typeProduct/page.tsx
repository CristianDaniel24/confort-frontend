"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { typeProductService } from "@/services/typeProduct.service";
import { ITypeProduct } from "@/types/typeProduct-interface";
import { Loader2 } from "lucide-react";

export default function TypeProduct() {
  const [typeProducts, setTypeProducts] = useState<ITypeProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypeProducts = async () => {
      try {
        const data = await typeProductService.getAll();
        setTypeProducts(data);
      } catch (error) {
        console.error("Error al cargar los tipos de productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTypeProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-muted-foreground">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        <span>Cargando tipos de productos...</span>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de tipos de productos:
      </h1>
      <DataTable columns={columns} data={typeProducts} />
    </div>
  );
}
