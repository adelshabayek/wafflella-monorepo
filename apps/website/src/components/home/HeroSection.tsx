"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero"
      aria-label="Hero section"
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #E91E63, #FFB6C1)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B4513, #FFB6C1)" }}
        aria-hidden="true"
      />

      {/* Floating dots — CSS animated, zero JS cost */}
      <div className="absolute rounded-full bg-brand-primary/20 pointer-events-none hero-dot" style={{ width: 8, height: 8, top: "20%", left: "10%", animationDuration: "3s", animationDelay: "0s" }} aria-hidden="true" />
      <div className="absolute rounded-full bg-brand-primary/20 pointer-events-none hero-dot" style={{ width: 12, height: 12, top: "60%", left: "15%", animationDuration: "3.5s", animationDelay: "0.4s" }} aria-hidden="true" />
      <div className="absolute rounded-full bg-brand-primary/20 pointer-events-none hero-dot" style={{ width: 6, height: 6, top: "35%", left: "60%", animationDuration: "4s", animationDelay: "0.8s" }} aria-hidden="true" />
      <div className="absolute rounded-full bg-brand-primary/20 pointer-events-none hero-dot" style={{ width: 10, height: 10, top: "75%", left: "70%", animationDuration: "4.5s", animationDelay: "1.2s" }} aria-hidden="true" />
      <div className="absolute rounded-full bg-brand-primary/20 pointer-events-none hero-dot" style={{ width: 8, height: 8, top: "50%", left: "80%", animationDuration: "5s", animationDelay: "1.6s" }} aria-hidden="true" />
      <div className="absolute rounded-full bg-brand-primary/20 pointer-events-none hero-dot" style={{ width: 14, height: 14, top: "25%", left: "45%", animationDuration: "5.5s", animationDelay: "2s" }} aria-hidden="true" />

      <div className="container-narrow relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-24 pb-16">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-start rtl:text-right"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex mb-6">
            <span className="flex items-center gap-2 glass text-brand-primary text-sm font-medium px-4 py-2 rounded-full shadow-soft">
              <Sparkles size={14} />
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-text leading-[1.1] mb-6"
          >
            {t.hero.headline1}{" "}
            <span className="text-gradient block sm:inline">{t.hero.headline2}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-brand-muted text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 rtl:lg:mr-0 rtl:lg:ml-auto"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start rtl:lg:justify-start"
          >
            <Link
              href="/menu"
              id="hero-order-cta"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white font-semibold rounded-2xl hover:bg-brand-primary-hover transition-all duration-200 shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 text-base"
            >
              {t.hero.orderNow}
              <ArrowRight size={18} className="rtl:rotate-180" />
            </Link>
            <Link
              href="/menu"
              id="hero-browse-cta"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-text font-semibold rounded-2xl border border-brand-border hover:border-brand-primary hover:text-brand-primary transition-all duration-200 hover:-translate-y-0.5 text-base shadow-card"
            >
              {t.hero.browseMenu}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 sm:gap-8 mt-12 justify-center lg:justify-start rtl:lg:justify-start"
          >
            {t.hero.stats.map(({ value, label }) => (
              <div key={label} className="text-center lg:text-start rtl:text-right">
                <div className="font-heading text-2xl font-bold text-brand-primary">
                  {value}
                </div>
                <div className="text-brand-muted text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Main circle */}
          <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px]">
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

            {/* Floating badge 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-2 sm:-top-4 right-2 sm:right-8 glass shadow-float rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-1.5 sm:gap-2 rtl:left-2 rtl:sm:left-8 rtl:right-auto z-10"
            >
              <span className="text-xl sm:text-2xl">☕</span>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-brand-text leading-tight">{t.hero.floatingCoffee}</div>
                <div className="text-[9px] sm:text-xs text-brand-muted leading-tight">{t.hero.floatingCoffeeDesc}</div>
              </div>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-2 sm:-bottom-4 left-2 sm:left-8 glass shadow-float rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-1.5 sm:gap-2 rtl:right-2 rtl:sm:right-8 rtl:left-auto z-10"
            >
              <span className="text-xl sm:text-2xl">🍫</span>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-brand-text leading-tight">{t.hero.floatingChoco}</div>
                <div className="text-[9px] sm:text-xs text-brand-muted leading-tight">{t.hero.floatingChocoDesc}</div>
              </div>
            </motion.div>

            {/* Floating badge 3 */}
            <motion.div
              animate={{ x: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -left-2 sm:-left-6 -translate-y-1/2 bg-gradient-brand shadow-float rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 rtl:-right-2 rtl:sm:-right-6 rtl:-left-auto border border-white/20 z-10"
            >
              <div className="text-white text-[10px] sm:text-xs font-semibold leading-tight">{t.hero.floatingOffer}</div>
              <div className="text-white/80 text-[9px] sm:text-xs leading-tight">{t.hero.floatingOfferDesc}</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-brand-muted text-xs tracking-widest uppercase">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-brand-muted/40 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-brand-muted/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
