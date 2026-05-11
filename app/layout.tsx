"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isProductsRoute = pathname.startsWith("/user/products/");

  const [isLoading, setIsLoading] = useState(true);

  // Detect when homepage is loading (simple approach)
  useEffect(() => {
    // If we're on homepage, wait a bit then hide loader
    if (pathname === "/" || pathname === "") {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Match with your loader timing

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  const showHeaderFooter = !isAdminRoute && !isProductsRoute && !isLoading;

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {showHeaderFooter && <Header />}
        
        <main className="flex-grow">
          {children}
        </main>

        {showHeaderFooter && <Footer />}
      </body>
    </html>
  );
}