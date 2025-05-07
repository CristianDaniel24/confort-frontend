"use client";

import Link from "next/link";
import { CartSheet } from "../cart/CartSheet";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efecto para detectar el scroll y cambiar la apariencia del header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-white dark:bg-zinc-900 shadow-md"
          : "py-4 bg-white/95 dark:bg-zinc-900/95"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          {/* Espacio para el logo */}
          <div className="w-10 h-10 rounded-full bg-[#003366] flex items-center justify-center">
            <span className="text-white font-bold text-xl">TC</span>
          </div>

          <Link
            href="/shop"
            className="text-2xl font-bold text-[#003366] dark:text-[#FFFFFF] hover:text-blue-700 dark:hover:text-blue-200 transition-colors"
          >
            Tienda Confort
          </Link>
        </div>

        {/* Navegación para pantalla desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/shop"
            className="font-medium text-[#003366] dark:text-[#FFFFFF] hover:text-blue-700 dark:hover:text-blue-200 transition-colors relative group"
          >
            Inicio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/shop/product"
            className="font-medium text-[#003366] dark:text-[#FFFFFF] hover:text-blue-700 dark:hover:text-blue-200 transition-colors relative group"
          >
            Productos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/shop/servicesConfort"
            className="font-medium text-[#003366] dark:text-[#FFFFFF] hover:text-blue-700 dark:hover:text-blue-200 transition-colors relative group"
          >
            Servicios
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <div className="ml-2">
            <CartSheet />
          </div>
        </nav>

        {/* Botón de menú móvil */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-[#003366] dark:bg-[#FFFFFF] transition-all duration-300 mb-1.5 ${
              mobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#003366] dark:bg-[#FFFFFF] transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#003366] dark:bg-[#FFFFFF] transition-all duration-300 mt-1.5 ${
              mobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 shadow-lg bg-white dark:bg-zinc-800 transition-all duration-300 z-40 ${
          mobileMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-4 pb-4">
            <Link
              href="/shop"
              className="font-medium py-2 text-[#003366] dark:text-[#FFFFFF] hover:text-blue-700 dark:hover:text-blue-200 border-b border-gray-100 dark:border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/shop/product"
              className="font-medium py-2 text-[#003366] dark:text-[#FFFFFF] hover:text-blue-700 dark:hover:text-blue-200 border-b border-gray-100 dark:border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/shop/servicesConfort"
              className="font-medium py-2 text-[#003366] dark:text-[#FFFFFF] hover:text-blue-700 dark:hover:text-blue-200 border-b border-gray-100 dark:border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Servicios
            </Link>
            <div className="py-2">
              <CartSheet />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
