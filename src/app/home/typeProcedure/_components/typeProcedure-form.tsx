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
  typeProcedureFormDefinition,
  TypeProcedureFormType,
} from "@/lib/definitions/typeProcedure-form-definition";
import { ITypeProcedure } from "@/types/typeProcedure-interface";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

interface Props {
  typeProcedure: ITypeProcedure;
  onSubmit: (value: TypeProcedureFormType) => void;
}

export default function TypeProcedureForm({
  typeProcedure,
  onSubmit,
}: Readonly<Props>) {
  const form = useForm<TypeProcedureFormType>(
    typeProcedureFormDefinition.asignDefaultValues(typeProcedure)
  );
  const router = useRouter();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-5">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Input placeholder="Tipo" {...field} />
              </FormControl>
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
