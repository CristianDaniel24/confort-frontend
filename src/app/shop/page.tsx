"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleCarousel } from "./components/SimpleCarousel";
import { CheckCircle, Wrench, Users, Award, ArrowUp } from "lucide-react";

export default function Page() {
  // Estado para controlar la visibilidad del botón de scroll hacia arriba
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Efecto para mostrar/ocultar el botón de scroll hacia arriba
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="px-6 py-4 max-w-6xl mx-auto space-y-8 bg-white overflow-x-hidden">
      {/* 1. Hero simplificado y con menos espacio */}
      <section
        id="hero"
        className="min-h-[60vh] flex flex-col justify-center items-center text-center py-8 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10 rounded-3xl"></div>

        <h1 className="text-5xl font-bold mb-4 text-[#003366] relative">
          <span className="relative inline-block">
            TAPICERIA
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#003366]/60"></span>
          </span>{" "}
          <span className="relative inline-block mt-1">
            CONFORT
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#003366]/60"></span>
          </span>
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          En Tapicería Automotriz Confort combinamos artesanía tradicional con
          diseños contemporáneos para brindarte máximo confort y estilo, creando
          espacios únicos que reflejan tu personalidad.
        </p>
      </section>

      {/* 2. Carrusel de fotos con menos espacio */}
      <section id="projects" className="py-8">
        <h2 className="text-3xl font-semibold text-center mb-4 text-[#003366] relative w-fit mx-auto">
          Nuestros Mejores Proyectos
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#003366]/60"></span>
        </h2>
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
          Explora nuestros proyectos en donde ponemos nuestro mejor esfuerzo en
          cada uno de nuestros trabajos para poder brindarles el mejor servicio
          y calidad a nuestros clientes.
        </p>
        <div>
          <SimpleCarousel />
        </div>
      </section>

      {/* 3. Materiales que se usan con menos espacio */}
      <section id="materials" className="py-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#003366] relative w-fit mx-auto">
          Materiales Premium
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#003366]/60"></span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
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
          ].map((item, index) => (
            <Card
              key={index}
              className="border border-[#003366]/20 hover:shadow-xl transition-all duration-500 group overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="h-40 bg-gray-100 overflow-hidden">
                  <img
                    src="/api/placeholder/400/320"
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-[#003366] group-hover:text-[#00498f] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Nuestra Historia más compacta */}
      <section
        id="history"
        className="grid md:grid-cols-2 gap-8 items-center py-8"
      >
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-[#003366] relative w-fit">
            Nuestra Historia
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#003366]/60"></span>
          </h2>
          <div className="space-y-3">
            <p className="text-gray-600 leading-relaxed">
              Fundada en 2008 por la familia Rodríguez, Tapicería Automotriz
              Confort nació de una pasión por la restauración de vehículos
              clásicos y la creación de interiores personalizados.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Comenzamos como un pequeño taller familiar y hemos crecido hasta
              convertirnos en una referencia en el sector de la tapicería
              automotriz, manteniendo siempre nuestro compromiso con la calidad
              artesanal y la atención personalizada.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hoy contamos con un equipo de expertos artesanos, diseñadores y
              técnicos especializados, dedicados a crear soluciones de tapicería
              que superan las expectativas de nuestros clientes.
            </p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden h-80 shadow-lg">
          <img
            src="/api/placeholder/600/500"
            alt="Nuestro taller"
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      {/* 5. A qué nos dedicamos con menos espacio */}
      <section id="services" className="py-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#003366] relative w-fit mx-auto">
          A qué nos dedicamos
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#003366]/60"></span>
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
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
          ].map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-start group p-3 rounded-lg hover:bg-[#003366]/5 transition-all duration-500"
            >
              <div className="bg-[#003366]/10 p-1 rounded-full group-hover:bg-[#003366]/20 transition-colors">
                <CheckCircle className="text-[#003366] w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-[#003366] group-hover:text-[#00498f] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Proceso de desarrollo del tapizado más compacto */}
      <section
        id="process"
        className="bg-gradient-to-br from-[#003366] to-[#00498f] rounded-xl p-6 text-white overflow-hidden"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Proceso de Desarrollo del Tapizado
        </h2>
        <div className="grid md:grid-cols-4 gap-4 relative">
          {/* Línea de conexión */}
          <div className="hidden md:block absolute top-6 left-1/2 h-1 bg-white/20 w-3/4 -translate-x-1/2"></div>

          {[
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
          ].map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer z-10 relative">
                <span className="text-[#003366] text-lg font-bold">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-white/80 max-w-xs mx-auto text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Valores Section más compacta */}
      <section
        id="values"
        className="py-8 bg-gradient-to-br from-[#003366]/5 to-[#003366]/10 rounded-xl p-6"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#003366] relative w-fit mx-auto">
          Nuestros Valores
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#003366]/60"></span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
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
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto bg-[#003366]/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#003366]/20 transition-all duration-500 group-hover:scale-110">
                    <Icon className="text-[#003366] w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#003366]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Botón de scroll hacia arriba */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-2 rounded-full bg-[#003366] hover:bg-[#00498f] text-white shadow-lg transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </main>
  );
}
