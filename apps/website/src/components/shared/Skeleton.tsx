import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-brand-border via-brand-secondary/20 to-brand-border bg-[length:200%_100%]",
        "[animation:shimmer_1.8s_ease-in-out_infinite]",
        className
      )}
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 1.8s ease-in-out infinite",
      }}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-card">
      {/* Image placeholder */}
      <Skeleton className="w-full h-56" />
      <div className="p-5 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        {/* Price + Button */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
