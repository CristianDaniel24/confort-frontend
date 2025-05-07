import { DataTable } from "./date-table";
import { columns } from "./columns";
import { procedureService } from "@/services/procedure.service";

export default async function Procedure() {
  const procedure = await procedureService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de procedimientos:
      </h1>
      <DataTable columns={columns} data={procedure} />
    </div>
  );
}
