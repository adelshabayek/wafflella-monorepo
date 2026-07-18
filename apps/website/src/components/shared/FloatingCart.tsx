"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCart() {
  const { totalItems, open, isOpen } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && !isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          className="fixed bottom-[96px] right-6 z-40 flex flex-col items-end gap-2"
        >
          <motion.button
            onClick={open}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-float hover:shadow-card-hover transition-shadow duration-300 border border-brand-border"
            aria-label="Open cart"
          >
            <ShoppingCart size={24} className="text-brand-text" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={totalItems}
              className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-soft border-2 border-white"
            >
              {totalItems}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
