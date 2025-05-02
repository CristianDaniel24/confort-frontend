"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CaptionsOff, ImageOff, MilkOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product.service";
import { IProduct } from "@/types/product-interface";
import { ITypeProduct } from "@/types/typeProduct-interface";
import { typeProductService } from "@/services/typeProduct.service";

export default function ProductsEcommer() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [typeProducts, setTypeProducts] = useState<ITypeProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getAll();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchTypeProducts = async () => {
      const data = await typeProductService.getAll();
      setTypeProducts(data);
    };
    fetchTypeProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category
      ? product.typeProduct.type === category
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <Input
          placeholder="Buscar producto por nombre..."
          className="w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            {typeProducts.map((type) => (
              <SelectItem key={type.id} value={type.type}>
                {type.type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Productos */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-muted-foreground h-96">
          <CaptionsOff className="w-12 h-12 mb-2" />
          <p>No hay productos disponibles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>${product.cost.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.imgUrl ? (
                  <div className="relative w-full h-60 rounded overflow-hidden">
                    <Image
                      src={product.imgUrl}
                      alt={product.name}
                      fill
                      className="object-contain bg-white"
                      priority
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-full h-60 flex flex-col items-center justify-center border rounded bg-muted text-muted-foreground gap-2">
                    <ImageOff className="w-10 h-10" />
                    <span>Sin imagen</span>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  Cantidad disponible: {product.stock}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tipo: {product.typeProduct.type}
                </p>
                <Button className="w-full">Agregar al carrito</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
