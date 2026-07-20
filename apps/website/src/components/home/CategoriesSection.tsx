"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CATEGORIES = [
  {
    id: "waffle",
    name: "Waffle",
    nameAr: "وافل",
    icon: "🧇",
    color: "from-amber-50 to-orange-100 border-orange-200",
    href: "/menu?category=waffle",
  },
  {
    id: "bun-cake",
    name: "Bun Cake",
    nameAr: "بان كيك",
    icon: "🎂",
    color: "from-pink-50 to-rose-100 border-rose-200",
    href: "/menu?category=bun-cake",
  },
];

export function CategoriesSection() {
  const { t, isRTL } = useLanguage();

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

        {/* Categories Grid — 2 large cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-2 gap-6 max-w-lg mx-auto"
          role="list"
        >
          {CATEGORIES.map((category) => {
            const categoryName = isRTL ? category.nameAr : category.name;
            return (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.85, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
                }}
                role="listitem"
              >
                <Link
                  href={category.href}
                  id={`category-${category.id}`}
                  className={`flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border-2 bg-gradient-to-b ${category.color} hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group text-center`}
                  aria-label={`Browse ${categoryName}`}
                >
                  <span
                    className="text-6xl group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    {category.icon}
                  </span>
                  <span className="text-brand-text font-bold text-lg leading-tight">
                    {categoryName}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
