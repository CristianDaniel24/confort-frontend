import { DataTable } from "./data-table";
import { columns } from "./columns";
import { employeeService } from "@/services/employee.service";

export default async function Employee() {
  const employee = await employeeService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de empleados:</h1>
      <DataTable columns={columns} data={employee} />
    </div>
  );
}
