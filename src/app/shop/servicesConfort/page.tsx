"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { IService } from "@/types/service-interface";
import { serviceService } from "@/services/service.service";
import { CaptionsOff } from "lucide-react";

export default function ServicesEcommer() {
  const [services, setServices] = useState<IService[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const data = await serviceService.getAll();
      setServices(data);
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mt-20">
      <div className="mb-6">
        <Input
          placeholder="Buscar servicio por nombre..."
          className="w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-muted-foreground h-96">
          <CaptionsOff className="w-12 h-12 mb-2" />
          <p>No hay servicios disponibles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 
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
                <Badge>{service.category}</Badge>
                {/* Si quieres permitir agendar o contratar el servicio:
                <Button className="w-full cursor-pointer">Solicitar</Button>
                  */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
