"use client";

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
import {
  Car,
  Scissors,
  Star,
  ThumbsUp,
  PenToolIcon as Tools,
  Users,
  ChevronRight,
  Sparkles,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
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
  };

  return (
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
            aria-label="Image by Wirestock de Freepik"
          />
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
  const router = useRouter();

  // Imágenes para el carrusel (reemplaza con tus propias imágenes)
  const carouselImages = [
    "/1carrusel_1.jpg",
    "/carrusel_3.jpg",
    "/carrusel_2.jpg",
  ];
  const handleRedirect = () => {
    router.push("/shop/servicesConfort");
  };

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
      <section className="w-full py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted relative">
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
                    onClick={handleRedirect}
                    aria-label="Ver Servicios"
                  >
                    Ver Servicios
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
                    onClick={() => scrollToSection("historia")}
                    aria-label="Nuestra Mision y Vision"
                  >
                    Nuestra Mision y Vision
                  </Button>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={300} direction="left">
              <ImageCarousel images={carouselImages} />
            </FadeIn>
          </div>
        </div>
      </section>

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

      {/* Historia de la Tapicería - Nueva sección que reemplaza a Productos Destacados */}
      <section
        id="historia"
        className="w-full py-12 md:py-24 lg:py-24 bg-background relative"
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
                  Misión y Visión
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                  Lo que nos inspira a crear excelencia automotriz
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="mx-auto max-w-5xl mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <FadeIn delay={100} direction="right">
                <div className="space-y-6">
                  {/* MISIÓN */}
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Misión
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    En <strong>Confort Tapicería Automotriz</strong>,
                    convertimos tu vehículo en una verdadera obra de arte.
                    Diseñamos interiores con estilo, confort y resistencia,
                    cuidando cada detalle con pasión y dedicación. Nuestro
                    compromiso es que cada auto refleje tu personalidad y se
                    distinga por su calidad y elegancia.
                  </p>

                  {/* VISIÓN */}
                  <div className="flex items-center space-x-3 pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Visión
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Queremos ser tu primera opción en tapicería automotriz,
                    reconocidos por transformar cada interior en una experiencia
                    única. Nuestra meta es crecer contigo, innovar en cada
                    diseño y mantener siempre el más alto estándar de calidad,
                    dejando huella en cada cliente y cada vehículo.
                  </p>
                </div>
              </FadeIn>

              {/* Imagen decorativa (puedes mantener o cambiarla) */}
              <FadeIn delay={300} direction="left">
                <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-xl">
                  <Image
                    src="/historia_imagen.png"
                    alt="Imagen historia Tapiceria confort"
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    aria-label="Image by Tapiceria Confort"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-foreground font-medium">
                        Detalles que hacen la diferencia en cada tapizado
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
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
            ))}
          </div>
        </div>
      </section>

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
              <a
                href="https://wa.me/573174109274"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
                  aria-label="Solicitar Cotización"
                >
                  Solicitar Cotización
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </FadeIn>

          {/* Decoración adicional */}
          <div className="mt-16 flex justify-center">
            <div className="w-20 h-1 bg-primary-foreground/20 rounded-full"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
