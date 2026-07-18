import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about WAFFLELLA's story — a premium dessert shop born from a passion for quality waffles, chocolate, and exceptional coffee.",
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Page Header */}
      <section className="bg-gradient-hero py-20">
        <div className="container-narrow text-center">
          <span className="inline-block text-brand-primary text-sm font-semibold tracking-widest uppercase mb-4">
            ✦ Our Journey
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-brand-text mb-4">
            About WAFFLELLA
          </h1>
          <p className="text-brand-muted text-xl max-w-2xl mx-auto">
            A story of passion, quality, and an unwavering love for exceptional desserts.
          </p>
        </div>
      </section>
      <AboutSection />
    </main>
  );
}
