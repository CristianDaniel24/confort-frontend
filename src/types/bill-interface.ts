export interface IBill {
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
      };
    }[];
    shoppingCartServices: {
      id: {
        shoppingCart: number;
        service: {
          id: number;
          description: string;
          status: string;
          dueTo: string;
          completedAt: string;
          procedure: {
            id: number;
            name: string;
            price: number;
            description: string;
          };
          car: {
            id: number;
            plate: string;
            color: string;
            typeCar: {
              id: number;
              model: string;
              year: number;
            };
          };
        };
      };
      createdAt: string;
      updatedAt: string;
      service: {
        id: number;
        description: string;
        status: string;
        dueTo: string;
        completedAt: string;
        procedure: {
          id: number;
          name: string;
          price: number;
          description: string;
        };
        car: {
          id: number;
          plate: string;
          color: string;
          typeCar: {
            id: number;
            model: string;
            year: number;
          };
        };
      };
      amount: number;
    }[];
  };
}
