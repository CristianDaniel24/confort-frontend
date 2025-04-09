import { IPerson } from "@/types/person-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type PersonFormType = z.infer<
  typeof personFormDefinition.personFormSchema
>;

class PersonFormDefinition {
  readonly personFormSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: "Debes ingresar mas de 2 caracteres" })
      .max(50),
    secondName: z
      .string()
      .min(2, { message: "Debes ingresar mas de 2 caracteres" })
      .max(50),
    lastName: z
      .string()
      .min(2, { message: "Debes ingresar mas de 2 caracteres" })
      .max(50),
    secondLastName: z
      .string()
      .min(2, { message: "Debes ingresar mas de 2 caracteres" })
      .max(50),
    document: z
      .string()
      .min(10, { message: "Debes ingresar un documento valido" })
      .max(12),
    email: z.string({ message: "El correo es requerido" }),
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
  });

  readonly defaultPerson = {
    firstName: "",
    secondName: "",
    lastName: "",
    secondLastName: "",
    document: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: 0,
  } as IPerson;

  public asignDefaultValues(person: IPerson): any {
    const personFormDefaultValues = {
      resolver: zodResolver(this.personFormSchema),
      defaultValues: {
        firstName: person.firstName,
        secondName: person.secondName,
        lastName: person.lastName,
        secondLastName: person.secondLastName,
        document: person.document,
        email: person.email,
        phone: person.phone,
        address: person.address,
        dateOfBirth: person.dateOfBirth,
      },
    };
    return personFormDefaultValues;
  }
}

export const personFormDefinition = new PersonFormDefinition();
