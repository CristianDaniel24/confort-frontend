"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { CartSheet } from "../cart/CartSheet";
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-white dark:bg-zinc-900 shadow-md"
            : "py-4 bg-white/95 dark:bg-zinc-900/95"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo & Brand - POSICIÓN ORIGINAL */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center items-center cursor-pointer text-white font-semibold bg-gradient-to-r from-[#002244] to-[#003366] px-7 py-3 rounded-full border border-[#004488] hover:text-blue-200 hover:border-blue-400 hover:from-[#003366] hover:to-[#00264d]"
                >
                  Tapicería Confort
                </motion.button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm">Tapicería Confort</p>
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
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {link.label}
                    </motion.span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-[#003366] dark:bg-white"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
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

              {/* Authentication - MANTIENE POSICIÓN ORIGINAL PERO CON MISMO DISEÑO QUE EL LOGO */}
              {!isLoggedIn ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/auth/signin">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="default"
                          className="bg-gradient-to-r from-[#002244] to-[#003366] text-white border border-[#004488] hover:text-blue-200 hover:border-blue-400 hover:from-[#003366] hover:to-[#00264d]"
                        >
                          Iniciar sesión
                        </Button>
                      </motion.div>
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
                      <DropdownMenuContent align="end" className="w-56" asChild>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
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
                        </motion.div>
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
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col justify-center items-center w-10 h-10 rounded-md border border-gray-200 dark:border-gray-700"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {!mobileMenuOpen ? (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-5 h-5 text-[#003366] dark:text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-5 h-5"
                      >
                        <motion.span
                          className="absolute top-2.5 left-0 block w-5 h-0.5 bg-[#003366] dark:bg-white"
                          animate={{ rotate: 45 }}
                        ></motion.span>
                        <motion.span
                          className="absolute top-2.5 left-0 block w-5 h-0.5 bg-[#003366] dark:bg-white"
                          animate={{ rotate: -45 }}
                        ></motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-sm">Menú</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden fixed inset-x-0 top-16 shadow-lg bg-white dark:bg-zinc-800 z-40 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-2">
                <motion.div
                  className="flex flex-col space-y-3 py-2"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.07,
                      },
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  {/* Mobile Navigation Links */}
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.href}
                      variants={{
                        open: { y: 0, opacity: 1 },
                        closed: { y: 20, opacity: 0 },
                      }}
                    >
                      <Link
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
                    </motion.div>
                  ))}

                  {/* Authentication for mobile - MISMO ESTILO */}
                  {!isLoggedIn ? (
                    <Link
                      href="/auth/signin"
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="default"
                        className="w-full bg-gradient-to-r from-[#002244] to-[#003366] text-white border border-[#004488] hover:scale-105 duration-200 hover:text-blue-200 hover:border-blue-400 hover:from-[#003366] hover:to-[#00264d]"
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
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </TooltipProvider>
  );
}
