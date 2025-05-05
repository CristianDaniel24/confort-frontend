import Link from "next/link";
import { CartSheet } from "../cart/CartSheet";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-sm bg-white dark:bg-zinc-900">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/shop" className="text-2xl font-bold">
          Tienda Confort
        </Link>
        <nav className="space-x-6">
          <Link href="/shop">Inicio</Link>
          <Link href="/shop/product">Productos</Link>
          <Link href="/shop/servicesConfort">Servicios</Link>
          <CartSheet />
        </nav>
      </div>
    </header>
  );
}
