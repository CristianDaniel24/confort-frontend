import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "ShopCart Online Store",
  },
  description: "ShopCart Online Store",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased ">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
