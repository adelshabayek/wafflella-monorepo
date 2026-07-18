"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useFeaturedProducts } from "@wafflella/hooks";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductCardSkeleton } from "@/components/shared/Skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturedProducts() {
  const { data: products = [], isLoading } = useFeaturedProducts();
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white" aria-labelledby="featured-heading">
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-primary text-sm font-semibold tracking-widest uppercase mb-3">
            ✦ {t.featured.badge}
          </span>
          <h2
            id="featured-heading"
            className="font-heading text-4xl sm:text-5xl font-bold text-brand-text mb-4"
          >
            {t.featured.title}
          </h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto">
            {t.featured.description}
          </p>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4" aria-hidden="true">🍽️</div>
            <p className="text-brand-muted">{t.featured.empty}</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 flex justify-center"
        >
          <Link
            href="/menu"
            id="featured-view-all"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-primary text-brand-primary font-semibold rounded-2xl hover:bg-brand-primary hover:text-white transition-all duration-300"
          >
            {t.featured.viewAll}
            <ArrowRight size={18} className="rtl:rotate-180" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
