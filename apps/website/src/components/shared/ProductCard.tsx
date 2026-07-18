"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@wafflella/types";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { memo, useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "compact";
}

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FCE4EC'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='48' fill='%23E91E63'%3E🧇%3C/text%3E%3C/svg%3E";

export const ProductCard = memo(function ProductCard({ product, index = 0, variant = "default" }: ProductCardProps) {
  const { add } = useCart();
  const { isRTL } = useLanguage();
  const [qty, setQty] = useState(1);

  const name = isRTL && product.nameAr ? product.nameAr : product.name;
  const description = isRTL && product.descriptionAr ? product.descriptionAr : product.description;

  const imageUrl = product.image ? product.image.replace('.png', '.webp') : PLACEHOLDER_IMAGE;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={cn(
        "group bg-white rounded-3xl overflow-hidden border border-brand-border/60 shadow-card hover:shadow-card-hover transition-all duration-300",
        !product.available && "opacity-60"
      )}
      aria-label={`${name} - ${product.price} EGP`}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gradient-warm">
        <div
          className={cn(
            "relative",
            variant === "compact" ? "h-44" : "h-56"
          )}
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* View icon */}
          <div className="absolute top-3 ltr:right-3 rtl:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-soft">
              <Eye size={14} className="text-brand-primary" />
            </div>
          </div>
        </div>

        {/* Availability Badge */}
        {!product.available && (
          <div className="absolute top-3 ltr:left-3 rtl:right-3 bg-white/90 backdrop-blur-sm text-brand-muted text-xs font-medium px-3 py-1 rounded-full">
            Unavailable
          </div>
        )}
        {product.featured && product.available && (
          <div className="absolute top-3 ltr:left-3 rtl:right-3 bg-brand-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow-soft">
            ✦ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-text mb-1.5 line-clamp-1" dir={isRTL ? "rtl" : "ltr"}>
          {name}
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed line-clamp-2 mb-4" dir={isRTL ? "rtl" : "ltr"}>
          {description}
        </p>

        {/* Price + Action */}
        <div className="flex items-center justify-between">
          <div dir="ltr" className="flex items-baseline">
            <span className="text-brand-primary font-bold text-xl font-heading">
              {product.price}
            </span>
            <span className="text-brand-muted text-sm ml-1">EGP</span>
          </div>
          <div className="flex items-center gap-1.5" dir="ltr">
            {/* Quantity Selector */}
            <div className="flex items-center">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-colors shadow-sm"
                aria-label={`Decrease quantity of ${name}`}
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm font-bold text-brand-text">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 rounded-xl bg-brand-primary-light border border-brand-primary/20 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                aria-label={`Increase quantity of ${name}`}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (product.available) {
                  add(product, qty);
                  setQty(1);
                  toast.success(`${qty} ${name} added to cart!`);
                }
              }}
              disabled={!product.available}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ml-1",
                product.available
                  ? "bg-gradient-brand text-white hover:opacity-90 shadow-soft hover:shadow-card-hover hover:scale-105 active:scale-95"
                  : "bg-brand-border text-brand-muted cursor-not-allowed"
              )}
              aria-label={`Add ${name} to cart`}
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
});
ProductCard.displayName = "ProductCard";
