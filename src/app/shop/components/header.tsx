"use client";

import Link from "next/link";
import { CartSheet } from "../cart/CartSheet";
import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { CircleUserRound, Cog, LogOut, Moon, Sun } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function getInitialTheme(theme: string) {
  return theme === "dark" ? "light" : "dark";
}

export default function Header() {
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currTheme, setCurrTheme] = useState<string>(
    getInitialTheme(theme.theme ?? "dark")
  );

  const router = useRouter();

  const handleTheme = () => {
    setCurrTheme(() => (currTheme === "dark" ? "light" : "dark"));
    theme.setTheme(currTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hasSession = document.cookie.includes("session=");
    setIsLoggedIn(hasSession);
  });

  const handleLogout = () => {
    authService.logOut();
    router.refresh();
    toast.success("Cerraste sesion correctamente!");
  };

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
          {!isLoggedIn && (
            <Link href="/auth/signin">
              <Button
                variant="default"
                className="bg-gray-950 text-white hover:bg-gray-800 cursor-pointer"
              >
                Iniciar sesión
              </Button>
            </Link>
          )}
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
          <Link
            href="/shop/pedidos"
            className="font-medium text-[#003366] dark:text-[#FFFFFF] hover:text-blue-700 dark:hover:text-blue-200 transition-colors relative group"
          >
            Pedidos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <div className="ml-2">
            <CartSheet />
          </div>

          {/* Dropdown de ShadCN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                Opciones
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isLoggedIn && (
                <DropdownMenuItem className="cursor-pointer">
                  <CircleUserRound className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={handleTheme}
                className="cursor-pointer"
              >
                {currTheme === "dark" ? (
                  <>
                    <Moon className="mr-2 h-4 w-4" /> Modo oscuro
                  </>
                ) : (
                  <>
                    <Sun className="mr-2 h-4 w-4" /> Modo claro
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Cog />
                Configuraciones
              </DropdownMenuItem>
              {isLoggedIn && (
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" color="blue">
                  Abrir opciones
                </Button>
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
