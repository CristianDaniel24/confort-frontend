"use client";

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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export const images = [
  "/carrusel_1.jpg",
  "/carrusel_2.jpg",
  "/carrusel_3.jpg",
  "/colores_imagen.jpg",
  "/colores2_imagen.jpg",
  "/Logo-Confort.png",
  "/señor_imagen.jpg",
  "/silla_imagen.jpg",
];

export default function AboutUsPage() {
  // Estado para controlar si estamos en la parte superior de la página
  const [isAtTop, setIsAtTop] = useState(true);
  // Estado para controlar si estamos en la parte inferior de la página
  const [isAtBottom, setIsAtBottom] = useState(false);
  // Estado para controlar si el menú de navegación está abierto
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  // Efecto para detectar la posición del scroll
  useEffect(() => {
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
  };

  // Enlaces de navegación
  const navLinks = [
    { id: "hero", label: "Inicio" },
    { id: "projects", label: "Proyectos" },
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
      image: "/silla_imagen.jpg", // ✅ existe en public/
    },
    {
      title: "Alcántara",
      desc: "Material premium con aspecto de gamuza que aporta un toque deportivo y lujoso, ideal para volantes, palancas y detalles.",
      image: "/colores2_imagen.jpg", // ✅ existe en public/
    },
    {
      title: "Vinilo de Alta Resistencia",
      desc: "Alternativa práctica y duradera, resistente al agua, rayos UV y desgaste, disponible en diversos colores y texturas.",
      image: "/colores_imagen.jpg", // ✅ existe en public/
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
        </div>
      </section>

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
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                src="/historia_imagen.png"
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
          </div>
        </div>
      </section>

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
            ))}
          </div>
        </div>
      </section>

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

          <a
            href="https://wa.me/573174109274"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#00AEEF] hover:bg-[#0099d4] text-white px-8 py-3 rounded-full text-lg font-medium cursor-pointer">
              Contáctanos ahora
            </Button>
          </a>
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
    </main>
  );
}
