import { IEmployee } from "@/types/employee-interface";
import { GenericService } from "./generic.service";
import iAxios from "@/lib/axios-instance.utils";
import { utils } from "@/lib/utils";

class EmployeeService extends GenericService<IEmployee> {
  constructor() {
    super({ endpoint: "employee" });
  }

  //Esta es la peticion
  async findByPersonId(clientId: number) {
    const response = await iAxios.get(
      `${utils.baseUrl}/employee/person/${clientId}`
    );
    console.log(
      "URL completa a consultar:",
      `${utils.baseUrl}/employee/person/${clientId}`
    );
    return response.data;
  }
}
export const employeeService = new EmployeeService();
