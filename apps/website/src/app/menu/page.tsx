import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuContent } from "@/components/menu/MenuContent";
import { ProductGridSkeleton } from "@/components/shared/Skeleton";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse WAFFLELLA's full menu — premium waffles, chocolate desserts, coffee, cold drinks, hot drinks, and special offers.",
  openGraph: {
    title: "WAFFLELLA Menu — Premium Desserts",
    description: "Explore our complete menu of premium desserts and beverages.",
  },
};

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-background pt-40">
          <div className="container-narrow">
            <ProductGridSkeleton count={9} />
          </div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
