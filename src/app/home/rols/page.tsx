"use client";

export const dynamic = "force-dynamic";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { rolService } from "@/services/rol.service";

export default async function Rols() {
  const rol = await rolService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de roles:</h1>
      <DataTable columns={columns} data={rol} />
    </div>
  );
}
