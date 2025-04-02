import { cn } from "@/lib/utils";
// import { Link } from "lucide-react";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <h2
      className={cn(
        "text-2xl text-sky-100 font-black tracking-wider uppercase hover:text-shop-discount ",
        className
      )}
    >
      TAPICERIA CONFORT <span>t</span>
    </h2>
  );
};

export default Logo;
