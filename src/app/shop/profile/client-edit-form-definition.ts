import { IPerson } from "@/types/person-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ClientEditFormType = z.infer<
  typeof clientEditFormDefinition.clientEditFormSchema
>;
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;

class ClientEditFormDefinition {
  readonly clientEditFormSchema = z.object({
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
  });

  readonly defaultPerson = {
    firstName: "",
    secondName: "",
    lastName: "",
    secondLastName: "",
    document: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    dateOfBirth: "",
  } as IPerson;

  public asignDefaultValues(person: IPerson): any {
    const clientEditFormDefaultValues = {
      resolver: zodResolver(this.clientEditFormSchema),
      defaultValues: {
        firstName: person.firstName,
        secondName: person.secondName,
        lastName: person.lastName,
        secondLastName: person.secondLastName,
        document: person.document,
        phone: person.phone,
        address: person.address,
        email: person.email,
        dateOfBirth: person.dateOfBirth,
      },
    };
    return clientEditFormDefaultValues;
  }
}

export const clientEditFormDefinition = new ClientEditFormDefinition();
