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
import { getYearsRange } from "@/app/home/typeCar/_components/getCarYears";
import {
  typeCarFormDefinition,
  TypeCarFormType,
} from "@/lib/definitions/typeCar-form-definitions";
import { ITypeCar } from "@/types/typeCar-interface";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  typeCar: ITypeCar;
  onSubmit: (
    value: z.infer<typeof typeCarFormDefinition.typeCarFormSchema>
  ) => void;
}

export default function TypeCarForm({ typeCar, onSubmit }: Readonly<Props>) {
  const form = useForm<TypeCarFormType>(
    typeCarFormDefinition.asignDefaultValues(typeCar)
  );
  const router = useRouter();
  const years = getYearsRange();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-5">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <FormControl>
                <Input placeholder="Model" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/*
              <FormControl>
                
                 <select
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  ref={field.ref}
                  className="input w-full border rounded-md px-3 py-2"
                >
                  {years.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select> 
              </FormControl>
              */}
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
