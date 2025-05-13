import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "./components/Footer";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn("min-h-screen flex flex-col", inter.className)}>
      <Header />
      <main className="flex-1 container mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
