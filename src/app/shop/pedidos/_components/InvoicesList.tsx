import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Invoice = {
  id: number;
  date: string;
  costTotal: number;
  shoppingCart: {
    id: number;
    status: string;
    shoppingCartProduct: {
      amount: number;
      product: {
        id: number;
        name: string;
        cost: number;
        imgUrl: string;
      };
    }[];
  };
};

interface InvoicesListProps {
  invoices: Invoice[];
}

export const InvoicesList = ({ invoices }: InvoicesListProps) => {
  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <p className="text-muted-foreground">No tienes facturas registradas.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[80vh] p-4">
      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="border border-muted rounded-2xl">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Factura #{invoice.id}</h3>
                <Badge variant="outline">
                  {new Date(invoice.date).toLocaleDateString()}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Total: ${invoice.costTotal.toLocaleString()}
              </p>

              <div className="grid gap-2">
                {invoice.shoppingCart.shoppingCartProduct.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.product.imgUrl}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.product.name}</span>
                      <span className="text-sm text-muted-foreground">
                        Cantidad: {item.amount} × $
                        {item.product.cost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
