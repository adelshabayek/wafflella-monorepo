"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Facebook, Instagram, MapPin } from "lucide-react";
import { useSettings } from "@wafflella/hooks";
import { useLanguage } from "@/contexts/LanguageContext";



export function ContactSection() {
  const { data: settings } = useSettings();
  const { t } = useLanguage();

  const contactItems = [
    {
      id: "phone",
      icon: Phone,
      label: t.contact.phone,
      value: settings?.phone ?? "01003439023",
      href: `tel:+2${settings?.phone ?? "01003439023"}`,
      color: "bg-blue-50 border-blue-200 text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: settings?.whatsapp ?? "01003439023",
      href: `https://wa.me/${(settings?.whatsapp ?? "01003439023").replace(/\D/g, "")}`,
      color: "bg-green-50 border-green-200 text-green-600",
      iconBg: "bg-green-100",
      external: true,
    },
    {
      id: "facebook",
      icon: Facebook,
      label: t.contact.facebook,
      value: t.contact.followFacebook,
      href: settings?.facebook ?? "https://facebook.com",
      color: "bg-indigo-50 border-indigo-200 text-indigo-600",
      iconBg: "bg-indigo-100",
      external: true,
    },
    {
      id: "instagram",
      icon: Instagram,
      label: t.contact.instagram,
      value: "__wafflella.sweets",
      href: settings?.instagram ?? "https://instagram.com/__wafflella.sweets",
      color: "bg-pink-50 border-pink-200 text-pink-600",
      iconBg: "bg-pink-100",
      external: true,
    },
  ];

  return (
    <section className="section-padding bg-gradient-warm" aria-labelledby="contact-heading">
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
            ✦ {t.contact.badge}
          </span>
          <h2
            id="contact-heading"
            className="font-heading text-4xl sm:text-5xl font-bold text-brand-text mb-4"
          >
            {t.contact.title}
          </h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto">
            {t.contact.description}
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
        >
          {contactItems.map(({ id, icon: Icon, label, value, href, color, iconBg, external }) => (
            <motion.a
              key={id}
              id={`contact-${id}`}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`flex flex-col items-center gap-4 p-6 rounded-3xl border bg-white shadow-card hover:shadow-card-hover transition-all duration-300 group`}
              aria-label={`${label}: ${value}`}
            >
              <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} className={color.split(" ")[2]} />
              </div>
              <div className="text-center">
                <div className="font-semibold text-brand-text text-sm">{label}</div>
                <div className="text-brand-muted text-xs mt-1">{value}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Map Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl overflow-hidden shadow-card border border-brand-border"
          aria-label="Location map"
        >
          <div className="bg-brand-primary-light h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={40} className="text-brand-primary mx-auto mb-3" aria-hidden="true" />
              <p className="font-semibold text-brand-text">{t.contact.findOnMaps}</p>
              <p className="text-brand-muted text-sm mt-1">
                {settings?.address ?? "Cairo, Egypt"}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(settings?.address ?? "WAFFLELLA Cairo Egypt")}`}
                target="_blank"
                rel="noopener noreferrer"
                id="google-maps-link"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-hover transition-colors duration-200"
              >
                {t.contact.openMaps}
                <MapPin size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
