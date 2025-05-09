"use client"

import { useState } from "react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type Product = {
  id: number
  name: string
  quantity: number
  price: number
  image: string
}

export function CartSheet() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Martillo",
      quantity: 2,
      price: 25.0,
      image: "/images/martillo.jpg",
    },
    {
      id: 2,
      name: "Destornillador",
      quantity: 1,
      price: 15.0,
      image: "/images/destornillador.jpg",
    },
  ])

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const total = products.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <ShoppingCart className="inline-block text-white hover:text-yellow-400 transition duration-300" />
          {products.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
              {products.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[350px] sm:w-[400px] bg-gradient-to-br from-[#000e1a] via-[#011627]/70 to-[#000e1a] backdrop-blur-md text-white border-l border-white/10 shadow-2xl"
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-white">🛒 Carrito de Compras</SheetTitle>
            <SheetDescription className="text-sm text-white/70">
              Productos seleccionados para tu comodidad:
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {products.length === 0 ? (
              <p className="text-white/70 text-center">El carrito está vacío.</p>
            ) : (
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 bg-white/5 p-4 rounded-xl shadow-inner border border-white/10 hover:border-yellow-400 transition"
                  >
                    <div className="w-16 h-16 relative rounded-md overflow-hidden border border-white/20 shadow-sm">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base">{product.name}</h3>
                      <p className="text-sm text-white/70">Cantidad: {product.quantity}</p>
                      <p className="text-sm text-white/70">
                        Precio: ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="text-white/60 hover:text-red-400 transition"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Total y Acción */}
            {products.length > 0 && (
              <div className="border-t border-white/20 pt-4">
                <p className="text-right text-lg font-semibold text-yellow-300">
                  Total: ${total.toFixed(2)}
                </p>
                <Button className="mt-3 w-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition">
                  Finalizar Compra
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}
