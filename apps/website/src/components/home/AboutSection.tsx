"use client";

import { motion } from "framer-motion";
import { Award, Heart, Leaf, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  const valuesIcons = [Heart, Leaf, Award, Clock];

  return (
    <section className="section-padding bg-white" aria-labelledby="about-heading">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
            aria-hidden="true"
          >
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] mx-auto">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-15 blur-3xl scale-110" />
              <div className="absolute inset-0 rounded-full glass shadow-float" />

              {/* Waffle 3D visual */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center p-4 sm:p-8">
                <motion.img
                  src="/images/hero_waffle.png"
                  alt="Premium Waffle"
                  className="w-full h-full object-contain select-none mix-blend-multiply"
                  style={{ 
                    filter: 'contrast(1.1) brightness(1.05) drop-shadow(0px 20px 30px rgba(0,0,0,0.1))',
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)'
                  }}
                  animate={{ rotate: [0, 3, -3, 0], y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                />
              </div>

              {/* Stat card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-2 rtl:left-4 ltr:right-4 bg-brand-primary text-white p-5 rounded-3xl shadow-float z-10"
              >
                <div className="font-heading text-3xl font-bold text-center">5★</div>
                <div className="text-white/80 text-sm mt-0.5 text-center">{t.about.ratedPremium}</div>
              </motion.div>

              {/* Experience card */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute top-4 rtl:-right-2 ltr:-left-2 bg-white p-4 rounded-2xl shadow-float border border-brand-border z-10"
              >
                <div className="font-heading text-2xl font-bold text-brand-text text-center">100%</div>
                <div className="text-brand-muted text-xs text-center">{t.about.freshTaste}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-start"
          >
            <span className="inline-block text-brand-primary text-sm font-semibold tracking-widest uppercase mb-4">
              ✦ {t.about.badge}
            </span>
            <h2
              id="about-heading"
              className="font-heading text-4xl sm:text-5xl font-bold text-brand-text mb-6 leading-tight"
            >
              {t.about.title1}{" "}
              <span className="text-gradient">{t.about.titleHighlight}</span>{" "}
              {t.about.title2}
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed mb-6">
              {t.about.paragraph1}
            </p>
            <p className="text-brand-muted text-lg leading-relaxed mb-10">
              {t.about.paragraph2}
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.about.values.map(({ title, description }, index) => {
                const Icon = valuesIcons[index] as React.ElementType;
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-brand-background border border-brand-border hover:border-brand-secondary transition-colors duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-primary-light flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon size={16} className="text-brand-primary" />}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-text text-sm">{title}</div>
                      <div className="text-brand-muted text-xs mt-0.5 leading-relaxed">
                        {description}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
