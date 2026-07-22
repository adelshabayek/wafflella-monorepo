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

  const phone = settings?.whatsapp ?? "+201003439023";
  const waUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=Hello%20WAFFLELLA!%20I'd%20like%20to%20place%20an%20order.`;

  return (
    <AnimatePresence>
      {isVisible && !isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          className={`fixed bottom-6 z-50 ${isRTL ? "left-6" : "right-6"}`}
          role="complementary"
          aria-label="WhatsApp contact"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`absolute bottom-full mb-3 whitespace-nowrap bg-white text-brand-text text-sm font-medium px-4 py-2 rounded-2xl shadow-float border border-brand-border ${
                  isRTL ? "left-0" : "right-0"
                }`}
                style={{ transformOrigin: isRTL ? "left bottom" : "right bottom" }}
              >
                💬 {t.whatsapp.chatTooltip}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-float-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-float hover:shadow-card-hover transition-shadow duration-300 relative"
              style={{ backgroundColor: "#25D366" }}
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle size={26} className="text-white fill-white" />
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
