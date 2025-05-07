import { IEmployee } from "@/types/employee-interface";
import { GenericService } from "./generic.service";

class EmployeeService extends GenericService<IEmployee> {
  constructor() {
    super({ endpoint: "employee" });
  }
}
export const employeeService = new EmployeeService();
