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
    cost: z.string({ message: "El costo es requerido" }),
    code: z
      .string()
      .min(3, { message: "Debes ingresar un codigo valido" })
      .max(30),
    stock: z.string({ message: "La cantidad es requerida" }),
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
      id: 1,
    },
    provider: {
      id: 1,
    },
  } as IProduct;

  public asignDefaultValues(product: IProduct): any {
    const productFormDefaultValues = {
      resolver: zodResolver(this.productFormSchema),
      defaultValues: {
        name: product.name,
        cost: product.cost,
        code: product.code,
        stock: product.stock,
        typeProduct: product.typeProduct,
        provider: product.provider,
      },
    };
    return productFormDefaultValues;
  }
}

export const productFormDefinition = new ProductFormDefinition();
