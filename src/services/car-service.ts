import { getApiUrl } from "@/lib/utils";
import { ICar } from "@/types/car-interface";

class CarService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/car`;
  }

  async getAll(): Promise<ICar[]> {
    const res = await fetch(this.url);
    const car = await res.json();
    return car;
  }

  async findById(id: number): Promise<ICar | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const car = await res.json();
    return car;
  }

  async create(car: ICar): Promise<ICar> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(car),
    });
    const restCar = await res.json();
    return restCar;
  }

  async update(id: number, car: ICar): Promise<ICar> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(car),
    });
    const resCar = res.json();
    return resCar;
  }
}

export const carService = new CarService();
