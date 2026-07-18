"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCategories } from "@wafflella/hooks";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryIcons: Record<string, string> = {
  waffles: "🧇",
  waffle: "🧇",
  chocolate: "🍫",
  coffee: "☕",
  "cold drinks": "🥤",
  "hot drinks": "🍵",
  "special offers": "🎁",
  bun: "🍞",
  "bun cake": "🍞",
};

function getCategoryIcon(name: string): string {
  const key = name.toLowerCase();
  for (const [k, v] of Object.entries(categoryIcons)) {
    if (key.includes(k)) return v;
  }
  return "🍽️";
}

const categoryColors = [
  "from-pink-50 to-rose-100 border-rose-200",
  "from-amber-50 to-orange-100 border-orange-200",
  "from-violet-50 to-purple-100 border-purple-200",
  "from-blue-50 to-cyan-100 border-cyan-200",
  "from-emerald-50 to-green-100 border-green-200",
  "from-red-50 to-pink-100 border-pink-200",
];

export function CategoriesSection() {
  const { data: categories = [], isLoading } = useCategories();
  const { t, isRTL } = useLanguage();

  // Static fallback categories if Firestore not seeded yet
  const fallbackCategories = [
    { id: "1", name: "Waffles", nameAr: "وافل", order: 1 },
    { id: "2", name: "Chocolate", nameAr: "شوكولاتة", order: 2 },
    { id: "3", name: "Coffee", nameAr: "قهوة", order: 3 },
    { id: "4", name: "Cold Drinks", nameAr: "مشروبات باردة", order: 4 },
    { id: "5", name: "Hot Drinks", nameAr: "مشروبات ساخنة", order: 5 },
    { id: "6", name: "Special Offers", nameAr: "عروض خاصة", order: 6 },
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  return (
    <section
      className="section-padding bg-gradient-warm"
      aria-labelledby="categories-heading"
    >
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-primary text-sm font-semibold tracking-widest uppercase mb-3">
            ✦ {t.categories.badge}
          </span>
          <h2
            id="categories-heading"
            className="font-heading text-4xl sm:text-5xl font-bold text-brand-text mb-4"
          >
            {t.categories.title}
          </h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto">
            {t.categories.description}
          </p>
        </motion.div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-3xl bg-white/60 animate-pulse"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            role="list"
          >
            {displayCategories.map((category, index) => {
              const categoryName = isRTL && (category as any).nameAr ? (category as any).nameAr : category.name;
              
              return (
                <motion.div
                  key={category.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  role="listitem"
                >
                  <Link
                    href={`/menu?category=${category.id}`}
                    id={`category-${category.id}`}
                    className={`flex flex-col items-center justify-center gap-3 p-5 rounded-3xl border bg-gradient-to-b ${categoryColors[index % categoryColors.length]} hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group text-center`}
                    aria-label={`Browse ${categoryName}`}
                  >
                    <span
                      className="text-4xl group-hover:scale-110 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      {getCategoryIcon(category.name)}
                    </span>
                    <span className="text-brand-text font-semibold text-sm leading-tight">
                      {categoryName}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
