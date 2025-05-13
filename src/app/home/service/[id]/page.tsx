"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ImageOff } from "lucide-react";
import { serviceService } from "@/services/service.service";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ServiceDetails({ params }: Readonly<Props>) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      const serv = await serviceService.findById(+id);
      setService(serv);
      setLoading(false);
    };
    load();
  }, [params]);

  if (loading || !service) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-2xl font-medium leading-none">
              Nombre: {service.name}
            </h3>
            <p className="text-lg text-muted-foreground">
              Precio: {service.price}
            </p>
            <p className="text-lg text-muted-foreground">
              Descripcion: {service.description}
            </p>
            <p className="text-lg text-muted-foreground">
              Imagen del producto:
            </p>
            {!imageError[service.id] && service.imgUrl ? (
              <div className="relative w-full h-60 rounded overflow-hidden">
                <Image
                  src={service.imgUrl}
                  alt={service.name}
                  fill
                  className="object-contain bg-white"
                  priority
                  unoptimized
                  onError={() =>
                    setImageError((prev) => ({
                      ...prev,
                      [service.id]: true,
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
