"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IEmployee } from "@/types/employee-interface";
import { EmployeeFormType } from "@/lib/definitions/employee-form-definition";
import { employeeService } from "@/services/employee.service";
import { sessionUtils } from "@/app/utils/session.utils";
import EmployeeFormEditAccount from "../_components/employee-edit-form";
import { EmployeeEditFormType } from "../_components/employee-edit-form-definition";

export default function ProfilePage() {
  const router = useRouter();
  const [employee, setEmployee] = useState<IEmployee>();
  const person = sessionUtils.getPersonFromSession();

  const handleSubmit = (values: EmployeeEditFormType) => {
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
      },
      rol: {
        id: values.rol.id,
      },
    } as IEmployee;
    employeeService.update(person.id ?? 0, employeeUpdate).then(() => {
      toast.success("Se edito tu cuenta con exito!");
      router.push("/home");
    });
  };

  useEffect(() => {
    console.log("Persona en sesión:", person);
    if (!person?.id) return;

    const fetchEmployee = async () => {
      try {
        const employeeData = await employeeService.findByPersonId(person.id);
        setEmployee(employeeData);
      } catch (error) {
        console.error("Error al obtener el empleado:", error);
        toast.error("No se pudo cargar la información del empleado.");
      }
    };

    fetchEmployee();
  }, [person?.id]);

  if (!employee) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Editar tu cuenta</h1>
        <EmployeeFormEditAccount employee={employee} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
