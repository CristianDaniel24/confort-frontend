"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleCarousel } from "./components/SimpleCarousel";
import { CheckCircle, Wrench, Users, Award, ArrowUp } from "lucide-react";

export default function AboutUsPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full max-w-full bg-black overflow-x-hidden">
      {/* Hero Section - Esquema invertido: blanco a negro y negro a blanco */}
      <section
        id="hero"
        className="min-h-[70vh] flex flex-col justify-center items-center text-center w-full relative px-4 md:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black -z-10"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center -z-10"></div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white relative">
          <span className="relative inline-block">
            TAPICERIA
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </span>{" "}
          <span className="relative inline-block mt-2">
            CONFORT
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </span>
        </h1>

        <p className="text-xl text-gray-300 mx-auto leading-relaxed max-w-3xl font-light mb-8">
          En Tapicería Automotriz Confort combinamos artesanía tradicional con
          diseños contemporáneos para brindarte máximo confort y estilo, creando
          espacios únicos que reflejan tu personalidad.
        </p>

        <div className="w-32 h-1 bg-gradient-to-r from-[#00AEEF]/70 via-[#00AEEF] to-[#00AEEF]/70 rounded-full my-2"></div>
      </section>

      {/* Projects Section - Esquema invertido: blanco a negro y negro a blanco */}
      <section id="projects" className="w-full px-4 md:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-white relative w-fit mx-auto">
          Nuestros Mejores Proyectos
          <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
        </h2>
        <p className="text-center text-gray-400 mb-10 mx-auto max-w-3xl">
          Explora nuestros proyectos en donde ponemos nuestro mejor esfuerzo en
          cada uno de nuestros trabajos para poder brindarles el mejor servicio
          y calidad a nuestros clientes.
        </p>
        <div className="w-full max-w-6xl mx-auto shadow-xl rounded-lg overflow-hidden">
          <SimpleCarousel />
        </div>
      </section>

      {/* Materials Section - Esquema invertido: blanco a negro y negro a blanco */}
      <section
        id="materials"
        className="w-full px-4 md:px-8 py-16 bg-white text-black"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black relative w-fit mx-auto">
          Materiales Premium
          <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
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
      </section>

      {/* History Section - Esquema invertido: blanco a negro y negro a blanco */}
      <section id="history" className="w-full px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto">
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
                Comenzamos como un pequeño taller familiar y hemos crecido hasta
                convertirnos en una referencia en el sector de la tapicería
                automotriz, manteniendo siempre nuestro compromiso con la
                calidad artesanal y la atención personalizada.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Hoy contamos con un equipo de expertos artesanos, diseñadores y
                técnicos especializados, dedicados a crear soluciones de
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
      </section>

      {/* Services Section - Esquema invertido: blanco a negro y negro a blanco */}
      <section id="services" className="w-full px-4 md:px-8 py-16 bg-gray-900">
        <h2 className="text-3xl font-bold mb-10 text-center text-white relative w-fit mx-auto">
          A qué nos dedicamos
          <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
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
      </section>

      {/* Process Section - Esquema invertido: blanco a negro y negro a blanco */}
      <section id="process" className="w-full py-16">
        <div className="bg-white text-black overflow-hidden w-full px-4 md:px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Proceso de Desarrollo del Tapizado
          </h2>
          <div className="grid md:grid-cols-4 gap-6 relative max-w-6xl mx-auto">
            {/* Línea de conexión */}
            <div className="hidden md:block absolute top-10 left-1/2 h-2 bg-[#00AEEF] w-3/4 -translate-x-1/2 rounded-full"></div>

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
                <div className="bg-[#00AEEF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer z-10 relative">
                  <span className="text-white text-xl font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Esquema invertido: blanco a negro y negro a blanco */}
      <section id="values" className="w-full px-4 md:px-8 py-16">
        <div className="bg-black w-full py-12 px-4 rounded-lg border border-gray-800">
          <h2 className="text-3xl font-bold mb-10 text-center text-white relative w-fit mx-auto">
            Nuestros Valores
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00AEEF]"></span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  className="bg-black shadow-md hover:shadow-2xl transition-all duration-500 group overflow-hidden border-0"
                >
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto bg-[#00AEEF] w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0099d4] transition-all duration-500 group-hover:scale-110">
                      <Icon className="text-white w-8 h-8" />
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

      {/* Scroll to top button - Mantiene colores consistentes con el diseño */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-[#00AEEF] hover:bg-[#0099d4] text-white shadow-xl transition-all hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}
