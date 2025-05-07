import { DataTable } from "./data-table";
import { columns } from "./columns";
import { serviceService } from "@/services/service.service";

export default async function Services() {
  const service = await serviceService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de servicios:</h1>
      <DataTable columns={columns} data={service} />
    </div>
  );
}
