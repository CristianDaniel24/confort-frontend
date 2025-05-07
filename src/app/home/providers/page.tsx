import { DataTable } from "./data-table";
import { columns } from "./columns";
import { providerService } from "@/services/provider.service";

export default async function Providers() {
  const provider = await providerService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de Proveedores:
      </h1>
      <DataTable columns={columns} data={provider} />
    </div>
  );
}
