"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@wafflella/hooks";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, open } = useCart();
  const { lang, t, toggleLanguage, isRTL } = useLanguage();
  const { data: settings } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const logoSrc = "/images/logo.jpg";
  const shopName = settings?.shopName || "Wafflella";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-dark shadow-soft py-3 border-b border-white/40"
          : "bg-transparent py-5"
      )}
      role="banner"
    >
      <nav
        className="container-narrow flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="WAFFLELLA Home"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-primary-light shadow-soft group-hover:scale-105 transition-transform duration-200">
            <img
              src={logoSrc}
              alt={`${shopName} Logo`}
              className="object-cover w-full h-full bg-white"
              onError={(e) => {
                const firstChar = shopName.charAt(0).toUpperCase() || "W";
                (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FCE4EC'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='40' fill='%23E91E63'%3E${firstChar}%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold text-brand-text tracking-tight leading-none">
              {shopName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-primary mt-1 font-semibold">
              Sweet Moments
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul
          className="hidden md:flex items-center gap-1"
          role="list"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-brand-primary"
                      : "text-brand-muted hover:text-brand-text"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-brand-primary-light rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA, Cart & Lang */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            id="lang-toggle"
            className="hidden items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-border bg-white hover:border-brand-primary hover:text-brand-primary text-brand-muted text-xs font-bold transition-all duration-200"
            aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
          >
            <span className={cn("transition-all", lang === "en" ? "text-brand-primary" : "text-brand-muted")}>EN</span>
            <span className="text-brand-border">|</span>
            <span className={cn("transition-all", lang === "ar" ? "text-brand-primary" : "text-brand-muted")}>ع</span>
          </button>

          {/* Cart */}
          <button
            onClick={open}
            className="relative p-2 text-brand-muted hover:text-brand-text transition-colors duration-200"
            aria-label="Open cart"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/4 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-soft">
                {totalItems}
              </span>
            )}
          </button>

          {/* Order Now */}
          <Link
            href="/menu"
            id="navbar-order-cta"
            className="px-5 py-2.5 bg-gradient-brand text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all duration-200 shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 border border-white/20"
          >
            {t.nav.orderNow}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-brand-border transition-colors duration-200"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden glass-dark border-t border-brand-border"
          >
            <ul
              className="container-narrow py-4 flex flex-col gap-1"
              role="list"
            >
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "bg-brand-primary-light text-brand-primary"
                          : "text-brand-muted hover:bg-brand-border hover:text-brand-text"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {/* Lang toggle mobile */}
                  <button
                    onClick={toggleLanguage}
                    className="hidden items-center gap-1.5 px-4 py-3 bg-white border border-brand-border rounded-xl text-xs font-bold hover:border-brand-primary transition-colors duration-200"
                  >
                    <span className={cn(lang === "en" ? "text-brand-primary" : "text-brand-muted")}>EN</span>
                    <span className="text-brand-border">|</span>
                    <span className={cn(lang === "ar" ? "text-brand-primary" : "text-brand-muted")}>ع</span>
                  </button>
                  <button
                    onClick={open}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary-light text-brand-primary text-sm font-semibold rounded-xl hover:bg-brand-primary-light/80 transition-colors duration-200"
                  >
                    <ShoppingCart size={18} />
                    {t.nav.cart} {totalItems > 0 && `(${totalItems})`}
                  </button>
                  <Link
                    href="/menu"
                    onClick={() => setIsMobileOpen(false)}
                    id="mobile-order-cta"
                    className="flex-[2] block px-4 py-3 bg-gradient-brand text-white text-sm font-semibold rounded-xl text-center hover:opacity-90 transition-colors duration-200"
                  >
                    {t.nav.orderNow}
                  </Link>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
