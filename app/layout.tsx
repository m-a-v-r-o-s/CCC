import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import { CartProvider } from "@/components/CartContext";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Cycles Custom Cult — One-of-One Custom Motorcycles",
  description:
    "Cycles Custom Cult builds bespoke custom motorcycles. Every machine is one of one — handbuilt, rider-specific, and built to ride.",
  openGraph: {
    title: "Cycles Custom Cult",
    description: "One-of-one custom motorcycles, handbuilt.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageProvider>
          <CartProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
            <CookieConsent />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
