import type { Metadata } from 'next';
import ClientLayout from "@/components/ClientLayout"; // Check this path!
import "./globals.css";

export const metadata: Metadata = {
  title: 'Sangvita Nutri Pharma | Science of Better Living',
  icons: {
    icon: '/logo2.png',
    shortcut: '/logo2.png',
    apple: '/logo2.png',
  },
  description: 'Leading nutraceutical manufacturer in Bihar. High-quality tablets, capsules, and wellness solutions for metabolic health and immunity.',
  keywords: ['Nutraceuticals Bihar', 'Sangvita Nutri Pharma', 'Health Supplements India', 'Metabolic Wellness', 'Science of Better Living'],
  metadataBase: new URL('https://sangvita.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sangvita Nutri Pharma - Science of Better Living',
    description: 'Advanced nutraceutical formulations for a healthier future.',
    url: 'https://sangvita.in',
    siteName: 'Sangvita Nutri Pharma',
    images: [{ url: '/logo.jpeg', width: 800, height: 600, alt: 'Sangvita Nutri Pharma Logo' }],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Flipkart-style Sitelinks & Social Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sangvita Nutri Pharma",
              "url": "https://sangvita.in",
              "logo": "https://sangvita.in/logo.jpeg",
              "sameAs": [
                "https://www.instagram.com/sangvita_nutri_pharma",
                "https://www.linkedin.com/company/sangvita-nutri-pharma",
                "https://www.facebook.com/share/1HWiNv7U8t/"
              ],
              "hasPart": [
                {
                  "@type": "WebPage",
                  "name": "Our Products",
                  "url": "https://sangvita.in/user/products"
                },
                {
                  "@type": "WebPage",
                  "name": "About Us",
                  "url": "https://sangvita.in/user/about"
                }
              ]
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* We wrap everything in the ClientLayout to handle the Header/Footer logic */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}