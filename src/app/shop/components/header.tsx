"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { CartSheet } from "../cart/CartSheet";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-1.5 bg-white dark:bg-zinc-900 shadow-md"
          : "py-2 bg-white/90 dark:bg-zinc-900/90"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-3">
          {/* Logo Destacado */}
          <Link href="/" className="transition-transform duration-300 transform hover:scale-110">
            <div className="w-20 h-20 relative rounded-full shadow-lg overflow-hidden border-2 border-blue-500">
              <Image
                src="/images/logo.jpg"
                alt="Logo de Tienda Confort"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Link>
          <Link
            href="/shop"
            className="text-xl font-semibold text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Tienda Confort
          </Link>
        </div>

        {/* Navegación Desktop con Bordes de Color */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/shop"
            className="nav-link-gradient"
          >
            Inicio
          </Link>
          <Link
            href="/shop/product"
            className="nav-link-gradient"
          >
            Productos
          </Link>
          <Link
            href="/shop/servicesConfort"
            className="nav-link-gradient"
          >
            Servicios
          </Link>
          <div className="ml-3">
            <CartSheet />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Opciones</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuraciones</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Botón Menú Móvil */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={toggleMobileMenu}
          aria-label="Abrir menú móvil"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 mb-1.5 ${
              isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 mt-1.5 ${
              isMobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Menú Móvil */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 shadow-lg bg-white/90 dark:bg-zinc-800/90 transition-all duration-300 z-40 transform ${
          isMobileMenuOpen
            ? "max-h-64 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/shop"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Inicio
            </Link>
            <Link
              href="/shop/product"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Productos
            </Link>
            <Link
              href="/shop/servicesConfort"
              className="mobile-nav-link"
              onClick={toggleMobileMenu}
            >
              Servicios
            </Link>
            <div className="py-2">
              <CartSheet />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Opciones</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>Opciones</SheetTitle>
                <p>Contenido del menú móvil aquí</p>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}