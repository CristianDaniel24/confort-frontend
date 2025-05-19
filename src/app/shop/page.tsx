"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleCarousel } from "./components/SimpleCarousel";
import {
  CheckCircle,
  Wrench,
  Users,
  Award,
  MousePointer,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutUsPage() {
  // Estado para controlar si estamos en la parte superior de la página
  const [isAtTop, setIsAtTop] = useState(true);
  // Estado para controlar si estamos en la parte inferior de la página
  const [isAtBottom, setIsAtBottom] = useState(false);
  // Estado para controlar si el menú de navegación está abierto
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
=======
import type React from "react";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Scissors,
  Star,
  ThumbsUp,
  PenToolIcon as Tools,
  Users,
  ChevronRight,
} from "lucide-react";

// Modificar el componente FadeIn para que las animaciones sean más lentas y naturales
const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
>>>>>>> develop

  // Efecto para detectar la posición del scroll
  useEffect(() => {
<<<<<<< HEAD
    const handleScroll = () => {
      // Determinar si estamos en la parte superior (menos de 100px de scroll)
      if (window.scrollY < 100) {
        setIsAtTop(true);
        setIsAtBottom(false);
      }
      // Determinar si estamos en la parte inferior (cerca del final del documento)
      else if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setIsAtTop(false);
        setIsAtBottom(true);
      }
      // En algún punto intermedio
      else {
        setIsAtTop(false);
        setIsAtBottom(false);
      }
    };

    // Inicializar el estado basado en la posición inicial
    handleScroll();

    // Agregar el event listener
    window.addEventListener("scroll", handleScroll);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle para abrir/cerrar el menú de navegación
  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
=======
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(15px)";
      case "down":
        return "translateY(-15px)";
      case "left":
        return "translateX(15px)";
      case "right":
        return "translateX(-15px)";
      default:
        return "translateY(15px)";
    }
>>>>>>> develop
  };

  // Enlaces de navegación
  const navLinks = [
    { id: "hero", label: "Inicio" },
    { id: "projects", label: "Proyectos" },
    { id: "products", label: "Productos" },
    { id: "materials", label: "Materiales" },
    { id: "history", label: "Historia" },
    { id: "services", label: "Servicios" },
    { id: "process", label: "Proceso" },
    { id: "values", label: "Valores" },
  ];

  // Función para desplazarse a una sección específica
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsNavMenuOpen(false); // Cerrar el menú después de seleccionar
    }
  };

  // Función para desplazarse hacia arriba o abajo según la posición actual
  const handleScrollToggle = () => {
    if (isAtTop) {
      // Si estamos en la parte superior, vamos completamente hacia abajo
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Si estamos en cualquier otra posición, vamos completamente hacia arriba
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Datos de servicios para mantener el código más limpio
  const services = [
    {
      title: "Tapizado completo",
      desc: "Renovamos completamente el interior de tu vehículo con materiales premium como cuero, alcántara, vinilo de alta calidad y telas exclusivas.",
    },
    {
      title: "Accesorios",
      desc: "Fabricamos e instalamos apoyabrazos, fundas de volante, cabeceras y otros accesorios de interior a medida.",
    },
    {
      title: "Restauración",
      desc: "Devolvemos la vida a interiores desgastados, reparando daños en asientos, paneles de puertas, techos y tableros.",
    },
    {
      title: "Tapizado especial",
      desc: "Ofrecemos soluciones para vehículos clásicos, deportivos y de lujo, respetando la originalidad o innovando según tus preferencias.",
    },
    {
      title: "Personalización",
      desc: "Creamos diseños únicos con costuras decorativas, bordados, combinación de materiales y colores personalizados.",
    },
    {
      title: "Asesoramiento",
      desc: "Te ayudamos a elegir los mejores materiales y diseños para tu vehículo según su modelo, uso y tus preferencias.",
    },
  ];

  // Datos de materiales
  const materials = [
    {
      title: "Cuero Genuino",
      desc: "Trabajamos con las mejores pieles, ofreciendo durabilidad, elegancia y el prestigio que solo el cuero genuino puede brindar.",
    },
    {
      title: "Alcántara",
      desc: "Material premium con aspecto de gamuza que aporta un toque deportivo y lujoso, ideal para volantes, palancas y detalles.",
    },
    {
      title: "Vinilo de Alta Resistencia",
      desc: "Alternativa práctica y duradera, resistente al agua, rayos UV y desgaste, disponible en diversos colores y texturas.",
    },
  ];

  // Datos del proceso
  const processSteps = [
    {
      step: 1,
      title: "Consulta",
      desc: "Evaluamos tu vehículo y entendemos tus necesidades y preferencias.",
    },
    {
      step: 2,
      title: "Diseño",
      desc: "Creamos un proyecto personalizado seleccionando materiales y acabados.",
    },
    {
      step: 3,
      title: "Fabricación",
      desc: "Nuestros artesanos confeccionan cada pieza con precisión y cuidado.",
    },
    {
      step: 4,
      title: "Instalación",
      desc: "Montamos cada elemento asegurando un acabado perfecto y duradero.",
    },
  ];

  // Datos de valores
  const values = [
    {
      icon: Award,
      title: "Excelencia",
      desc: "Nos comprometemos con los más altos estándares de calidad en cada proyecto, desde la selección de materiales hasta el acabado final.",
    },
    {
      icon: Users,
      title: "Servicio Personalizado",
      desc: "Entendemos que cada cliente es único, por eso ofrecemos soluciones adaptadas a tus necesidades, preferencias y presupuesto.",
    },
    {
      icon: Wrench,
      title: "Innovación",
      desc: "Combinamos técnicas tradicionales con tecnologías modernas para ofrecer soluciones de tapicería avanzadas y duraderas.",
    },
  ];

  return (
<<<<<<< HEAD
    <main className="w-full max-w-full bg-black">
      {/* Estilos para animación fadeIn */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>

      {/* Hero Section - Altura ajustada a pantalla completa */}
      <section
        id="hero"
        className="h-screen flex flex-col justify-center items-center text-center w-full relative px-4 md:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black -z-10"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center -z-10"></div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white relative">
          <span className="relative inline-block">
            TAPICERIA
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </span>{" "}
          <span className="relative inline-block mt-2">
            CONFORT
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mx-auto leading-relaxed max-w-4xl font-light mb-8">
          En Tapicería Automotriz Confort combinamos artesanía tradicional con
          diseños contemporáneos para brindarte máximo confort y estilo, creando
          espacios únicos que reflejan tu personalidad.
        </p>

        <div className="w-40 h-1 bg-gradient-to-r from-[#00AEEF]/70 via-[#00AEEF] to-[#00AEEF]/70 rounded-full my-4"></div>

        {/* Botón para desplazarse hacia abajo */}
        <Button
          onClick={() => scrollToSection("projects")}
          className="mt-8 bg-[#00AEEF] hover:bg-[#0099d4] text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group flex items-center gap-2"
          aria-label="Explora nuestros proyectos"
        >
          <span className="text-lg font-medium">Explora</span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </Button>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse">
          <MousePointer className="w-5 h-5 text-[#00AEEF]" />
          <p className="text-gray-400 text-sm mt-1">
            Desplázate para descubrir más
          </p>
=======
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Modificar el componente ImageCarousel para que las transiciones sean más lentas
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl group">
      {images.map((src, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-2000 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Imagen de tapicería ${index + 1}`}
            fill
            className="object-cover transition-transform duration-10000 ease-in-out group-hover:scale-105"
            priority={index === 0}
          />
>>>>>>> develop
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-700 ${
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

<<<<<<< HEAD
      {/* Projects Section - Ajustado a página completa */}
      <section
        id="projects"
        className="h-screen flex flex-col justify-center px-4 md:px-8 bg-black py-8 overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-4 text-white relative w-fit mx-auto">
            Nuestros Mejores Proyectos
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </h2>
          <p className="text-center text-gray-400 mb-8 mx-auto max-w-3xl">
            Explora nuestros proyectos en donde ponemos nuestro mejor esfuerzo
            en cada uno de nuestros trabajos para poder brindarles el mejor
            servicio y calidad a nuestros clientes.
          </p>
          <div className="w-full shadow-xl rounded-lg overflow-hidden">
            <SimpleCarousel />
          </div>
        </div>
      </section>

      {/* Products Section - Ajustado a página completa */}
      <section
        id="products"
        className="h-screen flex flex-col justify-center px-4 md:px-8 bg-gray-950 py-8 overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-4 text-white relative w-fit mx-auto">
            Nuestros Productos
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </h2>
          <p className="text-center text-gray-400 mb-8 mx-auto max-w-3xl">
            Descubre nuestra selección de productos especializados para
            tapicería automotriz, desde materiales premium hasta kits y
            accesorios para personalizar tu vehículo.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tarjeta de producto 1 */}
            <div className="bg-black rounded-lg overflow-hidden border border-gray-800 group hover:border-[#00AEEF] transition-all duration-500">
              <div className="h-48 overflow-hidden">
                <img
                  src="/api/placeholder/400/320"
                  alt="Kit de cuero premium"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Kit de Cuero Premium
                </h3>
                <p className="text-gray-400 mb-4">
                  Kit completo de cuero genuino para tapizar asientos, incluye
                  material e hilos.
                </p>
                <div className="flex justify-between items-center">
                  <button className="bg-[#00AEEF] hover:bg-[#0099d4] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Tarjeta de producto 2 */}
            <div className="bg-black rounded-lg overflow-hidden border border-gray-800 group hover:border-[#00AEEF] transition-all duration-500">
              <div className="h-48 overflow-hidden">
                <img
                  src="/api/placeholder/400/320"
                  alt="Alcántara premium"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Alcántara Premium
                </h3>
                <p className="text-gray-400 mb-4">
                  Material de alta calidad para volantes, palancas y detalles
                  deportivos.
                </p>
                <div className="flex justify-between items-center">
                  <button className="bg-[#00AEEF] hover:bg-[#0099d4] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            {/* Tarjeta de producto 3 */}
            <div className="bg-black rounded-lg overflow-hidden border border-gray-800 group hover:border-[#00AEEF] transition-all duration-500">
              <div className="h-48 overflow-hidden">
                <img
                  src="/api/placeholder/400/320"
                  alt="Kit de herramientas"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Kit de Herramientas
                </h3>
                <p className="text-gray-400 mb-4">
                  Set completo de herramientas especializadas para trabajos de
                  tapicería.
                </p>
                <div className="flex justify-between items-center">
                  <button className="bg-[#00AEEF] hover:bg-[#0099d4] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section - Ajustado a página completa */}
      <section
        id="materials"
        className="h-screen flex flex-col justify-center px-4 md:px-8 bg-white text-black py-8 overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-black relative w-fit mx-auto">
            Materiales Premium
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 w-full">
            {materials.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-500 group overflow-hidden border-0 shadow-md bg-white text-black"
              >
                <CardContent className="p-0">
                  <div className="h-48 bg-gray-100 overflow-hidden relative">
                    <img
                      src="/api/placeholder/400/320"
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 text-center bg-white border-t-2 border-[#00AEEF]">
                    <h3 className="text-xl font-semibold mb-3 text-black group-hover:text-[#00AEEF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section - Ajustado a página completa */}
      <section
        id="history"
        className="h-screen flex flex-col justify-center px-4 md:px-8 bg-black py-8 overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white relative w-fit">
                Nuestra Historia
                <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Fundada en 2008 por la familia Rodríguez, Tapicería Automotriz
                  Confort nació de una pasión por la restauración de vehículos
                  clásicos y la creación de interiores personalizados.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Comenzamos como un pequeño taller familiar y hemos crecido
                  hasta convertirnos en una referencia en el sector de la
                  tapicería automotriz, manteniendo siempre nuestro compromiso
                  con la calidad artesanal y la atención personalizada.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Hoy contamos con un equipo de expertos artesanos, diseñadores
                  y técnicos especializados, dedicados a crear soluciones de
                  tapicería que superan las expectativas de nuestros clientes.
                </p>
              </div>
            </div>
            <div className="bg-gray-900 overflow-hidden h-96 shadow-xl rounded-lg border-2 border-[#00AEEF]">
              <img
                src="/api/placeholder/600/500"
                alt="Nuestro taller"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Ajustado a página completa */}
      <section
        id="services"
        className="h-screen flex flex-col justify-center px-4 md:px-8 bg-gray-900 py-8 overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-10 text-center text-white relative w-fit mx-auto">
            A qué nos dedicamos
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-start group hover:bg-black hover:shadow-lg rounded-lg transition-all duration-500 p-4"
              >
                <div className="bg-[#00AEEF] p-2 rounded-full group-hover:bg-[#0099d4] transition-colors">
                  <CheckCircle className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
=======
// Modificar el componente AnimatedCard para que las transiciones sean más lentas
const AnimatedCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`group relative transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${className}`}
    >
      {children}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-slate-900/10 to-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default function Home() {
  // Imágenes para el carrusel (reemplaza con tus propias imágenes)
  const carouselImages = [
    "/1carrusel_1.jpg",
    "/carrusel_3.jpg",
    "/carrusel_2.jpg",
  ];

  // Efecto de scroll suave para los botones de navegación
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Section - Adaptado para modo oscuro */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted relative">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-24 w-64 h-64 bg-foreground/5 rounded-full blur-3xl" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <FadeIn delay={100} direction="right">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground relative">
                    <span className="bg-clip-text text-foreground">
                      Renueva el Interior de tu Vehículo
                    </span>
                    <span className="absolute -bottom-2 left-0 w-20 h-1 bg-primary rounded-full"></span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mt-4">
                    Especialistas en tapicería automotriz con los mejores
                    materiales y acabados profesionales para tu auto.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
                  <Button
                    size="lg"
                    className="cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 group"
                    onClick={() => scrollToSection("servicios")}
                  >
                    Ver Servicios
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
                    onClick={() => scrollToSection("productos")}
                  >
                    Catálogo de Productos
                  </Button>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={300} direction="left">
              <ImageCarousel images={carouselImages} />
            </FadeIn>
>>>>>>> develop
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Process Section - Ajustado a página completa */}
      <section
        id="process"
        className="h-screen flex flex-col justify-center bg-white text-black py-8 overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
          <h2 className="text-3xl font-bold mb-10 text-center relative w-fit mx-auto">
            Proceso de Desarrollo del Tapizado
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Línea de conexión */}
            <div className="hidden md:block absolute top-10 left-1/2 h-2 bg-[#00AEEF] w-3/4 -translate-x-1/2 rounded-full"></div>

            {processSteps.map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-[#00AEEF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer z-10 relative">
                  <span className="text-white text-xl font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
=======
      {/* Servicios Section - Adaptado para modo oscuro */}
      <section
        id="servicios"
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary to-primary/90 relative"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent opacity-5" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent opacity-5" />

        <div className="container px-4 md:px-6 relative">
          <FadeIn>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground inline-block relative">
                  Nuestros Servicios
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary-foreground rounded-full"></span>
                </h2>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                  Ofrecemos soluciones completas para la renovación interior de
                  tu vehículo
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <FadeIn delay={100}>
              <AnimatedCard>
                <Card className="border-2 border-primary/20 shadow-sm transition-all bg-card h-full">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary transition-transform duration-500 group-hover:scale-110">
                      <Scissors className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-card-foreground">
                      Tapizado Completo
                    </CardTitle>
                    <CardDescription>
                      Renovación total del interior de tu vehículo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground/80">
                      Asientos, techos, puertas y paneles con materiales de
                      primera calidad y diseños personalizados.
                    </p>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={200}>
              <AnimatedCard>
                <Card className="border-2 border-primary/20 shadow-sm transition-all bg-card h-full">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary transition-transform duration-500 group-hover:scale-110">
                      <Tools className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-card-foreground">
                      Reparaciones
                    </CardTitle>
                    <CardDescription>
                      Arreglos puntuales y restauraciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground/80">
                      Reparamos desgarros, quemaduras, manchas y desgastes en
                      cualquier tipo de tapicería automotriz.
                    </p>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={300}>
              <AnimatedCard>
                <Card className="border-2 border-primary/20 shadow-sm transition-all bg-card h-full">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary transition-transform duration-500 group-hover:scale-110">
                      <Car className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-card-foreground">
                      Personalización
                    </CardTitle>
                    <CardDescription>
                      Diseños exclusivos a tu medida
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground/80">
                      Creamos diseños únicos con bordados, combinaciones de
                      colores y materiales especiales.
                    </p>
                  </CardContent>
                  <CardFooter></CardFooter>
                  <CardFooter></CardFooter>
                </Card>
              </AnimatedCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Productos Section - Adaptado para modo oscuro */}
      <section
        id="productos"
        className="w-full py-12 md:py-24 lg:py-32 bg-background relative"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <FadeIn>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground inline-block relative">
                  Productos Destacados
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                  Materiales de alta calidad para renovar tu vehículo
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <Tabs
              defaultValue="cuero"
              className="mt-12 w-full max-w-5xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg">
                <TabsTrigger
                  value="cuero"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Cuero
                </TabsTrigger>
                <TabsTrigger
                  value="tela"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Tela
                </TabsTrigger>
                <TabsTrigger
                  value="accesorios"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Accesorios
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cuero" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <FadeIn key={item} delay={item * 100}>
                      <AnimatedCard>
                        <Card className="overflow-hidden border-2 border-border h-full">
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=200&width=300`}
                              alt={`Cuero premium tipo ${item}`}
                              fill
                              className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-card-foreground">
                              Cuero Premium Tipo {item}
                            </CardTitle>
                            <CardDescription>
                              Material resistente y elegante
                            </CardDescription>
                          </CardHeader>
                          <CardFooter className="flex justify-between">
                            <p className="font-semibold text-card-foreground">
                              $299.99
                            </p>
                            <Button
                              size="sm"
                              className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                            >
                              Ver Detalles
                            </Button>
                          </CardFooter>
                        </Card>
                      </AnimatedCard>
                    </FadeIn>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tela" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <FadeIn key={item} delay={item * 100}>
                      <AnimatedCard>
                        <Card className="overflow-hidden border-2 border-border h-full">
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=200&width=300`}
                              alt={`Tela automotriz modelo ${item}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-card-foreground">
                              Tela Automotriz Modelo {item}
                            </CardTitle>
                            <CardDescription>
                              Durable y fácil de limpiar
                            </CardDescription>
                          </CardHeader>
                          <CardFooter className="flex justify-between">
                            <p className="font-semibold text-card-foreground">
                              $199.99
                            </p>
                            <Button
                              size="sm"
                              className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                            >
                              Ver Detalles
                            </Button>
                          </CardFooter>
                        </Card>
                      </AnimatedCard>
                    </FadeIn>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="accesorios" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <FadeIn key={item} delay={item * 100}>
                      <AnimatedCard>
                        <Card className="overflow-hidden border-2 border-border h-full">
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=200&width=300`}
                              alt={`Accesorio para tapicería ${item}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-card-foreground">
                              Accesorio Premium {item}
                            </CardTitle>
                            <CardDescription>
                              Complementos para tu tapicería
                            </CardDescription>
                          </CardHeader>
                          <CardFooter className="flex justify-between">
                            <p className="font-semibold text-card-foreground">
                              $99.99
                            </p>
                            <Button
                              size="sm"
                              className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                            >
                              Ver Detalles
                            </Button>
                          </CardFooter>
                        </Card>
                      </AnimatedCard>
                    </FadeIn>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </section>

      {/* Por qué elegirnos - Adaptado para modo oscuro */}
      <section
        id="por-que-elegirnos"
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/90 to-primary relative overflow-hidden"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent opacity-5" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-background opacity-5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-background opacity-5 rounded-full blur-3xl" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <FadeIn>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground inline-block relative">
                  ¿Por Qué Elegirnos?
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary-foreground rounded-full"></span>
                </h2>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                  Somos expertos en transformar el interior de tu vehículo
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <FadeIn delay={100} direction="up">
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg shadow-background/10 transition-transform duration-500 group-hover:scale-110">
                  <ThumbsUp className="h-10 w-10 text-primary transition-transform duration-700 group-hover:rotate-12" />
                </div>
                <h3 className="text-xl font-bold text-primary-foreground">
                  Calidad Garantizada
                </h3>
                <p className="text-primary-foreground/80">
                  Utilizamos los mejores materiales y técnicas de instalación
                  para asegurar resultados duraderos y de alta calidad.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200} direction="up">
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg shadow-background/10 transition-transform duration-500 group-hover:scale-110">
                  <Users className="h-10 w-10 text-primary transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3 className="text-xl font-bold text-primary-foreground">
                  Equipo Profesional
                </h3>
                <p className="text-primary-foreground/80">
                  Nuestros técnicos cuentan con años de experiencia en el sector
                  y formación especializada en tapicería automotriz.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300} direction="up">
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg shadow-background/10 transition-transform duration-500 group-hover:scale-110">
                  <Star className="h-10 w-10 text-primary transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3 className="text-xl font-bold text-primary-foreground">
                  Satisfacción Total
                </h3>
                <p className="text-primary-foreground/80">
                  Cientos de clientes satisfechos avalan nuestro trabajo y
                  recomiendan nuestros servicios de tapicería.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonios - Adaptado para modo oscuro */}
      <section
        id="testimonios"
        className="w-full py-12 md:py-24 lg:py-32 bg-background relative"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <FadeIn>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground inline-block relative">
                  Lo Que Dicen Nuestros Clientes
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                  Experiencias reales de quienes han confiado en nosotros
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {[
              {
                name: "Carlos Rodríguez",
                vehicle: "Toyota Camry",
                text: "Excelente trabajo en la renovación de los asientos de mi auto. El cuero es de primera calidad y el acabado impecable.",
              },
              {
                name: "María González",
                vehicle: "Honda Civic",
                text: "Repararon un desgarro en el asiento del conductor que parecía imposible de arreglar. Ahora luce como nuevo.",
              },
              {
                name: "Juan Pérez",
                vehicle: "Ford Explorer",
                text: "La personalización que hicieron para mi camioneta superó mis expectativas. El bordado y los detalles son perfectos.",
              },
            ].map((testimonial, index) => (
              <FadeIn key={index} delay={index * 100} direction="up">
                <AnimatedCard>
                  <Card className="text-center border-2 border-border h-full relative">
                    <div className="absolute top-6 left-6 text-6xl text-muted font-serif">
                      "
                    </div>
                    <CardHeader className="relative z-10">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted shadow-md transition-transform duration-300 group-hover:shadow-lg">
                        <Users className="h-10 w-10 text-primary" />
                      </div>
                      <CardTitle className="text-card-foreground mt-4">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription>{testimonial.vehicle}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-card-foreground/80 italic">
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                    <CardFooter className="justify-center relative z-10">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-5 w-5 fill-current text-amber-600 transition-transform duration-300 group-hover:scale-110"
                          />
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </AnimatedCard>
              </FadeIn>
>>>>>>> develop
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Values Section - Ajustado a página completa */}
      <section
        id="values"
        className="h-screen flex flex-col justify-center px-4 md:px-8 bg-black py-8 overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-10 text-center text-white relative w-fit mx-auto">
            Nuestros Valores
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="bg-black shadow-md hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-800"
                >
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto bg-[#00AEEF] w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0099d4] transition-all duration-500 group-hover:scale-110">
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA Section - Ajustado a página completa */}
      <section className="h-screen flex flex-col justify-center px-4 md:px-8 bg-gradient-to-b from-gray-900 to-black py-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-3xl font-bold mb-6 text-white">
            ¿Listo para transformar el interior de tu vehículo?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Ponte en contacto con nosotros hoy mismo y descubre cómo podemos
            ayudarte a crear un interior único y personalizado.
          </p>
          <Link href="/shop/product">
            <button className="overflow-hidden relative w-48 p-2 h-14 bg-black text-white border-2 border-[#00AEEF] rounded-md text-xl font-bold cursor-pointer z-10 group">
              Ir a la tienda
              <span className="absolute w-56 h-32 -top-8 -left-2 bg-[#00AEEF]/30 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
              <span className="absolute w-56 h-32 -top-8 -left-2 bg-[#00AEEF]/60 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
              <span className="absolute w-56 h-32 -top-8 -left-2 bg-[#00AEEF] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
              <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-3.5 left-9 z-10">
                Ir a la tienda
              </span>
            </button>
          </Link>
        </div>
      </section>

      {/* Botón flotante único para scroll */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleScrollToggle}
          className="bg-[#00AEEF] hover:bg-[#0099d4] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-4 border-white flex flex-col items-center justify-center w-16 h-16"
          aria-label={isAtTop ? "Ir hacia abajo" : "Ir hacia arriba"}
        >
          {isAtTop ? (
            <>
              <ChevronDown className="w-6 h-6" />
              <span className="text-xs font-bold">Abajo</span>
            </>
          ) : (
            <>
              <ChevronUp className="w-6 h-6" />
              <span className="text-xs font-bold">Arriba</span>
            </>
          )}
        </button>
      </div>
=======
      {/* CTA Section - Adaptado para modo oscuro */}
      <section
        id="contacto"
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary to-primary/90 relative overflow-hidden"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-background opacity-5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-background opacity-5 rounded-full blur-3xl" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <FadeIn>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground inline-block relative">
                  ¿Listo para Renovar tu Vehículo?
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary-foreground rounded-full"></span>
                </h2>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                  Contáctanos hoy mismo para una cotización sin compromiso
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center mt-8">
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
                onClick={() => scrollToSection("productos")}
              >
                Solicitar Cotización
              </Button>
              <Button
                size="lg"
                className="cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 group"
                onClick={() => scrollToSection("servicios")}
              >
                Ver Galería de Trabajos
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </div>
          </FadeIn>

          {/* Decoración adicional */}
          <div className="mt-16 flex justify-center">
            <div className="w-20 h-1 bg-primary-foreground/20 rounded-full"></div>
          </div>
        </div>
      </section>
>>>>>>> develop
    </main>
  );
}
