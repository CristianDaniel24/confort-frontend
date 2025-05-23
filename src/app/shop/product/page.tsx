"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  ImageOff,
  ShoppingCart,
  Package,
  Filter,
  Grid3X3,
  List,
  Star,
  Plus,
  Minus,
  Eye,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productService } from "@/services/product.service";
import type { IProduct } from "@/types/product-interface";
import type { ITypeProduct } from "@/types/typeProduct-interface";
import { typeProductService } from "@/services/typeProduct.service";
import { useRouter } from "next/navigation";
import { sessionUtils } from "@/app/utils/session.utils";
import { toast } from "sonner";
import type { IShoppingCartProduct } from "@/types/shoppingCartProduct-interface";
import { shoppingCartProductService } from "@/services/shoppingCartProduct.service";
import type { IShoppingCart } from "@/types/shoppingCart-interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProductsEcommerce() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [typeProducts, setTypeProducts] = useState<ITypeProduct[]>([]);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const [loadingProducts, setLoadingProducts] = useState<{
    [key: number]: boolean;
  }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, typeProductsData] = await Promise.all([
          productService.getAll(),
          typeProductService.getAll(),
        ]);
        setProducts(productsData);
        setTypeProducts(typeProductsData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "" ||
        category === "all" ||
        product.typeProduct.type === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.cost - b.cost;
        case "price-high":
          return b.cost - a.cost;
        case "stock":
          return b.stock - a.stock;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = async (productId: number) => {
    const person = sessionUtils.getPersonFromSession();

    if (!person?.id) {
      router.push("/auth/signin");
      toast.error("Debes ingresar sesión primero!");
      return;
    }

    const quantity = quantities[productId] || 1;
    setLoadingProducts((prev) => ({ ...prev, [productId]: true }));

    try {
      const shoppingCartProduct: IShoppingCartProduct = {
        shoppingCart: {
          client: {
            person: {
              id: person.id,
            },
          },
        } as IShoppingCart,
        product: {
          id: productId,
        } as IProduct,
        amount: quantity,
      };

      await shoppingCartProductService.create(shoppingCartProduct);
      toast.success(`${quantity} producto(s) agregado(s) al carrito!`);
      setQuantities((prev) => ({ ...prev, [productId]: 1 }));
    } catch (error) {
      console.error("Error al agregar producto:", error);
      toast.error("Ocurrió un error al agregar el producto");
    } finally {
      setLoadingProducts((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const updateQuantity = (productId: number, change: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productId] || 1;
      const newQuantity = Math.max(1, currentQuantity + change);
      const product = products.find((p) => p.id === productId);
      const maxQuantity = product?.stock || 1;
      return {
        ...prev,
        [productId]: Math.min(newQuantity, maxQuantity),
      };
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3 w-3" />
          Sin stock
        </Badge>
      );
    } else if (stock < 10) {
      return (
        <Badge
          variant="secondary"
          className="bg-amber-100 text-amber-800 gap-1"
        >
          <AlertCircle className="h-3 w-3" />
          Stock bajo
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 gap-1"
        >
          <Package className="h-3 w-3" />
          Disponible
        </Badge>
      );
    }
  };

  const ProductCard = ({ product }: { product: IProduct }) => {
    const quantity = quantities[product.id] || 1;
    const isOutOfStock = product.stock === 0;

    return (
      <Card className="group overflow-hidden border hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
        <div className="relative">
          <div className="relative w-full h-64 bg-muted overflow-hidden">
            {!imageError[product.id] && product.imgUrl ? (
              <Image
                src={product.imgUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                priority
                unoptimized
                onError={() =>
                  setImageError((prev) => ({
                    ...prev,
                    [product.id]: true,
                  }))
                }
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                <ImageOff className="w-12 h-12 mb-2" />
                <span className="text-sm">Sin imagen</span>
              </div>
            )}
          </div>

          <div className="absolute top-3 left-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              {product.typeProduct.type}
            </Badge>
          </div>

          <div className="absolute top-3 right-3">
            {getStockBadge(product.stock)}
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Agotado
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(product.cost)}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Stock disponible:</span>
              <span className="font-medium">{product.stock} unidades</span>
            </div>

            <Separator />

            {!isOutOfStock && (
              <>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={loadingProducts[product.id]}
                  >
                    {loadingProducts[product.id] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="h-4 w-4" />
                    )}
                    {loadingProducts[product.id] ? "Agregando..." : "Agregar"}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="px-3">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{product.name}</DialogTitle>
                        <DialogDescription>
                          Detalles del producto
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative h-80 bg-muted rounded-lg overflow-hidden">
                          {!imageError[product.id] && product.imgUrl ? (
                            <Image
                              src={product.imgUrl || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain bg-white"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                              <ImageOff className="w-16 h-16 mb-2" />
                              <span>Sin imagen disponible</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold mb-2">
                              Información del producto
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Código:
                                </span>
                                <span>{product.code}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Categoría:
                                </span>
                                <Badge variant="outline">
                                  {product.typeProduct.type}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Stock:
                                </span>
                                <span>{product.stock} unidades</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Precio:
                                </span>
                                <span className="font-bold text-primary">
                                  {formatCurrency(product.cost)}
                                </span>
                              </div>
                            </div>
                          </div>
                          {product.provider && (
                            <div>
                              <h3 className="font-semibold mb-2">Proveedor</h3>
                              <div className="text-sm space-y-1">
                                <p className="font-medium">
                                  {product.provider.name}
                                </p>
                                {product.provider.phone && (
                                  <p>Tel: {product.provider.phone}</p>
                                )}
                                {product.provider.address && (
                                  <p>Dir: {product.provider.address}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}

            {isOutOfStock && (
              <Button disabled className="w-full">
                Producto agotado
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProductListItem = ({ product }: { product: IProduct }) => {
    const quantity = quantities[product.id] || 1;
    const isOutOfStock = product.stock === 0;

    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              {!imageError[product.id] && product.imgUrl ? (
                <Image
                  src={product.imgUrl || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain bg-white"
                  unoptimized
                  onError={() =>
                    setImageError((prev) => ({
                      ...prev,
                      [product.id]: true,
                    }))
                  }
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <ImageOff className="w-6 h-6" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg truncate">
                    {product.name}
                  </h3>
                  <Badge variant="outline" className="mt-1">
                    {product.typeProduct.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency(product.cost)}
                  </div>
                  {getStockBadge(product.stock)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Stock: {product.stock} unidades
                </div>

                {!isOutOfStock && (
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={loadingProducts[product.id]}
                      className="gap-2"
                    >
                      {loadingProducts[product.id] ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ShoppingCart className="h-4 w-4" />
                      )}
                      {loadingProducts[product.id] ? "Agregando..." : "Agregar"}
                    </Button>
                  </div>
                )}

                {isOutOfStock && (
                  <Button disabled className="gap-2">
                    Agotado
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-muted-foreground">
        <Loader2 className="animate-spin w-12 h-12 mb-4 text-primary" />
        <h3 className="text-xl font-medium mb-2">Cargando productos</h3>
        <p className="text-sm text-muted-foreground">
          Estamos preparando nuestro catálogo...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nuestros Productos</h1>
        <p className="text-muted-foreground">
          Descubre nuestra amplia gama de productos de calidad
        </p>
      </div>

      {/* Filtros y controles */}
      <div className="bg-muted/30 p-4 rounded-lg mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar productos..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {typeProducts.map((type) => (
                  <SelectItem key={type.id} value={type.type}>
                    {type.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-low">Precio: Menor a mayor</SelectItem>
                <SelectItem value="price-high">
                  Precio: Mayor a menor
                </SelectItem>
                <SelectItem value="stock">Mayor stock</SelectItem>
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-8" />

            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "grid" | "list")}
            >
              <TabsList>
                <TabsTrigger value="grid" className="gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  Cuadrícula
                </TabsTrigger>
                <TabsTrigger value="list" className="gap-2">
                  <List className="h-4 w-4" />
                  Lista
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} producto(s) encontrado(s)
          {search && ` para "${search}"`}
          {category && category !== "all" && ` en "${category}"`}
        </p>
      </div>

      {/* Productos */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-muted-foreground h-96 max-w-md mx-auto text-center">
          <div className="bg-muted/50 p-6 rounded-full mb-4">
            <Package className="w-16 h-16" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            No se encontraron productos
          </h3>
          <p className="text-muted-foreground mb-4">
            {search || category
              ? "Intenta ajustar tus filtros de búsqueda"
              : "No hay productos disponibles en este momento"}
          </p>
          {(search || category) && (
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory("");
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      ) : (
        <Tabs value={viewMode} className="w-full">
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
