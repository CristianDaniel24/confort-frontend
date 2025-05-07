import { IEmployee } from "@/types/employee-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type EmployeeFormType = z.infer<
  typeof employeeFormDefinition.employeeFormSchema
>;
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
const passwordRegex = /^(?=(?:.*\d){2,})[A-Za-z\d.]{5,}$/;

class EmployeeFormDefinition {
  readonly employeeFormSchema = z
    .object({
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
      password: z.string().refine((val) => passwordRegex.test(val), {
        message:
          "Debes ingresar una contraseña valida, solo puedes ingresar letras(mayuscula o minuscula), numeros(1-9) y puntos(.) ",
      }),
      password2: z.string().trim(),
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
    })
    .refine((data) => data.password === data.password2, {
      message: "Las contraseñas deben ser iguales",
      path: ["password2"],
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

  public asignDefaultValues(employee: IEmployee): any {
    return {
      resolver: zodResolver(this.employeeFormSchema),
      defaultValues: {
        firstName: employee.person.firstName,
        secondName: employee.person.secondName,
        lastName: employee.person.lastName,
        secondLastName: employee.person.secondLastName,
        document: employee.person.document,
        phone: employee.person.phone,
        address: employee.person.address,
        email: employee.person.email,
        password: employee.person.password,
        password2: employee.person.password,
        dateOfBirth: new Date(employee.person.dateOfBirth),
        rol: employee.rol.id.toString(),
      },
    };
  }
}

export const employeeFormDefinition = new EmployeeFormDefinition();
