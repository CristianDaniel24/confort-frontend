"use client";

import Link from "next/link";
import { CartSheet } from "../cart/CartSheet";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  CircleUserRound,
  LogOut,
  Moon,
  Sun,
  Home,
  Package,
  ShoppingBasket,
  Route,
} from "lucide-react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

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
  }, []);

  const handleLogout = () => {
    authService.logOut();
    router.push("/shop");
    toast.success("Cerraste sesión correctamente!");
    setIsLoggedIn(false);
  };

  const handleEditAccount = () => {
    router.push("/shop/profile");
  };

  return (
    <TooltipProvider>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 bg-background/95 backdrop-blur-sm border-b border-border shadow-md"
            : "py-4 bg-background/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <Link href="/shop" className="group flex items-center space-x-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-primary/20 shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md">
                <Image
                  src="/Logo-Confort.png"
                  alt="Logo Tienda Confort"
                  width={40}
                  height={40}
                  className="rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                Tienda Confort
              </span>
            </Link>
          </div>

          {/* Navegación para pantalla desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/shop"
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-all duration-300 relative group overflow-hidden"
            >
              <Home className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Inicio</span>
              <span className="absolute -bottom-0 left-0 w-full h-0.5 bg-primary transform translate-y-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:translate-y-0"></span>
            </Link>
            <Link
              href="/shop/product"
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-all duration-300 relative group overflow-hidden"
            >
              <ShoppingBasket className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Productos</span>
              <span className="absolute -bottom-0 left-0 w-full h-0.5 bg-primary transform translate-y-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:translate-y-0"></span>
            </Link>
            <Link
              href="/shop/servicesConfort"
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-all duration-300 relative group overflow-hidden"
            >
              <Route className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Servicios</span>
              <span className="absolute -bottom-0 left-0 w-full h-0.5 bg-primary transform translate-y-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:translate-y-0"></span>
            </Link>
            <Link
              href="/shop/pedidos"
              className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-all duration-300 relative group overflow-hidden"
            >
              <Package className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Pedidos</span>
              <span className="absolute -bottom-0 left-0 w-full h-0.5 bg-primary transform translate-y-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:translate-y-0"></span>
            </Link>

            <div className="flex items-center space-x-2 ml-4">
              {!isLoggedIn && (
                <Link href="/auth/signin">
                  <Button
                    variant="default"
                    size="sm"
                    className="transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
                  >
                    Iniciar sesión
                  </Button>
                </Link>
              )}

              {isLoggedIn && (
                <Tooltip disableHoverableContent>
                  <TooltipTrigger asChild>
                    <div className="ml-2 transition-transform duration-300 hover:scale-105 mr-4">
                      <CartSheet />
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              )}

              {/* Dropdown de ShadCN */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:bg-primary/5"
                      >
                        Opciones
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="animate-in fade-in-50 zoom-in-95 duration-200 border-primary/20"
                    >
                      {isLoggedIn && (
                        <DropdownMenuItem
                          onClick={handleEditAccount}
                          className="cursor-pointer transition-colors duration-200 hover:text-primary focus:text-primary"
                        >
                          <CircleUserRound className="mr-2 h-4 w-4" />
                          Editar perfil
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={handleTheme}
                        className="cursor-pointer transition-colors duration-200 hover:text-primary focus:text-primary"
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
                      {isLoggedIn && (
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="cursor-pointer text-destructive transition-colors duration-200 hover:bg-destructive/10 focus:bg-destructive/10"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Cerrar sesión
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="animate-in fade-in-50 zoom-in-95 duration-200"
                >
                  Menú de usuario
                </TooltipContent>
              </Tooltip>
            </div>
          </nav>

          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              className="flex flex-col justify-center items-center w-10 h-10 rounded-full bg-primary/5 hover:bg-primary/10 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú"
            >
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-300 mb-1 ${
                  mobileMenuOpen ? "transform rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-300 mt-1 ${
                  mobileMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`md:hidden fixed inset-x-0 top-[60px] shadow-lg bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 z-40 ${
            mobileMenuOpen
              ? "max-h-[800px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/shop"
                className="flex items-center gap-2 font-medium py-3 text-foreground hover:text-primary transition-all duration-300 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                Inicio
              </Link>
              <Link
                href="/shop/product"
                className="flex items-center gap-2 font-medium py-3 text-foreground hover:text-primary transition-all duration-300 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBasket className="w-4 h-4" />
                Productos
              </Link>
              <Link
                href="/shop/servicesConfort"
                className="flex items-center gap-2 font-medium py-3 text-foreground hover:text-primary transition-all duration-300 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Route className="w-4 h-4" />
                Servicios
              </Link>
              <Link
                href="/shop/pedidos"
                className="flex items-center gap-2 font-medium py-3 text-foreground hover:text-primary transition-all duration-300 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package className="w-4 h-4" />
                Pedidos
              </Link>

              {isLoggedIn && (
                <Tooltip disableHoverableContent>
                  <TooltipTrigger asChild>
                    <div className="ml-2 transition-transform duration-300  mr-4 cursor-pointer">
                      <CartSheet />
                      Carrito de compras
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              )}

              <Button
                variant="outline"
                className="w-full justify-start transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                onClick={handleTheme}
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
              </Button>

              <div className="flex flex-col space-y-2">
                {!isLoggedIn ? (
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full transition-all duration-300 hover:shadow-md">
                      Iniciar sesión
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleEditAccount}
                      className="w-full justify-start transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    >
                      <CircleUserRound className="mr-2 h-4 w-4" />
                      Editar perfil
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-start transition-all duration-300 hover:bg-destructive/90"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
