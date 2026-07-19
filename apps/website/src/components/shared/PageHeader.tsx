"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function PageHeader({ namespace }: { namespace: 'aboutPage' | 'contactPage' }) {
  const { t } = useLanguage();
  const data = t[namespace];

  return (
    <section className="bg-gradient-hero py-20">
      <div className="container-narrow text-center">
        <span className="inline-block text-brand-primary text-sm font-semibold tracking-widest uppercase mb-4">
          {data.badge}
        </span>
        <h1 className="font-heading text-5xl sm:text-6xl font-bold text-brand-text mb-4">
          {data.title}
        </h1>
        <p className="text-brand-muted text-xl max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>
    </section>
  );
}
