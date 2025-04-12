import { IProduct } from "@/types/product-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type ProductFormType = z.infer<
  typeof productFormDefinition.productFormSchema
>;

class ProductFormDefinition {
  readonly productFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Debes ingresar mas de 3 caracteres" })
      .max(30),
    cost: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debes ingresar un costo valida",
      }),
    code: z
      .string()
      .min(3, { message: "Debes ingresar un codigo valido" })
      .max(30),
    stock: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debes ingresar una cantidad valida",
      }),
    typeProduct: z.string({
      message: "Debes ingresar un tipo de producto correcto",
    }),
    provider: z.string({ message: "Debes ingresar un proveedor correcto" }),
  });

  readonly defaultProduct = {
    name: "",
    cost: 0,
    code: "",
    stock: 0,
    typeProduct: {
      id: 0,
    },
    provider: {
      id: 0,
    },
  } as IProduct;

  public asignDefaultValues(product: IProduct): any {
    const productFormDefaultValues = {
      resolver: zodResolver(this.productFormSchema),
      defaultValues: {
        name: product.name,
        cost: product.cost.toString(),
        code: product.code,
        stock: product.stock.toString(),
        typeProduct: product.typeProduct.id.toString(),
        provider: product.provider.id.toString(),
      },
    };
    return productFormDefaultValues;
  }
}

export const productFormDefinition = new ProductFormDefinition();
