import { cn } from "@/lib/utils";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <h2
      className={cn(
        "text-2xl text-sky-100 font-black tracking-wider uppercase hover:text-shop-discount ",
        className
      )}
    >
      TAPICERIA CONFOR
      <span className="text-shop-discount group-hover:text-shop-primary-dark hoverEffect">
        T
      </span>
    </h2>
  );
};

export default Logo;
