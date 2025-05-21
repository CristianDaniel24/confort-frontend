"use client";

import { Card } from "@/components/ui/card";
import { procedureService } from "@/services/procedure.service";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProcedureDetails({ params }: Readonly<Props>) {
  const [procedure, setProcedure] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      const serv = await procedureService.findById(+id);
      setProcedure(serv);
      setLoading(false);
    };
    load();
  }, [params]);

  if (loading || !procedure) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-2xl font-medium leading-none">
              Nombre: {procedure.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Precio: {procedure.price}
            </p>
            <p className="text-xs text-muted-foreground">
              Descripcion: {procedure.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Fecha: {new Date(procedure.date).toLocaleDateString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Estado: {procedure.status}
            </p>
            <p className="text-xs text-muted-foreground">
              Tipo de procedimiento: {procedure.typeProcedure?.type}
            </p>
            <p className="text-lg text-muted-foreground">
              Imagen del producto:
            </p>
            {!imageError[procedure.id] && procedure.imgUrl ? (
              <div className="relative w-full h-60 rounded overflow-hidden">
                <Image
                  src={procedure.imgUrl}
                  alt={procedure.name}
                  fill
                  className="object-contain bg-white"
                  priority
                  unoptimized
                  onError={() =>
                    setImageError((prev) => ({
                      ...prev,
                      [procedure.id]: true,
                    }))
                  }
                />
              </div>
            ) : (
              <div className="w-full h-60 flex flex-col items-center justify-center border rounded bg-muted text-muted-foreground gap-2">
                <ImageOff className="w-10 h-10" />
                <span>Sin imagen</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
