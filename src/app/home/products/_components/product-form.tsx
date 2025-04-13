"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  productFormDefinition,
  ProductFormType,
} from "@/lib/definitions/product-form-definition";
import { providerService } from "@/services/provider.service";
import { typeProductService } from "@/services/typeProduct.service";
import { IProduct } from "@/types/product-interface";
import { IProvider } from "@/types/provider-interface";
import { ITypeProduct } from "@/types/typeProduct-interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

interface Props {
  product: IProduct;
  onSubmit: (value: ProductFormType) => void;
}

export default function ProductForm({ product, onSubmit }: Readonly<Props>) {
  const form = useForm<ProductFormType>(
    productFormDefinition.asignDefaultValues(product)
  );
  const router = useRouter();
  const [typeProduct, setTypeProduct] = useState<ITypeProduct[]>([]);
  const [provider, setProvider] = useState<IProvider[]>([]);

  useEffect(() => {
    typeProductService
      .getAll()
      .then((typeProduct) => setTypeProduct(typeProduct));
  }, [product.id]);

  useEffect(() => {
    providerService.getAll().then((provider) => setProvider(provider));
  }, [product.id]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Costo</FormLabel>
              <FormControl>
                <Input placeholder="Costo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo</FormLabel>
              <FormControl>
                <Input placeholder="Codigo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="typeProduct"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de producto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el tipo de producto"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {typeProduct.map((g) => (
                    <SelectItem key={g.id} value={g.id.toString()}>
                      {g.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proveedor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el proveedor"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provider.map((g) => (
                    <SelectItem key={g.id} value={g.id.toString()}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-5">
          <Button
            variant={"secondary"}
            type="button"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
}
