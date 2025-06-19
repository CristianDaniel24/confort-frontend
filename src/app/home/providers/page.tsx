"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { providerService } from "@/services/provider.service";
import { IProvider } from "@/types/provider-interface";
import { Loader2 } from "lucide-react";

export default function Providers() {
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await providerService.getAll();
        setProviders(data);
      } catch (error) {
        console.error("Error al cargar proveedores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-muted-foreground">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        <span>Cargando proveedores...</span>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de Proveedores:
      </h1>
      <DataTable columns={columns} data={providers} />
    </div>
  );
}
