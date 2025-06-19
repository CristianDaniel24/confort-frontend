"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { clientService } from "@/services/client.service";
import { IClient } from "@/types/client-interface";

export default function Client() {
  const [client, setClient] = useState<IClient[]>([]);

  useEffect(() => {
    // Llama a la API cuando el componente se monta
    clientService
      .getAll()
      .then((data) => setClient(data))
      .catch((error) => {
        console.error("Error al cargar los clientes:", error);
      });
  }, []);

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de clientes:</h1>
      <DataTable columns={columns} data={client} />
    </div>
  );
}
