import { DataTable } from "./data-table";
import { columns } from "./columns";
import { typeProcedureService } from "@/services/typeProcedure.service";

export default async function TypeProcedure() {
  const typeProcedure = await typeProcedureService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de tipos de procedimientos:
      </h1>
      <DataTable columns={columns} data={typeProcedure} />
    </div>
  );
}
