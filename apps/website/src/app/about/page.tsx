import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about WAFFLELLA's story — a premium dessert shop born from a passion for quality waffles, chocolate, and exceptional pancakes.",
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      <PageHeader namespace="aboutPage" />
      <AboutSection />
    </main>
  );
}
