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
}

export const SimpleCarousel = () => {
  const images: Image[] = [
    { id: 1, url: "/carrusel_1.jpg" },
    { id: 2, url: "/carrusel_2.jpg" },
    { id: 3, url: "/carrusel_3.jpg" },
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
                  alt={`slide ${image.id}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
};
