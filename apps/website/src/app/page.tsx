import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import dynamic from "next/dynamic";

// Lazy-load below-fold sections to reduce initial bundle
const CategoriesSection = dynamic(() =>
  import("@/components/home/CategoriesSection").then((m) => ({ default: m.CategoriesSection })),
  { ssr: true }
);
const AboutSection = dynamic(() =>
  import("@/components/home/AboutSection").then((m) => ({ default: m.AboutSection })),
  { ssr: true }
);
const ContactSection = dynamic(() =>
  import("@/components/home/ContactSection").then((m) => ({ default: m.ContactSection })),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "WAFFLELLA — Premium Dessert Shop",
  description:
    "Experience the finest waffles, chocolate desserts, coffee, and cold drinks at WAFFLELLA — where every bite is crafted with love.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
