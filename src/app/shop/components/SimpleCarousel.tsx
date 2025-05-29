"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Image {
  id: number;
  url: string;
  author: string;
}

export function SimpleCarousel() {
  const images: Image[] = [
    { id: 1, url: "/carrusel_1.png", author: "Intricate Explorer" },
    { id: 2, url: "/carrusel_2.png", author: "Intricate Explorer" },
    { id: 3, url: "/carrusel_3.png", author: "Intricate Explorer" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id} className="relative">
              <div className="h-120 w-full overflow-hidden rounded-xl shadow-md">
                <Image
                  src={image.url}
                  alt={`Imagen carro. Autor: ${image.author}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  aria-label={image.author}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
