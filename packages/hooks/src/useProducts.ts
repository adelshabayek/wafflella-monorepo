"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subscribeToProducts, subscribeToFeaturedProducts } from "@wafflella/firebase";
import type { Product } from "@wafflella/types";

export function useProducts(categoryId?: string) {
  const queryClient = useQueryClient();
  const queryKey = categoryId ? ["products", categoryId] : ["products"];

  useEffect(() => {
    const unsubscribe = subscribeToProducts((products) => {
      queryClient.setQueryData<Product[]>(queryKey, products);
    }, categoryId);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, categoryId]);

  return useQuery<Product[]>({
    queryKey,
    queryFn: () => queryClient.getQueryData<Product[]>(queryKey) ?? [],
    staleTime: Infinity,
  });
}

export function useFeaturedProducts() {
  const queryClient = useQueryClient();
  const queryKey = ["products", "featured"];

  useEffect(() => {
    // Subscribe and immediately populate cache on first snapshot
    const unsubscribe = subscribeToFeaturedProducts((products) => {
      queryClient.setQueryData<Product[]>(queryKey, products);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient]);

  return useQuery<Product[]>({
    queryKey,
    // queryFn fetches from Firebase directly so first render isn't empty
    queryFn: () =>
      new Promise<Product[]>((resolve) => {
        const cached = queryClient.getQueryData<Product[]>(queryKey);
        if (cached && cached.length > 0) {
          resolve(cached);
          return;
        }
        // Wait for the subscription to fire once
        const unsub = subscribeToFeaturedProducts((products) => {
          queryClient.setQueryData<Product[]>(queryKey, products);
          resolve(products);
          unsub();
        });
      }),
    staleTime: Infinity,
  });
}

