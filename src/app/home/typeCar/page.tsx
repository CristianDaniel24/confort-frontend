"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { typeCarService } from "@/services/typeCar.service";
import { ITypeCar } from "@/types/typeCar-interface";
import { Loader2 } from "lucide-react";

export default function TypeCar() {
  const [typeCars, setTypeCars] = useState<ITypeCar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await typeCarService.getAll();
        setTypeCars(data);
      } catch (error) {
        console.error("Error al cargar tipos de carro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-muted-foreground">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        <span>Cargando tipos de carro...</span>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de tipos de carros:
      </h1>
      <DataTable columns={columns} data={typeCars} />
    </div>
  );
}
