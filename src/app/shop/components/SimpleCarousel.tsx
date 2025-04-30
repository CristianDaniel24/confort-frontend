// src/components/SimpleCarousel.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
};

export function SimpleCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <img
        src={images[index]}
        alt={`slide ${index}`}
        className="w-full h-120 object-cover rounded-xl shadow-md"
      />
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button variant="ghost" size="icon" onClick={prev}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={next}>
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
