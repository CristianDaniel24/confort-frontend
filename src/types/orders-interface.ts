export interface IOrders {
  id: number;
  date: string;
  costTotal: number;
  createdAt: string;
  updatedAt: string;
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
    shoppingCartServices: {
      id: number;
      service: {
        id: number;
        status: string;
        description: string;
        dueTo: string | Date;
        completedAt: string | Date;
        car: {
          color: string;
          plate: string;
          typeCar: string;
        };
        procedure: {
          name: string;
          price: number;
          description: string;
          date: string | Date;
          status: string;
          imgUrl: string;
        };
      };
    };
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
}
