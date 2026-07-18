"use client";

import Link from "next/link";
import { Instagram, Facebook, Phone, MapPin, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@wafflella/hooks";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { data: settings } = useSettings();

  const shopName = settings?.shopName || "WAFFLELLA";

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const categories = [
    "Waffle",
    "Bun Cake",
  ];

  return (
    <footer
      className="bg-brand-text text-white"
      aria-label="Site footer"
    >
      {/* Main Footer */}
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.jpg" alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-soft" />
              <span className="font-heading text-xl font-bold">{shopName.toUpperCase()}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={settings?.facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-primary flex items-center justify-center transition-colors duration-200"
                aria-label={`${shopName} on Facebook`}
              >
                <Facebook size={16} />
              </a>
              <a
                href={settings?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-primary flex items-center justify-center transition-colors duration-200"
                aria-label={`${shopName} on Instagram`}
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-3" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              {t.footer.ourMenu}
            </h3>
            <ul className="space-y-3" role="list">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href="/menu"
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm text-white/80 uppercase tracking-wider mb-4">
              {t.footer.contactUs}
            </h3>
            <ul className="space-y-4" role="list">
              <li>
                <a
                  href={`tel:+2${settings?.phone || "01003439023"}`}
                  className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200 group"
                  aria-label={`Call ${shopName}`}
                >
                  <span className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-brand-primary flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                    <Phone size={14} />
                  </span>
                  <span dir="ltr">{settings?.phone || "010 0343 9023"}</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-white/60 text-sm">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} />
                  </span>
                  <span>{settings?.address || t.footer.findOnMaps}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-narrow py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm" dir="ltr">
            &copy; {currentYear} {shopName.toUpperCase()}. {t.footer.rights}
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1.5 flex-wrap justify-center">
            {t.footer.madeWith}{" "}
            <a 
              href="https://adelshabayek.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/20 hover:decoration-brand-primary"
            >
              {t.footer.byAdel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
