import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { FloatingCart } from "@/components/shared/FloatingCart";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ResponsiveToaster } from "@/components/shared/ResponsiveToaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const getBaseUrl = () => {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "WAFFLELLA — Premium Dessert Shop",
    template: "%s | WAFFLELLA",
  },
  description:
    "Experience the finest waffles, chocolate desserts, coffee, and cold drinks at WAFFLELLA — where every bite is crafted with love and premium ingredients.",
  keywords: [
    "WAFFLELLA",
    "waffles",
    "dessert shop",
    "chocolate",
    "coffee",
    "cold drinks",
    "premium desserts",
    "waffle shop",
  ],
  authors: [{ name: "WAFFLELLA" }],
  creator: "WAFFLELLA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wafflella.com",
    siteName: "WAFFLELLA",
    title: "WAFFLELLA — Premium Dessert Shop",
    description:
      "Experience the finest waffles, chocolate desserts, coffee, and cold drinks at WAFFLELLA.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "WAFFLELLA Premium Dessert Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WAFFLELLA — Premium Dessert Shop",
    description:
      "Experience the finest waffles, chocolate desserts, coffee, and cold drinks at WAFFLELLA.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/logo.png' },
    ],
    apple: [
      { url: '/images/logo.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${playfair.variable} ${cairo.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-background antialiased overflow-x-hidden">
        <QueryProvider>
          <LanguageProvider>
            <CartProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingWhatsApp />
              <FloatingCart />
              <ResponsiveToaster />
            </CartProvider>
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
