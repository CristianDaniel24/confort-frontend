export interface IService {
  id: number;
  name: string;
  price: number;
  status: string;
  imgUrl?: string;
  description: string;
  dueTo: number;
  completedAt: number;
}
