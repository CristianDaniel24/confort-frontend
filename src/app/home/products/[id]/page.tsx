import { Card } from "@/components/ui/card";
import { productService } from "@/services/product.service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const product = await productService.findById(+id);

  if (!product) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Nombre: {product.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Costo: {product.cost}
            </p>
            <p className="text-xs text-muted-foreground">
              Codigo: {product.code}
            </p>
            <p className="text-xs text-muted-foreground">
              Cantidad: {product.stock}
            </p>
            <p className="text-xs text-muted-foreground">
              Tipo de producto: {product.typeProduct?.type}
            </p>
            <p className="text-xs text-muted-foreground">
              Proveedor: {product.provider?.name} ({product.provider?.address})
              ({product.provider?.phone})
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
