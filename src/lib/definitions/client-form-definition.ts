import { IClient } from "@/types/client-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ClientFormType = z.infer<
  typeof clientFormDefinition.clientFormSchema
>;

const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
const passwordRegex = /^(?=(?:.*\d){2,})[A-Za-z\d.]{5,}$/;

class ClientFormDefinition {
  readonly clientFormSchema = z
    .object({
      firstName: z
        .string()
        .min(2, { message: "Debes ingresar más de 2 caracteres" })
        .max(50),
      secondName: z
        .string()
        .min(2, { message: "Debe tener al menos 2 caracteres si se ingresa" })
        .optional(),
      lastName: z
        .string()
        .min(2, { message: "Debes ingresar más de 2 caracteres" })
        .max(50),
      secondLastName: z
        .string()
        .min(2, { message: "Debe tener al menos 2 caracteres si se ingresa" })
        .optional(),
      document: z
        .string()
        .min(10, { message: "Debes ingresar un documento válido" })
        .max(12),
      email: z.string().refine((val) => emailRegex.test(val), {
        message:
          "Debes ingresar un correo válido de gmail.com, outlook.com o hotmail.com",
      }),
      password: z.string().refine((val) => passwordRegex.test(val), {
        message:
          "La contraseña debe tener al menos 5 caracteres, incluir al menos 2 números y solo usar letras, números y puntos.",
      }),
      password2: z.string(),
      phone: z
        .string()
        .min(10, { message: "Debes ingresar minimo 10 numeros de telefono" })
        .max(10, {
          message: "El telefono tiene que ser valido, debe tener 10 numeros",
        }),
      address: z
        .string()
        .min(3, { message: "Debes ingresar una dirección válida" })
        .max(50),
      dateOfBirth: z
        .union([z.string().transform((val) => new Date(val)), z.date()])
        .refine((date) => !isNaN(date.getTime()), {
          message: "Debe ser una fecha válida",
        }),
    })
    .refine((data) => data.password === data.password2, {
      message: "Las contraseñas deben ser iguales",
      path: ["password2"],
    });

  readonly defaultClient: IClient = {
    id: 0,
    person: {
      id: 0,
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
  };

  public asignDefaultValues(client: IClient) {
    return {
      resolver: zodResolver(this.clientFormSchema),
      defaultValues: {
        firstName: client.person.firstName,
        secondName: client.person.secondName,
        lastName: client.person.lastName,
        secondLastName: client.person.secondLastName,
        document: client.person.document,
        phone: client.person.phone,
        address: client.person.address,
        email: client.person.email,
        password: client.person.password,
        password2: client.person.password,
        dateOfBirth: client.person.dateOfBirth
          ? new Date(client.person.dateOfBirth)
          : new Date(),
      },
    };
  }
}

export const clientFormDefinition = new ClientFormDefinition();
