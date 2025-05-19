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
  };
}
