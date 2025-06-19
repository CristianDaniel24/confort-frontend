"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { rolService } from "@/services/rol.service";
import { IRol } from "@/types/rol-interface";
import { Loader2 } from "lucide-react";

export default function Rols() {
  const [roles, setRoles] = useState<IRol[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await rolService.getAll();
        setRoles(data);
      } catch (error) {
        console.error("Error al cargar roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-muted-foreground">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        <span>Cargando roles...</span>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de roles:</h1>
      <DataTable columns={columns} data={roles} />
    </div>
  );
}
