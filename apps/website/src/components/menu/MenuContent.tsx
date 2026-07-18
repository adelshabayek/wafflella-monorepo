"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@wafflella/hooks";
import { useCategories } from "@wafflella/hooks";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductGridSkeleton } from "@/components/shared/Skeleton";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@wafflella/types";
import { useLanguage } from "@/contexts/LanguageContext";

const ALL_CATEGORY_ID = "__all__";

export function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? ALL_CATEGORY_ID;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { t, isRTL } = useLanguage();

  const isLoading = categoriesLoading || productsLoading;

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === ALL_CATEGORY_ID ||
      product.categoryId === selectedCategory;

    const nameToSearch = isRTL && product.nameAr ? product.nameAr : product.name;
    const descToSearch = isRTL && product.descriptionAr ? product.descriptionAr : product.description;

    const matchesSearch =
      !searchQuery ||
      nameToSearch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descToSearch.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesCategory && matchesSearch;
  });

  // Build tab list with "All" prepended
  const allTab: Category = { id: ALL_CATEGORY_ID, name: t.menu.allItems, order: 0 };
  const tabs: Category[] = [allTab, ...categories];

  return (
    <div className="min-h-screen bg-brand-background pt-24 pb-16">
      {/* Page Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-brand-primary text-sm font-semibold tracking-widest uppercase mb-4">
              ✦ {t.menu.badge}
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-brand-text mb-4">
              {t.menu.title}
            </h1>
            <p className="text-brand-muted text-xl max-w-2xl mx-auto">
              {t.menu.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-narrow mt-10">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-lg mx-auto mb-8"
        >
          <Search
            size={18}
            className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 text-brand-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            id="menu-search"
            placeholder={t.menu.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ltr:pl-12 rtl:pr-12 ltr:pr-4 rtl:pl-4 py-3.5 bg-white border border-brand-border rounded-2xl text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 shadow-card"
            aria-label="Search menu items"
          />
          {searchQuery && (
            <button
               onClick={() => setSearchQuery("")}
               className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors"
               aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </motion.div>

        {/* Category Tabs */}
        {!categoriesLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
            role="tablist"
            aria-label="Product categories"
          >
            {tabs.map((tab) => {
              const tabName = tab.id === ALL_CATEGORY_ID 
                ? tab.name 
                : (isRTL && (tab as any).nameAr ? (tab as any).nameAr : tab.name);

              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={selectedCategory === tab.id}
                  aria-controls="product-grid"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200",
                    selectedCategory === tab.id
                      ? "bg-brand-primary text-white shadow-soft"
                      : "bg-white text-brand-muted border border-brand-border hover:border-brand-primary hover:text-brand-primary"
                  )}
                >
                  {tabName}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Product Grid */}
        <div
          id="product-grid"
          role="tabpanel"
          aria-label={`${tabs.find((t) => t.id === selectedCategory)?.name ?? "All"} products`}
        >
          {isLoading ? (
            <ProductGridSkeleton count={9} />
          ) : filteredProducts.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
              role="status"
              aria-live="polite"
            >
              <div className="text-7xl mb-5" aria-hidden="true">
                {searchQuery ? "🔍" : "🍽️"}
              </div>
              <h3 className="font-heading text-2xl font-bold text-brand-text mb-2">
                {searchQuery ? t.menu.noResults : t.menu.noItems}
              </h3>
              <p className="text-brand-muted">
                {searchQuery
                  ? t.menu.noResultsDesc.replace("%s", searchQuery)
                  : t.menu.noItemsDesc}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-6 px-6 py-3 bg-brand-primary text-white rounded-xl font-semibold hover:bg-brand-primary-hover transition-colors"
                >
                  {t.menu.clearSearch}
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Result count */}
        {!isLoading && filteredProducts.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-brand-muted text-sm mt-10"
            aria-live="polite"
          >
            {t.menu.showingItems} {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? t.menu.item : t.menu.items}
            {selectedCategory !== ALL_CATEGORY_ID &&
              ` ${t.menu.in} ${(isRTL && (categories.find(c => c.id === selectedCategory) as any)?.nameAr) || categories.find((c) => c.id === selectedCategory)?.name || ""}`}
          </motion.p>
        )}
      </div>
    </div>
  );
}
