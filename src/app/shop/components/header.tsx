"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Icons
import { CircleUserRound, Cog, LogOut, Moon, Sun, Menu, X } from "lucide-react";

// Components
import { CartSheet } from "../cart/CartSheet";

// Services
import { authService } from "@/services/auth.service";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    const hasSession = document.cookie.includes("session=");
    setIsLoggedIn(hasSession);
  }, []);

  // Toggle theme
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle logout
  const handleLogout = () => {
    authService.logOut();
    router.refresh();
    router.push("/shop");
    toast.success("Cerraste sesión correctamente!");
  };

  // Navigation links
  const navLinks = [
    { href: "/shop", label: "Inicio" },
    { href: "/shop/product", label: "Productos" },
    { href: "/shop/servicesConfort", label: "Servicios" },
    { href: "/shop/pedidos", label: "Pedidos" },
  ];

  // Track current path for active link highlighting
  // const [currentPath, setCurrentPath] = useState("")

  // useEffect(() => {
  //   const updatePath = () => {
  //     setCurrentPath(window.location.pathname)
  //   }

  //   // Set initial path
  //   updatePath()

  //   // Update path on navigation
  //   window.addEventListener("popstate", updatePath)
  //   return () => window.removeEventListener("popstate", updatePath)
  // }, [])

  return (
    <TooltipProvider>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "py-2 bg-white/95 backdrop-blur-sm dark:bg-zinc-900/95 shadow-lg"
            : "py-4 bg-white/90 dark:bg-zinc-900/90"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo and Brand - Now separated */}
          <div className="flex items-center space-x-3">
            {/* Logo with click to show full size */}
            <div
              className="relative overflow-hidden rounded-full cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-md"
              onClick={() => setLogoModalOpen(true)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Image
                      src="/Logo-Confort.png"
                      alt="Logo Tienda Confort"
                      width={40}
                      height={40}
                      className="object-cover transition-transform duration-300"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">Ver logo completo</TooltipContent>
              </Tooltip>
            </div>

            {/* Title with link to home page */}
            <Link href="/shop">
              <span className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#003366] to-[#0066cc] dark:from-white dark:to-blue-300 hover:from-blue-700 hover:to-purple-500 dark:hover:from-blue-200 dark:hover:to-purple-300 transition-all duration-300 cursor-pointer">
                Tienda Confort
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              // Check if current path matches this link
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium text-[#003366] dark:text-white hover:text-blue-700 dark:hover:text-blue-200 transition-colors relative group ${
                    isActive ? "font-bold" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CartSheet />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Ver carrito</TooltipContent>
            </Tooltip>

            {/* Login Button (when not logged in) */}
            {!isLoggedIn && (
              <Link href="/auth/signin">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-[#003366] to-[#004080] text-white hover:from-[#004080] hover:to-[#005599] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 rounded-lg font-medium"
                >
                  Iniciar sesión
                </Button>
              </Link>
            )}

            {/* User Options Dropdown */}
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-2 border-[#003366] dark:border-white hover:border-blue-700 dark:hover:border-blue-200 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <CircleUserRound className="h-5 w-5 text-[#003366] dark:text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 border-2 border-[#003366]/20 dark:border-white/20 rounded-lg shadow-lg"
                  >
                    {isLoggedIn && (
                      <DropdownMenuItem className="cursor-pointer hover:bg-[#003366]/10 dark:hover:bg-white/10 transition-colors">
                        <CircleUserRound className="mr-2 h-4 w-4" />
                        Perfil
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={handleTheme}
                      className="cursor-pointer hover:bg-[#003366]/10 dark:hover:bg-white/10 transition-colors"
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun className="mr-2 h-4 w-4 text-amber-500" /> Modo
                          claro
                        </>
                      ) : (
                        <>
                          <Moon className="mr-2 h-4 w-4 text-indigo-500" /> Modo
                          oscuro
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-[#003366]/10 dark:hover:bg-white/10 transition-colors">
                      <Cog className="mr-2 h-4 w-4" />
                      Configuraciones
                    </DropdownMenuItem>
                    {isLoggedIn && (
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar sesión
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="bottom">Menú de usuario</TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <CartSheet />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-[#003366]/10 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#003366] dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-[#003366] dark:text-white" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-[72px] shadow-lg bg-white dark:bg-zinc-800 transition-all duration-500 ease-in-out z-40 ${
            mobileMenuOpen
              ? "max-h-[80vh] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
          } overflow-hidden`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                // Check if current path matches this link
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-medium py-3 text-[#003366] dark:text-white hover:text-blue-700 dark:hover:text-blue-200 border-b border-gray-100 dark:border-gray-700 transition-colors relative ${
                      isActive ? "font-bold pl-2" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-md"></span>
                    )}
                  </Link>
                );
              })}

              {!isLoggedIn ? (
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-gradient-to-r from-[#003366] to-[#004080] text-white hover:from-[#004080] hover:to-[#005599] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 rounded-lg font-medium">
                    Iniciar sesión
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800 transition-colors"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full justify-start border-[#003366]/20 dark:border-white/20 hover:bg-[#003366]/10 dark:hover:bg-white/10 transition-colors"
                onClick={() => {
                  handleTheme();
                  setMobileMenuOpen(false);
                }}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-4 w-4 text-amber-500" /> Cambiar a
                    modo claro
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4 text-indigo-500" /> Cambiar a
                    modo oscuro
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start border-[#003366]/20 dark:border-white/20 hover:bg-[#003366]/10 dark:hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Cog className="mr-2 h-4 w-4" />
                Configuraciones
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal for showing full-size logo */}
      <Dialog open={logoModalOpen} onOpenChange={setLogoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Logo Tienda Confort
            </DialogTitle>
            <DialogDescription className="text-center">
              Visualización del logo en tamaño completo
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center p-6">
            <div className="relative w-64 h-64">
              <Image
                src="/Logo-Confort.png"
                alt="Logo Tienda Confort"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => setLogoModalOpen(false)}
              className="bg-gradient-to-r from-[#003366] to-[#004080] text-white hover:from-[#004080] hover:to-[#005599] transition-all duration-300"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
