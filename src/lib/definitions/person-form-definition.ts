import { IPerson } from "@/types/person-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type PersonFormType = z.infer<
  typeof personFormDefinition.personFormSchema
>;
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
const passwordRegex = /^(?=(?:.*\d){2,})[A-Za-z\d.]{5,}$/;

class PersonFormDefinition {
  readonly personFormSchema = z
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
      password2: z.string(),
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
    })
    .refine((data) => data.password === data.password2, {
      message: "Las contraseñas deben ser iguales",
      path: ["password2"], // Aqui se vera: "Las contraseñas deben ser iguales"
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
    const personFormDefaultValues = {
      resolver: zodResolver(this.personFormSchema),
      defaultValues: {
        firstName: person.firstName,
        secondName: person.secondName,
        lastName: person.lastName,
        secondLastName: person.secondLastName,
        document: person.document,
        phone: person.phone,
        address: person.address,
        email: person.email,
        password: person.password,
        password2: person.password,
        dateOfBirth: person.dateOfBirth,
      },
    };
    return personFormDefaultValues;
  }
}

export const personFormDefinition = new PersonFormDefinition();
