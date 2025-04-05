import { ITypeProduct } from "@/types/typeProduct-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type TypeProductFormType = z.infer<
  typeof typeProductFormDefinition.typeProductFormSchema
>;

class TypeProductFormDefinition {
  readonly typeProductFormSchema = z.object({
    type: z
      .string()
      .min(3, { message: "Debes ingresar mas de 3 caracteres" })
      .max(30),
  });

  readonly defaultTypeProduct = {
    type: "",
  } as ITypeProduct;

  public asignDefaultValues(typeProduct: ITypeProduct): any {
    const typeProductFormDefaultValues = {
      resolver: zodResolver(this.typeProductFormSchema),
      defaultValues: {
        type: typeProduct.type,
      },
    };
    return typeProductFormDefaultValues;
  }
}

export const typeProductFormDefinition = new TypeProductFormDefinition();
