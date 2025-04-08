"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Signup() {
  return (
    <div>
      <form className="grid gap-y-5">
        <FormField
          name=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primer nombre</FormLabel>
              <FormControl>
                <Input placeholder="Primer nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Segundo nombre</FormLabel>
              <FormControl>
                <Input placeholder="Segundo nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primer apellido</FormLabel>
              <FormControl>
                <Input placeholder="Primer apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Segundo apellido</FormLabel>
              <FormControl>
                <Input placeholder="Segundo apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="Correo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono</FormLabel>
              <FormControl>
                <Input placeholder="Telefono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-5">
          <Button variant={"secondary"} type="button">
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </div>
  );
}
