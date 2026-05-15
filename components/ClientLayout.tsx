"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const isAdminRoute = pathname?.startsWith("/admin");
  const isProductsRoute = pathname?.startsWith("/user/products/");

  useEffect(() => {
    if (pathname === "/" || pathname === "") {
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  const showHeaderFooter = !isAdminRoute && !isProductsRoute && !isLoading;

  return (
    <>
      {showHeaderFooter && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {showHeaderFooter && <Footer />}
    </>
  );
}