"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@wafflella/types";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { memo, useState, useEffect, useMemo } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "compact";
}

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FCE4EC'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='48' fill='%23E91E63'%3E🧇%3C/text%3E%3C/svg%3E";

export const ProductCard = memo(function ProductCard({ product, index = 0, variant = "default" }: ProductCardProps) {
  const { add } = useCart();
  const { isRTL, t } = useLanguage();
  const [qty, setQty] = useState(1);

  const name = isRTL && product.nameAr ? product.nameAr : product.name;
  const description = isRTL && product.descriptionAr ? product.descriptionAr : product.description;

  // Helper to get local image based on product name
  const getProductImage = (productName: string) => {
    const nameLower = productName.toLowerCase();
    
    // Bun Cakes
    if (nameLower.includes("bun cake") || nameLower.includes("بان كيك")) {
      if (nameLower.includes("nutella") || nameLower.includes("نوتيلا")) return "/images/products/bun_cake_nutella.webp";
      if (nameLower.includes("lotus") || nameLower.includes("لوتس")) return "/images/products/bun_cake_lotus.webp";
      if (nameLower.includes("oreo") || nameLower.includes("اوريو") || nameLower.includes("أوريو")) return "/images/products/bun_cake_oreo.webp";
      if (nameLower.includes("pistachio") || nameLower.includes("فستق")) return "/images/products/bun_cake_pistachio.webp";
      if (nameLower.includes("mix") || nameLower.includes("ميكس")) return "/images/products/bun_cake_choco.webp";
      return "/images/products/bun_cake_choco.webp";
    }
    
    // Waffles
    if (nameLower.includes("waffle") || nameLower.includes("وافل")) {
      if (nameLower.includes("nutella") || nameLower.includes("نوتيلا")) return "/images/products/waffle_nutella.webp";
      if (nameLower.includes("lotus") || nameLower.includes("لوتس")) return "/images/products/waffle_lotus.webp";
      if (nameLower.includes("oreo") || nameLower.includes("اوريو") || nameLower.includes("أوريو")) return "/images/products/waffle_oreo.webp";
      if (nameLower.includes("pistachio") || nameLower.includes("فستق")) return "/images/products/waffle_pistachio.webp";
      if (nameLower.includes("mix") || nameLower.includes("ميكس")) return "/images/products/waffle_mix.webp";
      if (nameLower.includes("platter") || nameLower.includes("بلاتر")) return "/images/products/waffle_platter.webp";
      return "/images/products/waffle_choco.webp";
    }

    return PLACEHOLDER_IMAGE;
  };

  const imageUrl = product.image ? product.image.replace('.png', '.webp') : getProductImage(product.name);

  // Auto-generate variants for pancakes if none exist
  const effectiveVariants = useMemo(() => {
    if (product.variants && product.variants.length > 0) return product.variants;
    
    const isPancake = product.name.toLowerCase().includes("pancake") || (product.nameAr && product.nameAr.includes("بان كيك"));
    if (isPancake) {
      // Find the base pieces count from the name (e.g. "Pancake Nutella 12")
      const match = product.name.match(/\s(\d+)$/) || (product.nameAr && product.nameAr.match(/\s(\d+)$/));
      const basePieces = match && match[1] ? parseInt(match[1], 10) : (product.pieces || 12); // default to 12 if can't find
      
      const pricePerPiece = product.price / basePieces;
      
      return [
        { id: `${product.id}-v6`, name: "6 BAN", nameAr: "6 قطع", price: 30 },
        { id: `${product.id}-v12`, name: "12 BAN", nameAr: "12 قطعة", price: 60 },
        { id: `${product.id}-v24`, name: "24 BAN", nameAr: "24 قطعة", price: 120 },
      ];
    }
    return [];
  }, [product]);

  const [selectedVariant, setSelectedVariant] = useState<import("@wafflella/types").ProductVariant | null>(
    effectiveVariants[0] || null
  );

  useEffect(() => {
    if (effectiveVariants.length > 0) {
      if (!selectedVariant || !effectiveVariants.find((v) => v.id === selectedVariant.id)) {
        const match = product.name.match(/\s(\d+)$/) || (product.nameAr ? product.nameAr.match(/\s(\d+)$/) : null);
        const basePieces = match ? parseInt(match[1] ?? "0", 10) : product.pieces;
        const defaultVar = effectiveVariants.find(v => v.name.includes(`${basePieces}`)) ?? effectiveVariants[1] ?? effectiveVariants[0] ?? null;
        setSelectedVariant(defaultVar);
      }
    } else {
      setSelectedVariant(null);
    }
  }, [effectiveVariants]);

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;

  // Extract pieces from name if not explicitly set and no variants exist
  let displayPieces = product.pieces;
  if (!displayPieces && effectiveVariants.length === 0) {
    const match = name.match(/\s(\d+)$/);
    if (match?.[1]) {
      displayPieces = parseInt(match[1], 10);
    }
  }

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
            {t.product.unavailable}
          </div>
        )}
        {product.featured && product.available && (
          <div className="absolute top-3 ltr:left-3 rtl:right-3 bg-brand-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow-soft">
            ✦ {t.product.featured}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5" dir={isRTL ? "rtl" : "ltr"}>
          <h3 className="text-lg font-bold text-brand-text line-clamp-1 mt-0.5">
            {name.replace(/\s\d+$/, "")}
          </h3>
          {displayPieces && effectiveVariants.length === 0 && (
            <div 
              className="flex-shrink-0 flex items-center justify-center border-2 border-brand-primary text-brand-primary text-xs font-bold px-2 py-0.5 rounded-lg whitespace-nowrap bg-white shadow-sm"
              dir="ltr"
            >
              {displayPieces} BAN
            </div>
          )}
          
          {/* Variants Selection */}
          {effectiveVariants.length > 0 && (
            <div className="flex items-center border border-brand-primary rounded-lg overflow-hidden flex-shrink-0 shadow-sm" dir="ltr">
              {effectiveVariants.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={cn(
                    "px-2 py-1 text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap",
                    selectedVariant?.id === v.id
                      ? "bg-brand-primary text-white"
                      : "bg-white text-brand-primary hover:bg-brand-primary/10",
                    i !== 0 && "border-l border-brand-primary"
                  )}
                >
                  {v.name.replace(' BAN', '')}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-brand-muted text-sm leading-relaxed line-clamp-2 mb-4" dir={isRTL ? "rtl" : "ltr"}>
          {description}
        </p>

        {/* Price + Action */}
        <div className="flex items-center justify-between">
          <div dir="ltr" className="flex items-baseline">
            <span className="text-brand-primary font-bold text-xl font-heading">
              {displayPrice}
            </span>
            <span className="text-brand-muted text-sm ml-1">EGP</span>
          </div>
          <div className="flex items-center gap-2" dir="ltr">
            {/* Premium Quantity Pill */}
            <div className="flex items-center bg-brand-background/50 border border-brand-border/60 rounded-xl p-1 shadow-sm backdrop-blur-sm">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-muted hover:bg-white hover:text-brand-primary hover:shadow-sm transition-all active:scale-95"
                aria-label={`Decrease quantity of ${name}`}
              >
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <span className="w-7 text-center text-sm font-bold text-brand-text tabular-nums">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-primary bg-brand-primary-light/60 hover:bg-brand-primary hover:text-white hover:shadow-sm transition-all active:scale-95"
                aria-label={`Increase quantity of ${name}`}
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>

            {/* Premium Add Button */}
            <button
              onClick={() => {
                if (product.available) {
                  add(product, qty, selectedVariant || undefined);
                  setQty(1);
                  const variantInfo = selectedVariant ? ` (${selectedVariant.name})` : "";
                  toast.success(`${qty} ${name}${variantInfo} ${t.product.addedToCart}`);
                }
              }}
              disabled={!product.available}
              className={cn(
                "flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ml-1",
                product.available
                  ? "bg-gradient-brand text-white shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  : "bg-brand-border text-brand-muted cursor-not-allowed"
              )}
              aria-label={`Add ${name} to cart`}
            >
              <ShoppingBag size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
});
ProductCard.displayName = "ProductCard";
