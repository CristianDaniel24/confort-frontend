"use client";

export const dynamic = "force-dynamic";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { typeProductService } from "@/services/typeProduct.service";

export default async function TypeProduct() {
  const typeProduct = await typeProductService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de tipos de productos:
      </h1>
      <DataTable columns={columns} data={typeProduct} />
    </div>
  );
}
