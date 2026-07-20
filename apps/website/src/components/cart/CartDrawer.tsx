"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Minus, Plus, Trash2, ShoppingCart,
  ArrowRight, User, Phone, MapPin, Loader2, CheckCircle2, ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23FCE4EC'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='32' fill='%23E91E63'%3E🧇%3C/text%3E%3C/svg%3E";

const WHATSAPP_NUMBER = "201020417971";


function OrderForm({ onBack }: { onBack: () => void }) {
  const { items, totalPrice, clear, close } = useCart();
  const { t, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const orderSchema = z.object({
    name: z.string().min(2, t.cart.nameError),
    phone: z.string().min(8, t.cart.phoneError),
    address: z.string().min(5, t.cart.addressError),
  });
  type OrderFormData = z.infer<typeof orderSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({ resolver: zodResolver(orderSchema) });

  const onSubmit = (data: OrderFormData) => {
    const itemLines = items
      .map((i) => {
        const name = isRTL && i.product.nameAr ? i.product.nameAr : i.product.name;
        return `  • ${name} × ${i.quantity} = ${i.product.price * i.quantity} EGP`;
      })
      .join("\n");

    const message = `🧇 *طلب جديد من WAFFLELLA*\n\n👤 الاسم: ${data.name}\n📞 الهاتف: ${data.phone}\n📍 العنوان: ${data.address}\n\n🛒 *تفاصيل الطلب:*\n${itemLines}\n\n💰 *الإجمالي: ${totalPrice} EGP*`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);

    setTimeout(() => {
      clear();
      close();
      setSubmitted(false);
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <CheckCircle2 size={72} className="text-green-500 mx-auto mb-5" />
        </motion.div>
        <h3 className="text-xl font-bold text-brand-text mb-2">{t.cart.orderSent}</h3>
        <p className="text-brand-muted text-sm">{t.cart.orderSentDesc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full" noValidate>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-brand-border/60">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-text transition-colors mb-3 font-medium"
        >
          <ArrowRight size={13} className={isRTL ? "" : "rotate-180"} />
          {t.cart.backToCart}
        </button>
        <h2 className="text-xl font-bold text-brand-text font-heading">{t.cart.yourDetails}</h2>
        <p className="text-sm text-brand-muted mt-0.5">{t.cart.deliverTo}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="order-name" className="block text-xs font-semibold text-brand-text mb-1.5 uppercase tracking-wide">
            {t.cart.fullName} *
          </label>
          <div className="relative">
            <User size={15} className="absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              id="order-name"
              {...register("name")}
              placeholder={t.cart.namePlaceholder}
              className={cn(
                "w-full ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-3 border rounded-xl text-sm outline-none transition-all bg-white",
                "focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary",
                errors.name ? "border-red-400 bg-red-50" : "border-brand-border"
              )}
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="order-phone" className="block text-xs font-semibold text-brand-text mb-1.5 uppercase tracking-wide">
            {t.cart.phone} *
          </label>
          <div className="relative">
            <Phone size={15} className="absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              id="order-phone"
              type="tel"
              {...register("phone")}
              placeholder={t.cart.phonePlaceholder}
              dir="ltr"
              className={cn(
                "w-full ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-3 border rounded-xl text-sm outline-none transition-all bg-white",
                "focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary",
                errors.phone ? "border-red-400 bg-red-50" : "border-brand-border"
              )}
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="order-address" className="block text-xs font-semibold text-brand-text mb-1.5 uppercase tracking-wide">
            {t.cart.address} *
          </label>
          <div className="relative">
            <MapPin size={15} className="absolute ltr:left-3.5 rtl:right-3.5 top-3.5 text-brand-muted" />
            <textarea
              id="order-address"
              {...register("address")}
              rows={3}
              placeholder={t.cart.addressPlaceholder}
              className={cn(
                "w-full ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-3 border rounded-xl text-sm outline-none transition-all resize-none bg-white",
                "focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary",
                errors.address ? "border-red-400 bg-red-50" : "border-brand-border"
              )}
            />
          </div>
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
        </div>

        {/* Order Summary */}
        <div className="bg-brand-background rounded-2xl p-4 border border-brand-border/60">
          <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-3">{t.cart.orderSummary}</p>
          <div className="space-y-2">
            {items.map((item) => {
              const name = isRTL && item.product.nameAr ? item.product.nameAr : item.product.name;
              return (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-brand-muted">{name} × {item.quantity}</span>
                  <span className="font-semibold text-brand-text flex gap-1" dir="ltr">
                    <span>{item.product.price * item.quantity}</span>
                    <span className="text-brand-muted">EGP</span>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-brand-border mt-3 pt-3 flex justify-between items-center">
            <span className="font-bold text-brand-text text-sm">{t.cart.total}</span>
            <span className="font-bold text-brand-primary text-lg flex gap-1" dir="ltr">
              <span>{totalPrice}</span>
              <span className="text-sm font-medium text-brand-muted self-end mb-0.5">EGP</span>
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 pt-4 border-t border-brand-border/60 bg-white">
        <button
          type="submit"
          id="confirm-order-btn"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2.5 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-all duration-200 shadow-lg text-sm disabled:opacity-70 hover:shadow-xl hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          )}
          {t.cart.orderViaWhatsapp}
        </button>
        <p className="text-center text-xs text-brand-muted mt-2.5">{t.cart.whatsappNote}</p>
      </div>
    </form>
  );
}

function CartItems({ onProceed }: { onProceed: () => void }) {
  const { items, totalItems, totalPrice, increment, decrement, remove, close, clear } = useCart();
  const { t, isRTL } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 px-6 text-center">
        <div className="w-24 h-24 bg-brand-primary-light rounded-3xl flex items-center justify-center mb-5 mx-auto">
          <ShoppingCart size={40} className="text-brand-primary/50" />
        </div>
        <h3 className="text-lg font-bold text-brand-text mb-1 font-heading">{t.cart.empty}</h3>
        <p className="text-brand-muted text-sm mb-6 max-w-[200px]">{t.cart.emptyDesc}</p>
        <button
          onClick={close}
          className="px-6 py-3 bg-gradient-brand text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all duration-200 shadow-soft hover:shadow-card-hover"
        >
          {t.cart.browseMenu}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between ps-5 pe-14 pt-5 pb-4 border-b border-brand-border/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-primary-light rounded-xl flex items-center justify-center">
            <ShoppingBag size={17} className="text-brand-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-brand-text leading-none font-heading">
              {t.cart.title}
            </h2>
            <span className="text-xs text-brand-muted mt-0.5 block">{totalItems} {t.cart.items}</span>
          </div>
        </div>
        <button
          onClick={clear}
          className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg"
        >
          {isRTL ? "حذف الكل" : "Clear All"}
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const name = isRTL && item.product.nameAr ? item.product.nameAr : item.product.name;
            return (
              <motion.div
                key={`${item.product.id}-${item.variantId || 'default'}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 bg-brand-background border border-brand-border/60 rounded-2xl p-3"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-brand-primary-light">
                  <Image
                    src={item.product.image ? item.product.image.replace('.png', '.webp') : PLACEHOLDER}
                    alt={name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-text text-sm line-clamp-1">
                    {name}
                    {item.variantName && (
                      <span className="text-brand-muted text-xs font-normal ms-1">
                        ({item.variantName})
                      </span>
                    )}
                  </p>
                  <p className="text-brand-primary font-bold text-sm mt-0.5 flex gap-1" dir="ltr">
                    <span>{(item.priceAtAddition || item.product.price) * item.quantity}</span>
                    <span className="text-xs font-medium text-brand-muted self-end mb-px">EGP</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5" dir="ltr">
                  <button
                    onClick={() => decrement(item.product.id, item.variantId)}
                    className="w-7 h-7 rounded-lg bg-white border border-brand-border flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-colors"
                    aria-label={`Decrease quantity of ${name}`}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-brand-text">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increment(item.product.id, item.variantId)}
                    className="w-7 h-7 rounded-lg bg-gradient-brand text-white flex items-center justify-center hover:opacity-90 transition-all"
                    aria-label={`Increase quantity of ${name}`}
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => remove(item.product.id, item.variantId)}
                    className="w-7 h-7 rounded-lg bg-white border border-brand-border flex items-center justify-center text-brand-muted hover:border-red-300 hover:text-red-500 transition-colors ltr:ml-1 rtl:mr-1"
                    aria-label={`Remove ${name} from cart`}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-5 pb-6 pt-4 border-t border-brand-border/60 bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-brand-muted font-medium text-sm">{t.cart.total}</span>
          <span className="text-2xl font-bold text-brand-primary flex items-baseline gap-1" dir="ltr">
            <span>{totalPrice}</span>
            <span className="text-sm font-medium text-brand-muted">EGP</span>
          </span>
        </div>
        <button
          id="proceed-to-order-btn"
          onClick={onProceed}
          className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-brand hover:opacity-90 text-white font-bold rounded-2xl transition-all duration-200 shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 text-sm"
        >
          {t.cart.proceedBtn}
          <ArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
        </button>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, close } = useCart();
  const [step, setStep] = useState<"cart" | "order">("cart");
  const { isRTL } = useLanguage();

  const handleClose = () => {
    close();
    setTimeout(() => setStep("cart"), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            key="drawer"
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className={cn(
              "fixed top-0 bottom-0 w-full sm:max-w-[480px] bg-white z-[70] flex flex-col",
              "shadow-[−20px_0_60px_rgba(0,0,0,0.15)]",
              isRTL ? "left-0" : "right-0"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className={cn(
                "absolute top-5 z-10 w-9 h-9 rounded-xl bg-brand-background border border-brand-border hover:bg-brand-primary-light hover:border-brand-primary hover:text-brand-primary flex items-center justify-center transition-all duration-200",
                isRTL ? "left-4" : "right-4"
              )}
              aria-label="Close cart"
            >
              <X size={16} />
            </button>

            <AnimatePresence mode="wait">
              {step === "cart" ? (
                <motion.div
                  key="cart-step"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full"
                >
                  <CartItems onProceed={() => setStep("order")} />
                </motion.div>
              ) : (
                <motion.div
                  key="order-step"
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full"
                >
                  <OrderForm onBack={() => setStep("cart")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
