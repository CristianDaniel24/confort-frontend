import { useEffect, useState } from "react";
import { productService } from "@/services/product.service";
import { IProduct } from "@/types/product-interface";

export default function ProductsEcommer() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getAll();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Filtro de busqueda y categoría
  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full md:w-1/3 border border-gray-300 rounded-lg p-2 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full md:w-1/4 border border-gray-300 rounded-lg p-2 shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Filtrar por categoría</option>
          <option value="sillas">Sillas</option>
          <option value="sofas">Sofás</option>
          <option value="mesas">Mesas</option>
        </select>
      </div>

      {/* Lista de productos filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product: any) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition duration-300"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
