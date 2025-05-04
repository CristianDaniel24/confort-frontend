import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SimpleCarousel } from "./components/SimpleCarousel";

export default function Page() {
  return (
    <main className="px-6 py-10 max-w-5xl mx-auto space-y-10 mt-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Tapiceria Automotriz Confort
        </h1>
        <p className="text-lg text-gray-600">
          Descubre como nuestra experiencia en tapiceria automotriz transforma
          el interior de tu vehiculo en una experiencia de confort y estilo.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Materiales</h2>
            <p className="text-sm text-gray-500">
              Utilizamos cuero, vinil, y telas de alta calidad para asegurar
              durabilidad y elegancia.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Diseño Personalizado</h2>
            <p className="text-sm text-gray-500">
              Personaliza colores, costuras y patrones para que tu vehiculo
              refleje tu estilo.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Instalacion Profesional
            </h2>
            <p className="text-sm text-gray-500">
              Nuestro equipo experto asegura un acabado perfecto en cada
              tapizado.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <p className="text-gray-700 mb-4">
          ¿Listo para renovar tu auto con elegancia y confort?
        </p>
        <Button size="lg">Solicitar Cotizacion</Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Galeria de proyectos
        </h2>
        <SimpleCarousel />
      </section>
    </main>
  );
}
