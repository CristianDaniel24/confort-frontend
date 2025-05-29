import { IEmployee } from "@/types/employee-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type EmployeeEditFormType = z.infer<
  typeof employeeEditFormDefinition.employeeEditFormSchema
>;
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;

class EmployeeEditFormDefinition {
  readonly employeeEditFormSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: "Debes ingresar mas de 2 caracteres" })
      .max(50),
    secondName: z
      .union([
        z.string().min(2, {
          message: "Debe tener al menos 2 caracteres si se ingresa",
        }),
        z.literal(""),
      ])
      .optional(),
    lastName: z
      .string()
      .min(2, { message: "Debes ingresar mas de 2 caracteres" })
      .max(50),
    secondLastName: z
      .union([
        z.string().min(2, {
          message: "Debe tener al menos 2 caracteres si se ingresa",
        }),
        z.literal(""),
      ])
      .optional(),
    document: z
      .string()
      .min(10, { message: "Debes ingresar un documento valido" })
      .max(12),
    email: z.string().refine((val) => emailRegex.test(val), {
      message:
        "Debes ingresar un correo valido y debe pertenecer a gmail.com, outlook.com o hotmail.com",
    }),
    phone: z
      .string()
      .min(10, { message: "Debes ingresar un numero de telefono valido" })
      .max(12),
    address: z
      .string()
      .min(3, { message: "Debes ingresar una direccion valida" })
      .max(50),
    dateOfBirth: z.date({
      invalid_type_error: "Debe ser una fecha valida",
    }),
    rol: z
      .string()
      .min(1, { message: "Debes ingresar un rol correcto" })
      .transform((val) => ({ id: Number(val) })),
  });

  readonly defaultEmployee = {
    person: {
      firstName: "",
      secondName: "",
      lastName: "",
      secondLastName: "",
      document: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      dateOfBirth: new Date(),
    },
    rol: {
      id: 0,
    },
  } as IEmployee;

  public asignDefaultValues(person: IEmployee): any {
    const employeeEditFormDefaultValues = {
      resolver: zodResolver(this.employeeEditFormSchema),
      defaultValues: {
        firstName: person.person.firstName,
        secondName: person.person.secondName,
        lastName: person.person.lastName,
        secondLastName: person.person.secondLastName,
        document: person.person.document,
        phone: person.person.phone,
        address: person.person.address,
        email: person.person.email,
        dateOfBirth: person.person.dateOfBirth,
        rol: person.rol.id.toString(),
      },
    };
    return employeeEditFormDefaultValues;
  }
}

export const employeeEditFormDefinition = new EmployeeEditFormDefinition();
