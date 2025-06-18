"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { clientService } from "@/services/client.service";

export default async function Client() {
  const client = await clientService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de clientes:</h1>
      <DataTable columns={columns} data={client} />
    </div>
  );
}
