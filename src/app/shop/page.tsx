"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Fondo de imagen fijo */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src="/images/fondo2.png"
          alt="Fondo elegante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Sección Hero */}
      <motion.section
        id="hero"
        className="min-h-[60vh] flex flex-col justify-center items-center text-center py-8 relative"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <img
          src="/images/hero.jpg"
          alt="Tapicería Confort"
          className="absolute inset-0 object-cover w-full h-full -z-10"
        />
        <h1 className="text-5xl font-bold mb-4 text-white relative drop-shadow-lg z-10">
          <span className="inline-block">TAPICERIA</span>{" "}
          <span className="inline-block">CONFORT</span>
        </h1>
        <p className="text-lg text-gray-100 max-w-3xl mx-auto leading-relaxed z-10">
          En Tapicería Automotriz Confort combinamos artesanía tradicional con diseños contemporáneos para brindarte máximo confort y estilo.
        </p>
      </motion.section>

      {/* Sección de materiales */}
      <motion.section
        className="max-w-6xl mx-auto py-20 px-4 grid gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros materiales</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Cuero Genuino",
              desc: "Durabilidad, elegancia y prestigio con las mejores pieles.",
              image: "/images/cuero.jpg",
            },
            {
              title: "Alcántara",
              desc: "Aspecto de gamuza que aporta un toque deportivo y lujoso.",
              image: "/images/alcantara.jpg",
            },
            {
              title: "Vinilo de Alta Resistencia",
              desc: "Práctico, duradero y resistente al agua, rayos UV y desgaste.",
              image: "/images/vinilo.jpg",
            },
          ].map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
              <Card className="border border-white/20 hover:shadow-xl transition-all duration-500 group overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-yellow-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Historia / taller */}
      <motion.section
        className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <div>
          <h2 className="text-3xl font-bold mb-4 text-white">Más de 20 años tapizando historias</h2>
          <p className="text-gray-300 mb-4">
            Nuestra experiencia no solo se mide en años, sino en la confianza que nuestros clientes han depositado en nosotros. Cada volante,
            asiento o panel que restauramos cuenta una historia de dedicación y perfección.
          </p>
          <Badge className="bg-yellow-600 text-white px-4 py-1 text-sm rounded-full">Hecho en Colombia con pasión</Badge>
        </div>
        <div className="h-64 rounded-xl overflow-hidden shadow-lg border border-white/20">
          <img
            src="/images/taller.jpg"
            alt="Nuestro taller"
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.section>

      {/* Proyectos destacados */}
      <motion.section
        className="max-w-6xl mx-auto px-4 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Transformaciones que hablan por sí solas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["proyecto1.jpg", "proyecto2.jpg", "proyecto3.jpg"].map((img, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-lg border border-white/10">
              <img
                src={`/images/${img}`}
                alt={`Proyecto ${index + 1}`}
                className="w-full h-60 object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
