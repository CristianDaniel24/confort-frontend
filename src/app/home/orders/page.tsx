import { DataTable } from "./data-table";
import { columns } from "./columns";
import { IBill } from "@/types/bill-interface";
import { orderService } from "@/services/orders.service";

export default async function Orders() {
  const orders = await orderService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">Lista de Pedidos:</h1>
      <DataTable<IBill, unknown> columns={columns} data={orders} />
    </div>
  );
}
