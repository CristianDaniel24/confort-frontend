"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { typeProcedureService } from "@/services/typeProcedure.service";
import { ITypeProcedure } from "@/types/typeProcedure-interface";
import { Loader2 } from "lucide-react";

export default function TypeProcedure() {
  const [typeProcedures, setTypeProcedures] = useState<ITypeProcedure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypeProcedures = async () => {
      try {
        const data = await typeProcedureService.getAll();
        setTypeProcedures(data);
      } catch (error) {
        console.error("Error al cargar los tipos de procedimientos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTypeProcedures();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-muted-foreground">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        <span>Cargando tipos de procedimientos...</span>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de tipos de procedimientos:
      </h1>
      <DataTable columns={columns} data={typeProcedures} />
    </div>
  );
}
