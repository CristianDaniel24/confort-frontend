import { Card } from "@/components/ui/card";
import { typeProductService } from "@/services/typeProduct-service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TypeProductDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const typeProduct = await typeProductService.findById(+id);

  if (!typeProduct) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Tipo: {typeProduct.type}
            </h3>
          </div>
        </div>
      </Card>
    </div>
  );
}
