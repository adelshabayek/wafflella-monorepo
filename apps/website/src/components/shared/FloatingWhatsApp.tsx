"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@wafflella/hooks";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingWhatsApp() {
  const { data: settings } = useSettings();
  const { isOpen } = useCart();
  const { isRTL, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const phone = settings?.whatsapp ?? "01003439023";
  const waUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=Hello%20WAFFLELLA!%20I'd%20like%20to%20place%20an%20order.`;

  return (
    <AnimatePresence>
      {isVisible && !isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          className={`fixed bottom-6 z-50 flex flex-col gap-2 ${isRTL ? "left-6 items-start" : "right-6 items-end"}`}
          role="complementary"
          aria-label="WhatsApp contact"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white text-brand-text text-sm font-medium px-4 py-2 rounded-2xl shadow-float border border-brand-border whitespace-nowrap"
              >
                💬 {t.whatsapp.chatTooltip}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="whatsapp-float-btn"
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-float hover:shadow-card-hover transition-shadow duration-300"
            style={{ backgroundColor: "#25D366" }}
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle size={26} className="text-white fill-white" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
