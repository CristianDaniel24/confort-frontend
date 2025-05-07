"use client";

import { useRouter } from "next/navigation";
import EmployeeForm from "../_components/employee-form";
import { toast } from "sonner";
import {
  employeeFormDefinition,
  EmployeeFormType,
} from "@/lib/definitions/employee-form-definition";
import { IEmployee } from "@/types/employee-interface";
import { employeeService } from "@/services/employee.service";

export default function CreateEmployee() {
  const router = useRouter();
  const handleSubmit = (values: EmployeeFormType) => {
    console.log("Hi ", values);
    const employee = {
      person: {
        firstName: values.firstName,
        secondName: values.secondName,
        lastName: values.lastName,
        secondLastName: values.secondLastName,
        document: values.document,
        phone: values.phone,
        address: values.address,
        dateOfBirth: values.dateOfBirth,
        email: values.email,
        password: values.password,
      },
      rol: {
        id: values.rol.id,
      },
    } as IEmployee;
    employeeService.create(employee).then(() => {
      toast.success("Empleado creado!");
      router.push("/home/employee");
    });
  };
  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Empleado nuevo</h1>
        <EmployeeForm
          employee={employeeFormDefinition.defaultEmployee}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
