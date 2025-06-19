"use client";

export const dynamic = "force-dynamic";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { productService } from "@/services/product.service";

export default async function Products() {
  const product = await productService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de productos:</h1>
      <DataTable columns={columns} data={product} />
    </div>
  );
}
