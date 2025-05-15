"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";

// Components
import { CartSheet } from "../cart/CartSheet";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons
import {
  CircleUserRound,
  Cog,
  LogOut,
  Moon,
  Sun,
  ShoppingCart,
  Menu,
  Home,
  Package,
  Wrench,
  ClipboardList,
} from "lucide-react";

// Services
import { authService } from "@/services/auth.service";

export default function Header() {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Router and theme hooks
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const hasSession = document.cookie.includes("session=");
      setIsLoggedIn(hasSession);
    };

    checkAuth();

    // Also set initial theme based on system/stored preference
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  // Handle logout
  const handleLogout = () => {
    authService.logOut();
    router.refresh();
    toast.success("Cerraste sesión correctamente!");
  };

  // Navigation links configuration with concise descriptions
  const navLinks = [
    {
      href: "/shop",
      label: "Inicio",
      icon: <Home className="h-4 w-4 mr-2" />,
      description: "Productos destacados y ofertas",
    },
    {
      href: "/shop/product",
      label: "Productos",
      icon: <Package className="h-4 w-4 mr-2" />,
      description: "Catálogo de productos",
    },
    {
      href: "/shop/servicesConfort",
      label: "Servicios",
      icon: <Wrench className="h-4 w-4 mr-2" />,
      description: "Instalación y soporte",
    },
    {
      href: "/shop/pedidos",
      label: "Pedidos",
      icon: <ClipboardList className="h-4 w-4 mr-2" />,
      description: "Seguimiento de compras",
    },
  ];

  return (
    <TooltipProvider>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-white dark:bg-zinc-900 shadow-md"
            : "py-4 bg-white/95 dark:bg-zinc-900/95"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo & Brand */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
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
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm">Tienda Confort</p>
            </TooltipContent>
          </Tooltip>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className="font-medium text-[#003366] dark:text-[#FFFFFF] hover:text-blue-700 dark:hover:text-blue-200 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-sm">{link.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}

            {/* Actions */}
            <div className="flex items-center space-x-4 ml-2">
              {/* Cart */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <CartSheet />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-sm">Carrito de compras</p>
                </TooltipContent>
              </Tooltip>

              {/* Authentication */}
              {!isLoggedIn ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/auth/signin">
                      <Button
                        variant="default"
                        className="bg-[#003366] text-white hover:bg-[#00264d]"
                      >
                        Iniciar sesión
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-sm">Iniciar sesión</p>
                  </TooltipContent>
                </Tooltip>
              ) : null}

              {/* Options Dropdown */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <Cog className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {isLoggedIn && (
                          <>
                            <DropdownMenuItem className="cursor-pointer">
                              <CircleUserRound className="mr-2 h-4 w-4" />
                              Mi perfil
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}

                        <DropdownMenuItem
                          onClick={toggleTheme}
                          className="cursor-pointer"
                        >
                          {currentTheme === "dark" ? (
                            <>
                              <Sun className="mr-2 h-4 w-4" /> Modo claro
                            </>
                          ) : (
                            <>
                              <Moon className="mr-2 h-4 w-4" /> Modo oscuro
                            </>
                          )}
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer">
                          <Cog className="mr-2 h-4 w-4" />
                          Configuraciones
                        </DropdownMenuItem>

                        {isLoggedIn && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={handleLogout}
                              className="cursor-pointer text-red-500 focus:text-red-500"
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Cerrar sesión
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-sm">Ajustes</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CartSheet />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Carrito de compras</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex flex-col justify-center items-center w-10 h-10 rounded-md border border-gray-200 dark:border-gray-700"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <Menu
                    className={`w-5 h-5 text-[#003366] dark:text-white transition-all ${
                      mobileMenuOpen ? "hidden" : "block"
                    }`}
                  />
                  <span
                    className={`block w-5 h-0.5 bg-[#003366] dark:bg-white transition-all duration-300 mb-1 ${
                      mobileMenuOpen
                        ? "transform rotate-45 translate-y-1.5"
                        : "hidden"
                    }`}
                  ></span>
                  <span
                    className={`block w-5 h-0.5 bg-[#003366] dark:bg-white transition-all duration-300 ${
                      mobileMenuOpen ? "transform -rotate-45" : "hidden"
                    }`}
                  ></span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-sm">Menú</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-16 shadow-lg bg-white dark:bg-zinc-800 transition-all duration-300 z-40 ${
            mobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden`}
        >
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 py-2">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center font-medium py-2 px-3 rounded-md text-[#003366] dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <div className="flex flex-col">
                    <span>{link.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {link.description}
                    </span>
                  </div>
                </Link>
              ))}

              {/* Authentication for mobile */}
              {!isLoggedIn ? (
                <Link
                  href="/auth/signin"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="default"
                    className="w-full bg-[#003366] text-white hover:bg-[#00264d]"
                  >
                    Iniciar sesión
                  </Button>
                </Link>
              ) : (
                <Link
                  href="/shop/profile"
                  className="flex items-center font-medium py-2 px-3 rounded-md text-[#003366] dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CircleUserRound className="h-4 w-4 mr-2" />
                  <div className="flex flex-col">
                    <span>Mi perfil</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Gestionar cuenta
                    </span>
                  </div>
                </Link>
              )}

              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="flex items-center font-medium py-2 px-3 rounded-md text-[#003366] dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 w-full text-left"
              >
                {currentTheme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    <div className="flex flex-col">
                      <span>Modo claro</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Cambiar tema
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    <div className="flex flex-col">
                      <span>Modo oscuro</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Cambiar tema
                      </span>
                    </div>
                  </>
                )}
              </button>

              {/* Settings */}
              <Link
                href="/shop/settings"
                className="flex items-center font-medium py-2 px-3 rounded-md text-[#003366] dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Cog className="h-4 w-4 mr-2" />
                <div className="flex flex-col">
                  <span>Configuraciones</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Preferencias
                  </span>
                </div>
              </Link>

              {/* Logout for mobile */}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center font-medium py-2 px-3 rounded-md text-red-500 hover:bg-gray-100 dark:hover:bg-zinc-700 w-full text-left"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <div className="flex flex-col">
                    <span>Cerrar sesión</span>
                    <span className="text-xs text-gray-400">Salir</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
