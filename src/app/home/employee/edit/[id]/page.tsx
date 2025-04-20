"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IEmployee } from "@/types/employee-interface";
import { EmployeeFormType } from "@/lib/definitions/employee-form-definition";
import { employeeService } from "@/services/employee.service";
import EmployeeForm from "../../_components/employee-form";

export default function EditEmployee() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<IEmployee>();

  const handleSubmit = (values: EmployeeFormType) => {
    const employeeUpdate = {
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
    employeeService
      .update(+id, employeeUpdate)
      .then(() => {
        toast.success("Empleado editado!");
        router.push("/home/employee");
      })
      .catch(() => {
        toast.error("Uh oh! algo salio mal", {
          description: "Hubo un problema con tu solicitud",
        });
      });
  };

  useEffect(() => {
    employeeService.findById(+id).then((employee) => setEmployee(employee));
  }, [id]);

  if (!employee) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Editar Empleado</h1>
        <EmployeeForm employee={employee} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
