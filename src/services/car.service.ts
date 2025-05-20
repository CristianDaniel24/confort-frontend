import { ICar } from "@/types/car-interface";
import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";

class CarService extends GenericService<ICar> {
  constructor() {
    super({ endpoint: "car" });
  }

  async getCarsByClientId(clientId: number) {
    const response = await iAxios.get(
      `${utils.baseUrl}/car/client/${clientId}`
    );
    return response.data;
  }
}
export const carService = new CarService();
