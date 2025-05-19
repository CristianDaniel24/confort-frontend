export interface IPayment {
  id: number;
  method: "EFECTIVO" | "TARJETA_CREDITO" | "TARJETA_DEBITO" | string;
  bill: {
    id: number;
    date: string;
    costTotal: number;
    shoppingCart: {
      id: number;
      status: string;
      shoppingCartProduct: {
        id: number;
        amount: number;
        product: {
          id: number;
          name: string;
          cost?: number;
          imgUrl?: string;
        };
      }[];
      client: {
        id: number;
        person: {
          firstName?: string;
          secondName?: string;
          lastName?: string;
          secondLastName?: string;
          email?: string;
          document?: string;
          phone?: string;
          address?: string;
        };
      };
    };
  };
}
