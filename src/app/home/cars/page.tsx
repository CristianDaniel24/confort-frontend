import { carService } from "@/services/car-service";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Cars() {
  const cars = await carService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de carros:</h1>
      <DataTable columns={columns} data={cars} />
    </div>
  );
}
