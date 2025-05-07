import { DataTable } from "./data-table";
import { columns } from "./columns";
import { typeCarService } from "@/services/typeCar.service";

export default async function TypeCar() {
  const typeCar = await typeCarService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">
        Lista de tipos de carros:
      </h1>
      <DataTable columns={columns} data={typeCar} />
    </div>
  );
}
