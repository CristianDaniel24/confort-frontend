"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { DataTable } from "./date-table"; // ← Verifica si el archivo se llama realmente "date-table"
import { columns } from "./columns";
import { procedureService } from "@/services/procedure.service";
import { IProcedure } from "@/types/procedure-interface"; // Asegúrate de tener esta interfaz

export default function Procedure() {
  const [procedures, setProcedures] = useState<IProcedure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const data = await procedureService.getAll();
        setProcedures(data);
      } catch (error) {
        console.error("Error al obtener procedimientos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedures();
  }, []);

  if (loading) {
    return <div className="p-4">Cargando procedimientos...</div>;
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de procedimientos:
      </h1>
      <DataTable columns={columns} data={procedures} />
    </div>
  );
}
